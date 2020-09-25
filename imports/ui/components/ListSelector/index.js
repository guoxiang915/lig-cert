import React from "react";
import "/imports/ui/components/ListSelector/styles.css";

export const ListSelector = ({ field, options, currentValues, saveCallback }) => {
	const handleClick = (event) => {
		const selectedValue = event.target.id;
		const newValues = currentValues;

		if (newValues.includes(selectedValue)) {
			const optionPosition = newValues.indexOf(selectedValue);
			newValues.splice(optionPosition, 1);
		} else {
			newValues.push(selectedValue);
		}

		const newEvent = Object.assign({}, event, {
			target: { name: field, value: newValues }
		});
		saveCallback(newEvent);
	};

	return (
		<div className="list-selector-container">
			{options.map((option, pos) =>
				<label key={`list-option-${pos}`}>
					<input type="checkbox" id={option} checked={currentValues.includes(option)} onChange={handleClick}/>
					{option}
				</label>
			)}
		</div>
	);
};
