import React from "react";
import { hour, convertToTime } from "./functions";

let assessFutureWeather = (hourlyWeatherArr) => {
	// returns array of weather description strings where i = time(now) + i*hours
	let weatherDescriptors = [];
	hourlyWeatherArr.forEach((hour) => {
		weatherDescriptors.push(hour.weather[0].description);
	});

	// returns an array of object{description: hour} if it finds key words in any description string
	let badWeatherFlagger = (weatherDescriptors) => {
		let flagged = [];
		let flag = (weather) => {
			flagged.push(weather);
		};
		let weatherHour = (weather, hour) => {
			return { [weather]: hour };
		};
		weatherDescriptors.forEach((weatherDescriptor, i) => {
			let descriptor = weatherDescriptor.toLowerCase();
			if (
				descriptor.indexOf("heavy") !== -1 ||
				descriptor.indexOf("thunder") !== -1 ||
				descriptor.indexOf("rain") !== -1 ||
				descriptor.indexOf("snow") !== -1 ||
				descriptor.indexOf("sleet") !== -1 ||
				descriptor.indexOf("tornado") !== -1
			) {
				flag(weatherHour(descriptor, i));
			}
		});
		return flagged;
	};

	//   returns the most frequently occurring descriptor in the next six hours, or returns the first one
	let nextSixHours = () => {
		let descriptors = weatherDescriptors.slice(0, 6);
		let averageWeather = "";
		let frequencies = {};
		descriptors.forEach((descriptor) => (frequencies[descriptor] = 0));
		for (let i = 0; i < 6; i++) {
			let descriptor = descriptors[i];
			frequencies[descriptor] += 1;
		}
		let entries = Object.entries(frequencies);
		for (let i = 0; i < entries.length; i++) {
			let entry = entries[i];
			if (entry[1] > 3) {
				averageWeather = entry[0];
				break;
			} else {
				if (i < entries.length - 1) {
					averageWeather += entry[0] + ", ";
				} else {
					averageWeather += "and " + entry[0];
				}
			}
		}
		return averageWeather;
	};

	return {
		badWeather: badWeatherFlagger(weatherDescriptors),
		nextSixHours: nextSixHours(),
	};
};

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
