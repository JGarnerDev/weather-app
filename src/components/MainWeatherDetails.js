import React from "react";

export default function MainWeatherDetails(props) {
	let weather = props.weather;
	return (
		<div id="MainWeatherDetails">
			<div id="temperature">{weather.temp}°C</div>
			<small id="feelsLike">
				...feels more like <strong>{weather.feels_like}°C</strong>, though
			</small>
			<ul id="meta">
				<li className="metadata">Humidity: {weather.humidity}%</li>
				<li className="metadata">Pressure: {weather.pressure} hpa</li>
				<li className="metadata">
					Temperature range: {weather.temp_min}°C to {weather.temp_max}°C
				</li>
			</ul>
		</div>
	);
}
