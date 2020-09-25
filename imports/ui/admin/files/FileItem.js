import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import copy from "copy-text-to-clipboard";
import { dateFormat } from "/imports/ui/components/Functions";
import { IconCopy, IconDelete } from "/imports/ui/components/Icons";
import { ConfirmAction } from "/imports/ui/components/ConfirmAction";

export default FileItem = ({ file }) => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const toggleConfirmModal = () => setShowConfirmModal(!showConfirmModal);

	const handleCopy = () => copy(file.url);

	const handleDelete = () => {
		Meteor.call("file.remove", file.url, file._id, (error) => {
			if (error) { console.warn(error); }
		});
	};

	return (
		<div className="table-item">
			<div className="file-col">
				<p><strong>{file.name}</strong></p>
				<p>{file.url}</p>
			</div>

			<div className="date-col">
				<p>{dateFormat(file.createdAt, "MMM DD, YYYY - hh:mm A")}</p>
			</div>

			<div className="action-col">
				<span onClick={handleCopy}><IconCopy /></span>
				<span onClick={toggleConfirmModal}><IconDelete /></span>
			</div>

			{showConfirmModal &&
				<ConfirmAction
					isOpen={showConfirmModal}
					onClose={toggleConfirmModal}
					title={`Permanently delete file: ${file.name}`}
					description="<p>Do you want to permanently delete this file?</p><p>This action cannot be undone.</p>"
					buttonText="Delete File"
					action={handleDelete}
				/>
			}
		</div>
	);
};
