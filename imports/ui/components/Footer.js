import React from "react";
import { Link } from "react-router-dom";
import "/imports/ui/components/Footer.css";

export const Footer = () => {
	return (
		<footer>
			<div className="main-wrapper">
				<p>&copy; Copyright 2021 — All rights reserved — TF Certification</p>
				<div>
					<Link to="/privacy-policy">Privacy Policy</Link>
					<span className="hidden-xs">&bull;</span>
					<Link to="/terms-conditions">Terms & Conditions</Link>
				</div>
			</div>
		</footer>
	);
};
