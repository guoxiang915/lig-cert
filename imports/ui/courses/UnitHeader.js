import React from "react";
import { useParams, Link } from "react-router-dom";
import { IconMenu } from "/imports/ui/components/Icons";

export const UnitHeader = ({ unit, classes="", toggleSidebar, showHeader=true }) => {
	const { coursePermalink } = useParams();

	return (
		<div className={`header ${classes} ${showHeader ? "" : "hidden"}`}>
			<span onClick={toggleSidebar}><IconMenu /></span>
			<p>{unit.title}</p>
			<Link to={`/courses/${coursePermalink}`} className="">Back to Course</Link>
		</div>
	);
};
