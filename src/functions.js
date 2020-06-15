// Date string function

const month = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
][new Date().getMonth() - 1];
const day = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
][new Date().getDay()];

let dayNumber = () => {
	let number = "" + new Date().getDate();
	switch (number) {
		case "1":
		case "21":
		case "31":
			return number + "st";
		case "2":
		case "22":
			return number + "nd";
		case "3":
		case "23":
			return number + "rd";
		default:
			return number + "th";
	}
};

let date = `${day} the ${dayNumber()} of ${month}, ${new Date().getFullYear()}`;

// Hour function

let hour = new Date().getHours();

// Relative Time function

let convertToTime = (relativeTime) => {
	let dayIndex = new Date().getDay();
	let dayStrings = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	while (relativeTime > 23) {
		relativeTime -= 24;
		dayIndex += 1;
	}
	if (dayIndex > 6) {
		dayIndex -= 7;
	}

	if (relativeTime === 0) {
		relativeTime = "Midnight";
	} else if (relativeTime - 12 > 0) {
		relativeTime -= 12;
		relativeTime += " pm";
	} else {
		relativeTime += " am";
	}

	return { daystring: dayStrings[dayIndex], relativeTime };
};

// Forecast string function

function assessFutureWeather(hourlyWeatherArr) {
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
}

let functions = { date, hour, convertToTime, assessFutureWeather };

module.exports = functions;
