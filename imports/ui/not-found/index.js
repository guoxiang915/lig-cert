import React from "react";
import { Link } from "react-router-dom";
import "/imports/ui/not-found/styles.css";

export default NotFound = () => {
	return (
		<div className="notfound-container">
			<img src="/not-found.svg" alt="Not Found Image" />
			<p>This page was not found. You may have mistyped the address or the page may have moved.</p>
			<p><Link to="/">Take me to the home page.</Link></p>
		</div>
	);
};
