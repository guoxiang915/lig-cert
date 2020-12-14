import React, { useState, useEffect, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import loadable from "@loadable/component";
import { SEO } from "/imports/ui/components/SEO";
import { PagesCollection } from "/imports/api/pages/pages";
import PageItem from "/imports/ui/admin/pages/PageItem";
const PageModal = loadable(() => import("/imports/ui/admin/pages/PageModal"));
import "/imports/ui/stylesheets/table.css";
import "/imports/ui/admin/pages/styles.css";

export default PagesList = () => {
	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => setShowModal(!showModal);

	useEffect(() => { window.prerenderReady = true; }, []);

	const { dataLoading, pages } = useTracker(() => {
		const subs = Meteor.subscribe("pages/list");

		return {
			dataLoading: !subs.ready(),
			pages: PagesCollection.find({}, { sort: { createdAt: -1 } }).fetch()
		};
	}, []);

	return (
		<Fragment>
			<SEO
				title='Pages Administration'
				description='Welcome to the Art of Visualization pages administrator section.'
				contentType="website"
				path='admin/pages'
			/>

			<button type="button" onClick={toggleModal}>Create Page</button>

			<div className="table">
				{dataLoading ? <p>Loading...</p> : pages.map(page => <PageItem key={page._id} page={page} />)}
			</div>

			{showModal && <PageModal isOpen={showModal} onClose={toggleModal} />}
		</Fragment>
	);
};
