import React from "react";

export default function ErrorMessage(props) {
	let message = props.message;
	return <div id="ErrorMessage">{message}</div>;
}
