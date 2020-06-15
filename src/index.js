import React, { Component } from "react";
import ReactDOM from "react-dom";

import MainWeatherDetails from "./components/MainWeatherDetails";
import HourlyForecast from "./components/HourlyForecast";
import TwoDaySummary from "./components/TwoDaySummary";
import Date from "./components/Date";
import ErrorMessage from "./components/ErrorMessage";
import WeatherIcon from "./components/WeatherIcon";

import "./App.scss";

require("dotenv").config();

let weatherAPI = {
	base: "http://api.openweathermap.org/data/2.5/",
	key: process.env.REACT_APP_WEATHER_API_KEY,
};

let geonamesAccount = process.env.REACT_APP_GEONAMES_ACCOUNT;

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

	cleanCityString = () => {
		fetch(
			`http://api.geonames.org/findNearbyJSON?lat=${this.state.coords.lat}&lng=${this.state.coords.lon}&username=${geonamesAccount}`
		)
			.then((res) => res.json())
			.then((result) => {
				let cityName =
					this.state.request.charAt(0).toUpperCase() +
					this.state.request.slice(1, this.state.request.length).toLowerCase();
				this.setState({
					city: cityName + ", " + result.geonames[0].countryCode,
				});
			});
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
							})
							.then(
								this.setState({
									city: this.cleanCityString(),
									request: this.state.locationInput,
								})
							);
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
				<div id="Main">
					<div id="appHeader" className="container">
						<h1>The Weather Report</h1>
					</div>

					<Date />
					<input
						id="SearchBar"
						type="text"
						name="locationInput"
						placeholder="Search your city!  "
						onChange={(e) => this.handleChange(e)}
						onKeyPress={(e) => this.handleKeyPress(e)}
					/>
					<ErrorMessage message={this.state.errorMessage} />
				</div>
			);
		} else {
			return (
				<div id="Main">
					<div id="appHeader" className="container">
						<h1>The Weather Report</h1>
					</div>
					<Date />
					<input
						id="SearchBar"
						type="text"
						name="locationInput"
						placeholder="Search your city! "
						onChange={(e) => this.handleChange(e)}
						onKeyPress={(e) => this.handleKeyPress(e)}
					/>

					{this.state.forecast ? (
						<div id="Report">
							<h1 id="city-header">{this.state.city}</h1>
							<WeatherIcon
								id="main-icon"
								icon={this.state.forecast.hourly[0].weather[0].icon}
							/>
							<MainWeatherDetails weather={this.state.weather} />
							<div id="additionalInfo">
								<TwoDaySummary assessment={this.state.forecast.hourly} />
								<HourlyForecast forecast={this.state.forecast} />
							</div>
						</div>
					) : (
						<div></div>
					)}
				</div>
			);
		}
	}
}

ReactDOM.render(<App />, document.getElementById("App"));
