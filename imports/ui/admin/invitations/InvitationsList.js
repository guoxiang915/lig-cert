import React, { useState, useEffect, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import loadable from "@loadable/component";
import { InvitationsCollection } from "/imports/api/invitations/invitations";
import { SEO } from "/imports/ui/components/SEO";
import InvitationItem from "/imports/ui/admin/invitations/InvitationItem";
const InvitationModal = loadable(() => import("/imports/ui/admin/invitations/InvitationModal"));
import "/imports/ui/stylesheets/table.css";
import "/imports/ui/admin/invitations/styles.css";

export default InvitationsList = () => {
	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => setShowModal(!showModal);

	const { dataLoading, invitations } = useTracker(() => {
		const subs = Meteor.subscribe("invitations/list");

		return {
			dataLoading: !subs.ready(),
			invitations: InvitationsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
		};
	}, []);

	useEffect(() => { window.prerenderReady = true; }, []);

	return (
		<Fragment>
			<SEO
				title='Invitations Administrator'
				description='Welcome to the invitations administrator section.'
				contentType="website"
				path='admin/invitations'
			/>

			<button type="button" onClick={toggleModal}>Create Invitation</button>

			<div className="table">
				{dataLoading ? <p>Loading...</p> : invitations.map(invitation => <InvitationItem key={invitation._id} invitation={invitation} />)}
			</div>

			{showModal && <InvitationModal isOpen={showModal} onClose={toggleModal} />}
		</Fragment>
	);
};
