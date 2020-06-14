import React, { Component } from "react";
import ReactDOM from "react-dom";

import MainWeatherDetails from "./components/MainWeatherDetails";
import HourlyForecast from "./components/HourlyForecast";
import TwoDaySummary from "./components/TwoDaySummary";
import Date from "./components/Date";
import ErrorMessage from "./components/ErrorMessage";

require("dotenv").config();

let weatherAPI = {
	base: "http://api.openweathermap.org/data/2.5/",
	key: "a1eceb2aba63977ea20ba9526a247970",
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			display: false,
		};
	}

	renderWeather = (weather) => {
		return <MainWeatherDetails weather={weather} />;
	};

	renderForecast = (forecast) => {
		return <HourlyForecast forecast={forecast} />;
	};

	handleChange(event) {
		const value = event.target.value;
		this.setState({
			...this.state,
			[event.target.name]: value,
		});
	}

	handleKeyPress(event) {
		if (event.key === "Enter") {
			fetch(
				`${weatherAPI.base}weather?q=${event.target.value}&units=metric&APPID=${weatherAPI.key}`
			)
				.then((res) => res.json())
				.then((result) => {
					if (result.cod < 400) {
						this.setState({
							weather: result.main,
							coords: { lat: result.coord.lat, lon: result.coord.lon },
							display: true,
						});
						fetch(
							`${weatherAPI.base}onecall?lat=${this.state.coords.lat}&lon=${this.state.coords.lon}&units=metric&exclude=minutely,current&appid=${weatherAPI.key}`
						)
							.then((res) => res.json())
							.then((result) => {
								this.setState({
									forecast: result,
								});
							});
					} else {
						this.setState({
							errorMessage: result.message,
							display: false,
							coords: {},
							forecast: false,
							weather: {},
						});
					}
				});
		}
	}

	render() {
		if (this.state.display === false && this.state.errorMessage === "") {
			return <Date />;
		} else if (this.state.display === false) {
			return (
				<div>
					<Date />
					<input
						type="text"
						name="locationInput"
						placeholder="What city are you in?"
						onChange={(e) => this.handleChange(e)}
						onKeyPress={(e) => this.handleKeyPress(e)}
					/>
					<ErrorMessage message={this.state.errorMessage} />
				</div>
			);
		} else {
			return (
				<div>
					<Date />
					<input
						type="text"
						name="locationInput"
						placeholder="What city are you in?"
						onChange={(e) => this.handleChange(e)}
						onKeyPress={(e) => this.handleKeyPress(e)}
					/>
					<MainWeatherDetails weather={this.state.weather} />
					{this.state.forecast ? (
						<div>
							<TwoDaySummary assessment={this.state.forecast.hourly} />
							<HourlyForecast forecast={this.state.forecast} />
						</div>
					) : (
						<div></div>
					)}
				</div>
			);
		}
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
