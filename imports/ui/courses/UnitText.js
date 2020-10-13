import React, { Fragment } from "react";
import { UnitHeader } from "/imports/ui/courses/UnitHeader";

export const UnitText = ({ unit, nextState, toggleSidebar }) => {
	return (
		<Fragment>
			<UnitHeader unit={unit} toggleSidebar={toggleSidebar} showHeader={true} />

			<div className="text-content">
				<div dangerouslySetInnerHTML={{ __html: unit.content.text }} />
				<br/>
				<button type="button" className="button primary dark-hover" onClick={() => nextState.action()}>{nextState.title}</button>
			</div>
		</Fragment>
	);
};
