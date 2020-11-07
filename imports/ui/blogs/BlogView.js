import React, { useState, useEffect, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useParams, useHistory } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import loadable from "@loadable/component";
import { BlogsCollection } from "/imports/api/blogs/blogs";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import { SEO } from "/imports/ui/components/SEO";
import { Dropdown } from "/imports/ui/components/Dropdown";
import AuthModal from "/imports/ui/authentication/AuthModal";
import { hasRights, dateFormat } from "/imports/ui/components/Functions";
import { LazyImage } from "/imports/ui/components/LazyImage";
import BlogItem from "/imports/ui/blogs/BlogItem";
const ProfileModal = loadable(() => import("/imports/ui/profile/ProfileModal"));
import "/imports/ui/stylesheets/navbar.css";
import "/imports/ui/stylesheets/footer.css";
import "/imports/ui/stylesheets/content-view.css";
import "/imports/ui/blogs/styles.css";

export default BlogView = () => {
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [authComponent, setAuthComponent] = useState("");
	const [showProfileModal, setShowProfileModal] = useState(false);

	const { permalink } = useParams();
	const history = useHistory();
	const { user } = useAccount();

	const { dataLoading, blog, recommendations } = useTracker(() => {
		const subs = Meteor.subscribe("blog/view", permalink);

		return {
			dataLoading: !subs.ready(),
			blog: BlogsCollection.findOne({ permalink: permalink }),
			recommendations: BlogsCollection.find({ permalink: { $ne: permalink } }, { limit: 3 }).fetch()
		};
	}, [permalink]);

	const toggleAuthModal = (event, activeModal, component) => {
		event.preventDefault();
		if (component) setAuthComponent(component);
		setShowAuthModal(activeModal);
	};

	const toggleProfileModal = () => setShowProfileModal(!showProfileModal);

	useEffect(() => { window.prerenderReady = true; }, []);

	if (dataLoading) return <p>Loading...</p>;

	return (
		<Fragment>
			<SEO
				title={`${blog.seo.title} | Blog`}
				description={blog.seo.description}
				contentType="website"
				path={`blog/${permalink}`}
			/>

			<section className="section blog-header blog-view">
				<div className="main-wrapper">
					<nav>
						<div className="logo-label">
							<img src="/logo.svg" alt="TF Certification Logo"/>
						</div>

						<ul className="actions hidden-xs">
							<li onClick={() => history.push("/")}><a>Home</a></li>
							<li onClick={() => history.push("/blog")}><a>Blogs</a></li>

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

					<div className="content-container">
						<div className="main-wrapper">
							<h1>{blog.title}</h1>

							<div className="blog-information">
								<span>{dateFormat(blog.createdAt, "dddd D, MMMM YYYY")}</span>
								<LazyImage src={blog.image} alt={`${blog.title} Blog Image`} />
							</div>

							<div className="html-content" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
						</div>
					</div>
				</div>

				<div className="background-color-container">
					<img src="/connection-pattern.svg" alt="Connection Pattern" className="image-pattern connection-pattern"/>
					<img src="/landing/courses-bottom-pattern.svg" alt="Header Bottom Pattern" className="image-pattern color-bottom-pattern"/>
				</div>

				<LazyImage src="/landing/advantages-bottom-pattern.svg" alt="Advantages Bottom Pattern" classes="image-pattern bottom-pattern"/>
			</section>

			<section className="section blog-view-recommendations">
				<div className="main-wrapper">
					<h2>Recommendations</h2>

					<div className="blogs-container">
						{recommendations.map(blog => <BlogItem key={blog._id} blog={blog} />)}
					</div>
				</div>
			</section>

			<section className="section footer">
				<div className="main-wrapper">
					<p>&copy; Copyright 2020 — All rights reserved — TF Certification</p>
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
