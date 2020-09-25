import React, { useRef } from "react";

export const SearchInput = ({ field, value, placeholder, saveCallback }) => {
	const inputRef = useRef();

	const handleChange = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const value = event.target.value;

		if (event.which == 13 && value || !value) saveCallback(event);
	};

	return (
		<input
			name={field}
			type="text"
			placeholder={placeholder}
			defaultValue={value}
			onKeyUp={handleChange}
			ref={inputRef}
		/>
	);
};
