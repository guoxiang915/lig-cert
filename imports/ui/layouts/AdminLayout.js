import React from "react";
import { Link } from "react-router-dom";
import { hasRights } from "/imports/ui/components/Functions";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import "/imports/ui/layouts/styles.css";

export default AdminLayout = ({ children }) => {
	const { userId } = useAccount();

	return (
		<div className="admin-layout-wrapper">
			<div className="main-wrapper">
				<ul>
					<li><Link to="/">Back to Homepage</Link></li>
					<li><Link to="/admin/users">Users Administration</Link></li>
					<li><Link to="/admin/files">Files Administration</Link></li>
					<li><Link to="/admin/invitations">Invitations Administration</Link></li>
					<li><Link to="/admin/courses">Courses Administration</Link></li>
				</ul>
				{hasRights(["admin"], userId) ? children : <p>You dont have access to this page</p>}
			</div>
		</div>
	);
};
