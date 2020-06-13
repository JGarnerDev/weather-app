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
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
][new Date().getDay() - 1];

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

// Location string function

let functions = { date };

module.exports = functions;
