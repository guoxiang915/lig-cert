import React, { useState } from "react";
import { Modal } from "/imports/ui/components/Modal";

export const ConfirmAction = ({ isOpen, onClose, title, description, buttonText, action }) => {
	const [loading, setLoading] = useState(false);

	const handleAction = () => {
		setLoading(true);
		action(onClose);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h4>{title}</h4>
			<div dangerouslySetInnerHTML={{ __html: description }}></div>

			<button type="submit" disabled={loading} onClick={handleAction}>
				{loading ? "Loading..." : buttonText}
			</button>
		</Modal>
	);
};
