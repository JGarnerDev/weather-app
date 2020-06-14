import React from "react";

export default function HourlyForecast(props) {
	let forecast = props.forecast;
	return (
		<div>
			<h1>Hourly</h1>
			<div></div>

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
}
