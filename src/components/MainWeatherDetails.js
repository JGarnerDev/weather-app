import React from "react";

export default function MainWeatherDetails(props) {
	let weather = props.weather;
	return (
		<div>
			<div>{weather.temp}°C</div>
			<small>{weather.feels_like}°C</small>
		</div>
	);
}
