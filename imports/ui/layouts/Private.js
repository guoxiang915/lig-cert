import React from "react";
import { Link, NavLink } from "react-router-dom";
import { hasRights } from "/imports/ui/components/Functions";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import "/imports/ui/layouts/Private.css";

export default Private = ({ children }) => {
	const { userId } = useAccount();

	return (
		<div className="private-layout">
			<nav className="private-navbar">
				<div className="main-wrapper">
					<Link to="/">
						<img src="/logo.svg" alt="TF Certification Logo" />
					</Link>

					<div className='navigation'>
						<NavLink to="/admin/users">Users</NavLink>
						<NavLink to="/admin/invitations">Invitations</NavLink>
						<NavLink to="/admin/courses">Courses</NavLink>
						<NavLink to="/admin/files">Files</NavLink>
						<NavLink to="/admin/blogs">Blogs</NavLink>
						<NavLink to="/admin/pages">Pages</NavLink>
						<button className="button primary" onClick={() => Meteor.logout()}>Logout</button>
					</div>
				</div>
			</nav>

			<div className="main-wrapper">
				<main>
					{hasRights(["admin"], userId) ? children : <p>You dont have access to this page</p>}
				</main>
			</div>
		</div>
	);
};
