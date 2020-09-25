import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import copy from "copy-text-to-clipboard";
import { dateFormat } from "/imports/ui/components/Functions";
import { IconCopy, IconDelete } from "/imports/ui/components/Icons";
import { ConfirmAction } from "/imports/ui/components/ConfirmAction";

export default InvitationItem = ({ invitation }) => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const toggleConfirmModal = () => setShowConfirmModal(!showConfirmModal);

	const handleCopy = () => copy(`${Meteor.absoluteUrl()}invite/${invitation.token}`);

	const handleDelete = () => {
		Meteor.call("invitation.remove", invitation._id, (error) => {
			if (error) { console.warn(error); }
		});
	};

	return (
		<div className="table-item">
			<div className="invitation-col">
				<p><strong>{invitation.email}</strong></p>
				<p>{`${Meteor.absoluteUrl()}invite/${invitation.token}`}</p>
			</div>

			<div className="invitation-state-col">
				<p>{invitation.completedAt ? "Active" : "Not Opened"}</p>
			</div>

			<div className="date-col">
				<p>{dateFormat(invitation.createdAt, "MMM DD, YYYY - hh:mm A")}</p>
			</div>

			<div className="action-col">
				<span onClick={handleCopy}><IconCopy /></span>
				<span onClick={toggleConfirmModal}><IconDelete /></span>
			</div>

			{showConfirmModal &&
				<ConfirmAction
					isOpen={showConfirmModal}
					onClose={toggleConfirmModal}
					title="Permanently Delete Invitation"
					description="<p>Do you want to permanently delete this invitation?</p><p>This action cannot be undone.</p>"
					buttonText="Delete Invitation"
					action={handleDelete}
				/>
			}
		</div>
	);
};
