import React from "react";
import { hour, convertToTime } from "../functions";

export default function HourlyForecast(props) {
	let forecast = props.forecast;

	return (
		<div id="HourlyForecast">
			<h1>Hourly forecast</h1>

			{forecast.hourly.map((hourly, i) => {
				return (
					<div className="hour-container" key={i}>
						<div className="time">
							<div>{convertToTime(hour + i).daystring}</div>
							<div>{convertToTime(hour + i).relativeTime}</div>
						</div>

						<div className="weather">
							{hourly.weather[0].description.charAt(0).toUpperCase() +
								hourly.weather[0].description.slice(
									1,
									hourly.weather[0].description.length
								)}
						</div>
						<div className="temperature">{Math.round(hourly.temp)}°C</div>
					</div>
				);
			})}
		</div>
	);
}
