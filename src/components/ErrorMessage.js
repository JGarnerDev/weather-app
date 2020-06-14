import React from "react";

export default function ErrorMessage(props) {
	let message = props.message;
	return <div>{message}</div>;
}
