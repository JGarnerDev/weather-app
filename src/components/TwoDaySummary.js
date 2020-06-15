import React from "react";
import { assessFutureWeather, hour, convertToTime } from "../functions";

export default function TwoDaySummary(props) {
	let assessment = assessFutureWeather(props.assessment);
	if (assessment.badWeather.length === 0) {
		return (
			<div id="TwoDaySummary">
				<div className="container happy">
					<h2>The next six hours is mostly {assessment.nextSixHours}</h2>
				</div>
			</div>
		);
	} else {
		return (
			<div id="TwoDaySummary">
				<div className="container ">
					<h2>The next six hours:</h2>
					<h2>Mostly {assessment.nextSixHours}</h2>
				</div>

				<div className="container danger">
					<h3>There's some bad weather in the next two days!</h3>
					<h4>Here's what we found</h4>
					{assessment.badWeather.map((badWeather) => {
						let weatherKind = Object.keys(badWeather)[0];
						let when = Object.values(badWeather);

						console.log(when[0]);

						return (
							<div className="hour-container">
								<div className="time">
									<div>{convertToTime(hour + when[0]).daystring}</div>
									<div>{convertToTime(hour + when[0]).relativeTime}</div>
								</div>
								<div className="badweather">{weatherKind}</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
