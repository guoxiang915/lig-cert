import React, { useEffect, useRef, Fragment } from "react";
import { useParams, useHistory  } from "react-router-dom";
import { UnitsCollection } from "/imports/api/courses/units";
import { hasRights, capitalizeText, _union } from "/imports/ui/components/Functions";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import { IconMenu, IconVideo, IconText, IconQuiz, IconCheck, IconLock } from "/imports/ui/components/Icons";

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
	// Verify user has access to unit content
	const { user } = useAccount();
	const hasCourseAccess = user ? hasRights(_union(["admin"], course.accessRoles)) : false;

	// Course unit access functionality
	const { unitPermalink } = useParams();
	const history = useHistory();
	const handleUnitClick = () => { if (hasCourseAccess) history.push(`/courses/${course.permalink}/${unit.permalink}`); };

	// Check if user already completed this unit
	const unitCompleted = memberlist && memberlist.unitsCompleted.includes(unit._id);
	const activeUnit = unit.permalink == unitPermalink;

	// Sidebar unit icon generator
	const icons = { IconVideo, IconText, IconQuiz, IconLock, IconCheck };
	const RenderIcon = icons[unitCompleted ? "IconCheck" : hasCourseAccess ? `Icon${capitalizeText(unit.type)}` : "IconLock"];

	return (
		<div className={`lecture-container ${hasCourseAccess ? "available" : ""} ${unitCompleted ? "completed" : ""} ${activeUnit ? "active" : ""}`}>
			<span className="icon"><RenderIcon /></span>

			<div>
				<a onClick={handleUnitClick}>{unit.title}</a>
			</div>
		</div>
	);
};
