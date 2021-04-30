import React, { useState, Fragment } from "react";
import { Meteor } from "meteor/meteor";
import loadable from "@loadable/component";
import { Dropdown, DropdownExternalLink } from "/imports/ui/components/Dropdown";
import { Link } from "react-router-dom";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import { hasRights } from "/imports/ui/components/Functions";
import { IconMenu } from "/imports/ui/components/Icons";
const ProfileModal = loadable(() => import("/imports/ui/profile/ProfileModal"));
import "/imports/ui/components/Navbar.css";

export const Navbar = ({ options, buttons, toggleAuthModal }) => {
	const [showNavbar, setShowNavbar] = useState(false);
	const toggleNavbar = () => setShowNavbar(!showNavbar);

	const handleNavigationClick = (navigation) => {
		setShowNavbar(false);
		navigation.action();
	};

	return (
		<nav className="navbar">
			<div className="main-wrapper">
				<div className="logo-label">
					<Link to="/"><img src="/logo.svg" alt="TF Certification Logo" /></Link>
				</div>

				<div className="visible-xs" onClick={toggleNavbar}>
					<IconMenu />
				</div>

				<div className={`actions ${showNavbar ? "" : "hidden-xs"}`}>
					<ul>
						{options?.map((option, index) => (
							<li key={`option-${index}`}>
								{option.url ? <Link to={option.url}>{option.title}</Link> : <a onClick={() => handleNavigationClick(option)}>{option.title}</a>}
							</li>
						))}

						<div className="buttons">
							{toggleAuthModal && <NavbarAuthButton toggleAuthModal={toggleAuthModal} />}

							{buttons?.map((button, index) =>
								<li key={`button-${index}`}>
									<button className={button.classes ?? ""} onClick={() => handleNavigationClick(button)}>{button.title}</button>
								</li>
							)}
						</div>
					</ul>
				</div>
			</div>
		</nav>
	);
};

const NavbarAuthButton = ({ toggleAuthModal }) => {
	const [showProfile, setShowProfile] = useState(false);
	const toggleProfile = () => setShowProfile(!showProfile);

	const { user } = useAccount();

	return (
		<Fragment>
			{user ? (
				<Fragment>
					<Dropdown title={`Hi ${user.profile.name.first}`}>
						<a className="dropdown-item" onClick={toggleProfile}>Profile</a>
						{hasRights(["admin"]) && <Link className="dropdown-item" to="/admin/users">Administrator</Link>}

						<div className="dropdown-container">
							<DropdownExternalLink link="https://intercom.help/TFCertification" className="dropdown-item">Knowledge Base</DropdownExternalLink>
							<DropdownExternalLink link="https://discord.gg/TjhK28Kr9k" className="dropdown-item">Community</DropdownExternalLink>
							<DropdownExternalLink link="mailto:support@tfcertification.intercom.com" className="dropdown-item">Contact</DropdownExternalLink>
						</div>

						<a className="dropdown-item" onClick={() => Meteor.logout()}>Logout</a>
					</Dropdown>

					{showProfile && <ProfileModal isOpen={showProfile} closeModal={toggleProfile} />}
				</Fragment>
			) : (
				<Fragment>
					<li><button className="button" onClick={(event) => toggleAuthModal(event, true, "Login")}>Login</button></li>
					<li><button className="button primary-dark" onClick={(event) => toggleAuthModal(event, true, "Signup")}>Get Started</button></li>
				</Fragment>
			)}
		</Fragment>
	);
};
