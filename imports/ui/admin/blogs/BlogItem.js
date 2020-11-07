
import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useHistory } from "react-router-dom";
import loadable from "@loadable/component";
import { dateFormat } from "/imports/ui/components/Functions";
import { IconExternalLink, IconEdit, IconDelete } from "/imports/ui/components/Icons";
import { ConfirmAction } from "/imports/ui/components/ConfirmAction";
const BlogModal = loadable(() => import("/imports/ui/admin/blogs/BlogModal"));

export default BlogItem = ({ blog }) => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const toggleConfirmModal = () => setShowConfirmModal(!showConfirmModal);
	const toggleEditModal = () => setShowEditModal(!showEditModal);

	const history = useHistory();

	const handleDelete = () => {
		Meteor.call("blog.remove", blog._id, (error) => {
			if (error) { console.warn(error); }
		});
	};

	return (
		<div className="table-item">
			<div className="blog-col">
				<p><strong>{blog.title}</strong></p>
				<p>{`${Meteor.absoluteUrl()}blog/${blog.permalink}`}</p>
			</div>

			<div className="date-col">
				<p>{dateFormat(blog.createdAt, "MMM DD, YYYY - hh:mm A")}</p>
			</div>

			<div className="action-col three">
				<span onClick={() => history.push(`/blog/${blog.permalink}`)}><IconExternalLink /></span>
				<span onClick={toggleEditModal}><IconEdit /></span>
				<span onClick={toggleConfirmModal}><IconDelete /></span>
			</div>

			{showEditModal && <BlogModal isOpen={showEditModal} onClose={toggleEditModal} blog={blog} />}
			{showConfirmModal &&
				<ConfirmAction
					isOpen={showConfirmModal}
					onClose={toggleConfirmModal}
					title="Permanently Delete Blog"
					description="<p>Do you want to permanently delete this blog?</p><p>This action cannot be undone.</p>"
					buttonText="Delete Blog"
					action={handleDelete}
				/>
			}
		</div>
	);
};
