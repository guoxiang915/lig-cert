import React from "react";

export const ArrayManager = ({ field, currentValue, saveCallback, inputPlaceholder, buttonText }) => {
	const handleSave = (value) => {
		const newEvent = Object.assign({}, event, {
			target: { name: field, value: value }
		});

		saveCallback(newEvent);
	};

	handleChange = (event) => {
		const videoPos = event.target.getAttribute("data-pos");
		currentValue[videoPos] = event.target.value;
		handleSave(currentValue);
	};

	handleDelete = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const videoPos = event.target.getAttribute("data-pos");
		currentValue.splice(videoPos, 1);
		handleSave(currentValue);
	};

	handleCreate = (event) => {
		event.preventDefault();
		event.stopPropagation();
		currentValue.push("");
		handleSave(currentValue);
	};

	return (
		<div>
			{currentValue.map((item, pos) =>
				<div key={`array-${pos}`}>
					<input type="text" data-pos={pos} value={item} onChange={handleChange} placeholder={inputPlaceholder} />
					<button data-pos={pos} onClick={handleDelete}>Delete</button>
				</div>
			)}
			<button onClick={handleCreate}>{buttonText}</button>
		</div>
	);
};
