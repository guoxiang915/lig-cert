import React, { useState, useEffect, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useParams } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { PagesCollection } from "/imports/api/pages/pages";
import { SEO } from "/imports/ui/components/SEO";
import { Navbar } from "/imports/ui/components/Navbar";
import { Footer } from "/imports/ui/components/Footer";
import AuthModal from "/imports/ui/authentication/AuthModal";
import { dateFormat } from "/imports/ui/components/Functions";
import "/imports/ui/stylesheets/content-view.css";
import "/imports/ui/pages/styles.css";

export default PageView = () => {
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [authComponent, setAuthComponent] = useState("");

	const { permalink } = useParams();

	const { dataLoading, page } = useTracker(() => {
		const subs = Meteor.subscribe("page/view", permalink);

		return {
			dataLoading: !subs.ready(),
			page: PagesCollection.findOne({ permalink: permalink })
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
				title={`${page.seo.title} | Page`}
				description={page.seo.description}
				contentType="website"
				scripts={page.scripts}
				path={`pages/${permalink}`}
			/>

			<section className="section page-header page-view">
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
						<h1>{page.title}</h1>

						<div className="page-information">
							<span>{dateFormat(page.createdAt, "dddd D, MMMM YYYY")}</span>
						</div>

						<div className="html-content" dangerouslySetInnerHTML={{ __html: page.content }}></div>
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
