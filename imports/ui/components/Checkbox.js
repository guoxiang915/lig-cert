import React from "react";

export const Checkbox = ({ field, currentValue, saveCallback }) => {
	const handleChange = (event) => {
		const newEvent = Object.assign({}, event, {
			target: { name: field, value: !currentValue }
		});
		saveCallback(newEvent);
	};

	return (
		<input type="checkbox" checked={currentValue} onChange={handleChange} />
	);
};
