import React from "react";

export default function WeatherIcon(props) {
	let iconId = props.icon;
	let src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

	let WeatherIconStyle = {
		backgroundImage: `url(${src})`,
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
	};

	return <div style={WeatherIconStyle} className="WeatherIcon" />;
}
