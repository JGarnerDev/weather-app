import React from "react";
import { assessFutureWeather } from "../functions";

export default function TwoDaySummary(props) {
	let assessment = assessFutureWeather(props.assessment);
	if (assessment.badWeather.length === 0) {
		return (
			<div>
				<div>The next six hours is mostly {assessment.nextSixHours}</div>
			</div>
		);
	} else {
		return (
			<div>
				<div>The next six hours is mostly {assessment.nextSixHours}</div>
				<br />
				<strong>Some bad weather:</strong>
				{assessment.badWeather.map((badWeather) => {
					let weatherKind = Object.keys(badWeather)[0];
					let when = Object.values(badWeather);
					return (
						<div>
							<div>{weatherKind}</div>
							<div>{when}</div>
						</div>
					);
				})}
			</div>
		);
	}
}
