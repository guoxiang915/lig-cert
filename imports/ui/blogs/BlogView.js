import React, { useState, useEffect, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useParams, Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import loadable from "@loadable/component";
import { BlogsCollection } from "/imports/api/blogs/blogs";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import { SEO } from "/imports/ui/components/SEO";
import { Dropdown, DropdownExternalLink } from "/imports/ui/components/Dropdown";
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

	useEffect(() => {
		window.prerenderReady = true;
		Intercom("boot", { app_id: "ort0cycf" });

		return () => Intercom("shutdown");
	}, []);

	if (dataLoading) return <p>Loading...</p>;

	return (
		<Fragment>
			<SEO
				title={`${blog.seo.title} | Blog`}
				description={blog.seo.description}
				contentType="website"
				path={`blog/${permalink}`}
				image={blog.image}
			/>

			<section className="section blog-header blog-view">
				<div className="main-wrapper">
					<nav>
						<div className="logo-label">
							<Link to="/"><img src="/logo.svg" alt="TF Certification Logo" /></Link>
						</div>

						<ul className="actions hidden-xs">
							<li><Link to="/">Home</Link></li>
							<li><Link to="/blog">Blog</Link></li>

							<div className="buttons">
								{user ? (
									<Fragment>
										<Dropdown title={`Hi ${user.profile.name.first}`}>
											<a className="dropdown-item" onClick={toggleProfileModal}>Profile</a>
											{hasRights(["admin"]) && <Link to="/admin/users" className="dropdown-item">Administrator</Link>}

											<div className="dropdown-container">
												<DropdownExternalLink link="https://intercom.help/TFCertification" className="dropdown-item">Knowledge Base</DropdownExternalLink>
												<DropdownExternalLink link="https://discord.gg/TjhK28Kr9k" className="dropdown-item">Community</DropdownExternalLink>
												<DropdownExternalLink link="mailto:support@tfcertification.intercom.com" className="dropdown-item">Contact</DropdownExternalLink>
											</div>

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
					<img src="/connection-pattern.svg" className="image-pattern connection-pattern"/>
					<img src="/landing/courses-bottom-pattern.svg" className="image-pattern color-bottom-pattern"/>
				</div>

				<LazyImage src="/landing/advantages-bottom-pattern.svg" classes="image-pattern bottom-pattern"/>
			</section>

			{recommendations.length > 0 && (
				<section className="section blog-view-recommendations">
					<div className="main-wrapper">
						<h2>Recommendations</h2>

						<div className="blogs-container">
							{recommendations.map(blog => <BlogItem key={blog._id} blog={blog} />)}
						</div>
					</div>
				</section>
			)}

			<section className="section footer">
				<div className="main-wrapper">
					<p>&copy; Copyright 2021 — All rights reserved — TF Certification</p>
					<p>
						<Link to="/privacy-policy">Privacy Policy</Link>
						<span className="hidden-xs">&bull;</span>
						<Link to="/terms-conditions">Terms & Conditions</Link>
					</p>
				</div>
			</section>
		</Fragment>
	);
};
