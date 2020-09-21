import React, { useState, Fragment } from "react";
import { Meteor } from "meteor/meteor";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import { hasRights } from "/imports/ui/components/Functions";
import AuthModal from "/imports/ui/authentication/AuthModal";

export default Homepage = () => {
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [authComponent, setAuthComponent] = useState("");

	const { user } = useAccount();

	const toggleAuthModal = (event, activeModal, component) => {
		event.preventDefault();
		if (component) setAuthComponent(component);
		setShowAuthModal(activeModal);
	};

	const handleLogout = () => Meteor.logout();

	return (
		<Fragment>
			<h1>Homepage</h1>

			{user ? (
				<Fragment>
					<p> Hi {user.profile.name.first}</p>

					{hasRights(["admin"]) && <a href="/admin/users">Administrator</a>}
					<button type="button" onClick={handleLogout}>Logout</button>
				</Fragment>
			) : (
				<Fragment>
					<button type="button" onClick={(event) => toggleAuthModal(event, true, "Login")}>Login</button>
					<button type="button" onClick={(event) => toggleAuthModal(event, true, "Signup")}>Get Started</button>
				</Fragment>
			)}

			{showAuthModal && <AuthModal isOpen={showAuthModal} actionModal={toggleAuthModal} component={authComponent} />}
		</Fragment>
	);
};
