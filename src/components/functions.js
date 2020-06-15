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

let functions = { date, hour, convertToTime };

module.exports = functions;
