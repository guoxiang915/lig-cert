
import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useHistory } from "react-router-dom";
import loadable from "@loadable/component";
import { dateFormat } from "/imports/ui/components/Functions";
import { IconExternalLink, IconEdit, IconDelete } from "/imports/ui/components/Icons";
import { ConfirmAction } from "/imports/ui/components/ConfirmAction";
const PageModal = loadable(() => import("/imports/ui/admin/pages/PageModal"));

export default PageItem = ({ page }) => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const toggleConfirmModal = () => setShowConfirmModal(!showConfirmModal);
	const toggleEditModal = () => setShowEditModal(!showEditModal);

	const history = useHistory();

	const handleDelete = () => {
		Meteor.call("page.remove", page._id, (error) => {
			if (error) { console.warn(error); }
		});
	};

	return (
		<div className="table-item">
			<div className="page-col">
				<p><strong>{page.title}</strong></p>
				<p>{`${Meteor.absoluteUrl()}pages/${page.permalink}`}</p>
			</div>

			<div className="date-col">
				<p>{dateFormat(page.createdAt, "MMM DD, YYYY - hh:mm A")}</p>
			</div>

			<div className="action-col three">
				<span onClick={() => history.push(`/pages/${page.permalink}`)}><IconExternalLink /></span>
				<span onClick={toggleEditModal}><IconEdit /></span>
				<span onClick={toggleConfirmModal}><IconDelete /></span>
			</div>

			{showEditModal && <PageModal isOpen={showEditModal} onClose={toggleEditModal} page={page} />}
			{showConfirmModal &&
				<ConfirmAction
					isOpen={showConfirmModal}
					onClose={toggleConfirmModal}
					title="Permanently Delete Page"
					description="<p>Do you want to permanently delete this page?</p><p>This action cannot be undone.</p>"
					buttonText="Delete Page"
					action={handleDelete}
				/>
			}
		</div>
	);
};
