import React, { useState, useEffect, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { SEO } from "/imports/ui/components/SEO";
import { Footer } from "/imports/ui/components/Footer";
import { Navbar } from "/imports/ui/components/Navbar";
import AuthModal from "/imports/ui/authentication/AuthModal";
import { BlogsCollection } from "/imports/api/blogs/blogs";
import BlogItem from "/imports/ui/blogs/BlogItem";
import "/imports/ui/blogs/styles.css";

export default BlogsList = () => {
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [authComponent, setAuthComponent] = useState("");

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
				{showAuthModal && <AuthModal isOpen={showAuthModal} actionModal={toggleAuthModal} component={authComponent} />}
				<Navbar
					options={[
						{ title: "Home", url: "/" },
						{ title: "Blog", url: "/blog" }
					]}
					toggleAuthModal={toggleAuthModal}
				/>

				<div className="main-wrapper">
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

			<Footer />
		</Fragment>
	);
};
