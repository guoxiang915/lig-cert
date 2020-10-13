
import React, { useEffect, useRef, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import { UnitsCollection } from "/imports/api/courses/units";
import { capitalizeText } from "/imports/ui/components/Functions";
import { IconMenu, IconVideo, IconText, IconQuiz, IconCheck } from "/imports/ui/components/Icons";

export const UnitSidebar = ({ showSidebar, toggleSidebar, course, memberlist }) => {
	const activeModuleRef = useRef(null);

	useEffect(() => activeModuleRef.current.scrollIntoView(), [activeModuleRef]);

	return (
		<div className={`sidebar-content ${showSidebar ? "visible" : ""}`}>
			<p className="menu-action visible-xs" onClick={toggleSidebar}>
				Hide Menu
				<IconMenu />
			</p>

			{course.modules.map((module) => <SidebarModule key={module._id} course={course} memberlist={memberlist} module={module} activeModuleRef={activeModuleRef} />)}
		</div>
	);
};

const SidebarModule = ({ course, memberlist, module, activeModuleRef }) => {
	const units = UnitsCollection.find({ moduleId: module._id }, { sort: { order: 1 } }).fetch();

	const { unitPermalink } = useParams();
	const isActiveModule = units.find((unit) => { return unit.permalink == unitPermalink; } );

	return (
		<Fragment>
			<div className="lectures-header" ref={isActiveModule ? activeModuleRef : null}>
				{module.title}
			</div>

			<div className="lectures-container">
				{units.map((unit) => <SidebarUnit key={unit._id} course={course} memberlist={memberlist} unit={unit} />)}
			</div>
		</Fragment>
	);
};

const SidebarUnit = ({ course, memberlist, unit }) => {
	// Check if unit is currently active
	const { unitPermalink } = useParams();
	const activeUnit = unit.permalink == unitPermalink;

	// Check if user already completed this unit
	const unitCompleted = memberlist && memberlist.unitsCompleted.includes(unit._id);

	// Sidebar unit icon generator
	const icons = { IconVideo, IconText, IconQuiz, IconCheck };
	const RenderIcon = icons[unitCompleted ? "IconCheck" : `Icon${capitalizeText(unit.type)}`];

	return (
		<div className={`lecture-container ${unitCompleted ? "completed" : ""} ${activeUnit ? "active" : ""}`}>
			<RenderIcon />
			<Link to={`/courses/${course.permalink}/${unit.permalink}`}>{unit.title}</Link>
		</div>
	);
};
