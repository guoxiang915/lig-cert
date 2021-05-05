import React from "react";
import "/imports/ui/maintenance/Maintenance.css";

export const Maintenance = () => {
	return (
		<div className="maintenance-banner hidden-xs">
			<p><strong>Scheduled Maintenance - Friday 4/07/2021 @ 16:00 UTC</strong> - We will perform data updates which may affect changes made in your account during the maintenance window.</p>
		</div>
	);
};
