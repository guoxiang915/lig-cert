import React, { useState, useEffect, useRef } from "react";
import "/imports/ui/components/Dropdown/styles.css";

export const Dropdown = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownItemsRef = useRef(null);

	const toggleDropdown = (event) => {
		event.preventDefault();
		event.stopPropagation();
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const handleWindowClick = (event) => {
			if (!isOpen) return;
			if (!dropdownItemsRef.current?.contains(event.target)) setIsOpen(false);
		};

		window.addEventListener("click", handleWindowClick);

		return () => window.removeEventListener("click", handleWindowClick);
	});

	return (
		<div className="button-dropdown" onClick={toggleDropdown}>
			<button className="button">{title}</button>
			<div className="dropdown-content" style={{ display: isOpen ? "block" : "none" }} ref={dropdownItemsRef}>{children}</div>
		</div>
	);
};
