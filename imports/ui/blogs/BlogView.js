import React, { useState, useEffect, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useParams } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { BlogsCollection } from "/imports/api/blogs/blogs";
import { SEO } from "/imports/ui/components/SEO";
import { Navbar } from "/imports/ui/components/Navbar";
import { Footer } from "/imports/ui/components/Footer";
import AuthModal from "/imports/ui/authentication/AuthModal";
import { dateFormat } from "/imports/ui/components/Functions";
import { LazyImage } from "/imports/ui/components/LazyImage";
import BlogItem from "/imports/ui/blogs/BlogItem";
import "/imports/ui/stylesheets/content-view.css";
import "/imports/ui/blogs/styles.css";

export default BlogView = () => {
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [authComponent, setAuthComponent] = useState("");

	const { permalink } = useParams();

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
				{showAuthModal && <AuthModal isOpen={showAuthModal} actionModal={toggleAuthModal} component={authComponent} />}
				<Navbar
					options={[
						{ title: "Home", url: "/" },
						{ title: "Blog", url: "/blog" }
					]}
					toggleAuthModal={toggleAuthModal}
				/>

				<div className="main-wrapper">
					<div className="content-container">
						<h1>{blog.title}</h1>

						<div className="blog-information">
							<span>{dateFormat(blog.createdAt, "dddd D, MMMM YYYY")}</span>
							<LazyImage src={blog.image} alt={`${blog.title} Blog Image`} />
						</div>

						<div className="html-content" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
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

			<Footer />
		</Fragment>
	);
};
