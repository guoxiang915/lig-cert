import React, { useState, Fragment } from "react";
import { Meteor } from "meteor/meteor";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import { hasRights } from "/imports/ui/components/Functions";
import AuthModal from "/imports/ui/authentication/AuthModal";
import { VideoPlayer } from "/imports/ui/components/VideoPlayer";
import "/imports/ui/stylesheets/navbar.css";
import "/imports/ui/homepage/styles.css";

export default Homepage = () => {
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [authComponent, setAuthComponent] = useState("");

	const { user } = useAccount();

	const toggleAuthModal = (event, activeModal, component) => {
		event.preventDefault();
		if (component) setAuthComponent(component);
		setShowAuthModal(activeModal);
	};

	return (
		<Fragment>
			<section className="section homepage-header">
				<div className="main-wrapper">
					<nav>
						<img src="/logo.svg" alt="TF Certification Logo"/>

						<ul className="actions hidden-xs">
							<li><a>Features</a></li>
							<li><a>Instructor</a></li>
							<li><a>Courses</a></li>

							<div className="buttons">
								{user ? (
									<div className="nav-dropdown">
										<button className="button">Hi {user.profile.name.first}</button>

										<div className="dropdown-content clearfix">
											{/* <a className="dropdown-item" onClick={toggleProfile}>Profile</a> */}
											{hasRights(["admin"]) && <a href="/admin/users" className="dropdown-item">Administrator</a>}
											<a className="dropdown-item" onClick={() => Meteor.logout()}>Logout</a>
										</div>

										{/* {showProfile && <ProfileModal isOpen={showProfile} closeModal={toggleProfile} />} */}
									</div>
								) : (
									<Fragment>
										<button type="button" className="button" onClick={(event) => toggleAuthModal(event, true, "Login")}>Login</button>
										<button type="button" className="button primary-dark" onClick={(event) => toggleAuthModal(event, true, "Signup")}>Get Started</button>
									</Fragment>
								)}

								{showAuthModal && <AuthModal isOpen={showAuthModal} actionModal={toggleAuthModal} component={authComponent} />}
							</div>
						</ul>
					</nav>

					<div className="information-container">
						<div className="left-content">
							<h1>Get TensorFlow <br/> Certified Now</h1>
							<p>Today, no platform dominates the BI and analytics space like market leader Tableau. Passing the official. Gain the industry-wide recognition.</p>
						</div>
						<div className="right-content">
							<VideoPlayer playerId="presentation" mediaId="QyhlZf0X" />
						</div>
					</div>
				</div>

				<img src="/connection-pattern.svg" alt="Connection Pattern" className="connection-pattern"/>
			</section>
		</Fragment>
	);
};
