import React, { Component } from "react";
import ReactDOM from "react-dom";
import { date } from "./functions";
require("dotenv").config();

let weatherAPI = {
	base: "http://api.openweathermap.org/data/2.5/",
	key: "",
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			display: false,
		};
	}

	renderWeather = (weather) => {
		return (
			<div>
				<div>{weather.temp}°C</div>
				<small>{weather.feels_like}°C</small>
			</div>
		);
	};

	renderForecast = (forecast) => {
		return (
			<div>
				<h1>Hourly</h1>
				{forecast.hourly.map((hourly, i) => {
					return (
						<div key={i}>
							<h1>{i}</h1>
							<div>{hourly.weather[0].description}</div>
						</div>
					);
				})}
			</div>
		);
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

	componentDidUpdate(prevState) {
		if (prevState.display !== this.state.display) {
		}
	}

	render() {
		if (this.state.display === false && this.state.errorMessage === "") {
			return (
				<div>
					<div>{date}</div>
					<input
						type="text"
						name="locationInput"
						placeholder="Search"
						onChange={(e) => this.handleChange(e)}
						onKeyPress={(e) => this.handleKeyPress(e)}
					/>
				</div>
			);
		} else if (this.state.display === false) {
			return (
				<div>
					<div>{date}</div>
					<input
						type="text"
						name="locationInput"
						placeholder="Search"
						onChange={(e) => this.handleChange(e)}
						onKeyPress={(e) => this.handleKeyPress(e)}
					/>
					<small>{this.state.errorMessage}</small>
				</div>
			);
		} else {
			return (
				<div>
					<div>{date}</div>
					<input
						type="text"
						name="locationInput"
						placeholder="Search"
						onChange={(e) => this.handleChange(e)}
						onKeyPress={(e) => this.handleKeyPress(e)}
					/>
					<div>{this.renderWeather(this.state.weather)}</div>
					{this.state.forecast ? (
						<div>{this.renderForecast(this.state.forecast)}</div>
					) : (
						<div></div>
					)}
				</div>
			);
		}
	}
}

ReactDOM.render(<App />, document.getElementById("root"));

// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={YOUR API KEY}
