import React, { useState, useEffect, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useHistory } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import loadable from "@loadable/component";
import { SEO } from "/imports/ui/components/SEO";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import { Dropdown } from "/imports/ui/components/Dropdown";
import { hasRights } from "/imports/ui/components/Functions";
import AuthModal from "/imports/ui/authentication/AuthModal";
import { BlogsCollection } from "/imports/api/blogs/blogs";
import BlogItem from "/imports/ui/blogs/BlogItem";
const ProfileModal = loadable(() => import("/imports/ui/profile/ProfileModal"));
import "/imports/ui/stylesheets/navbar.css";
import "/imports/ui/stylesheets/footer.css";
import "/imports/ui/blogs/styles.css";

export default BlogsList = () => {
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [authComponent, setAuthComponent] = useState("");
	const [showProfileModal, setShowProfileModal] = useState(false);

	const history = useHistory();
	const { user } = useAccount();

	const { dataLoading, blogs } = useTracker(() => {
		const subs = Meteor.subscribe("blogs/list");

		return {
			dataLoading: !subs.ready(),
			blogs: BlogsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
		};
	}, []);

	const toggleAuthModal = (event, activeModal, component) => {
		event.preventDefault();
		if (component) setAuthComponent(component);
		setShowAuthModal(activeModal);
	};

	const toggleProfileModal = () => setShowProfileModal(!showProfileModal);

	useEffect(() => {
		window.prerenderReady = true;
		Intercom("boot", { app_id: "ort0cycf" });

		return () => Intercom("shutdown");
	}, []);

	if (dataLoading) return <p>Loading...</p>;

	return (
		<Fragment>
			<SEO
				title='Blog'
				description='Welcome to the TF Certification Blogs page.'
				contentType="website"
				path='blog'
			/>

			<section className="section blog-header">
				<div className="main-wrapper">
					<nav>
						<div className="logo-label">
							<img src="/logo.svg" alt="TF Certification Logo" onClick={() => history.push("/")} />
						</div>

						<ul className="actions hidden-xs">
							<li onClick={() => history.push("/")}><a>Home</a></li>
							<li onClick={() => history.push("/blog")}><a>Blog</a></li>

							<div className="buttons">
								{user ? (
									<Fragment>
										<Dropdown title={`Hi ${user.profile.name.first}`}>
											<a className="dropdown-item" onClick={toggleProfileModal}>Profile</a>
											{hasRights(["admin"]) && <a className="dropdown-item" onClick={() => history.push("/admin/users")}>Administrator</a>}
											<a className="dropdown-item" onClick={() => Meteor.logout()}>Logout</a>
										</Dropdown>

										{showProfileModal && <ProfileModal isOpen={showProfileModal} closeModal={toggleProfileModal} />}
									</Fragment>
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

					<h2>Blogs</h2>

					<div className="blogs-container">
						{blogs.map(blog => <BlogItem key={blog._id} blog={blog} />)}
					</div>
				</div>

				<div className="background-color-container">
					<img src="/connection-pattern.svg" className="image-pattern connection-pattern"/>
					<img src="/landing/courses-bottom-pattern.svg" className="image-pattern color-bottom-pattern"/>
				</div>
			</section>

			<section className="section footer">
				<div className="main-wrapper">
					<p>&copy; Copyright 2021 — All rights reserved — TF Certification</p>
					<p>
						<a href="/privacy-policy">Privacy Policy</a>
						<span className="hidden-xs">&bull;</span>
						<a href="/terms-conditions">Terms & Conditions</a>
					</p>
				</div>
			</section>
		</Fragment>
	);
};
