import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import loadable from "@loadable/component";
import { useHistory } from "react-router-dom";
import { dateFormat } from "/imports/ui/components/Functions";
import { IconExternalLink, IconEdit, IconDelete } from "/imports/ui/components/Icons";
import { ConfirmAction } from "/imports/ui/components/ConfirmAction";
const CourseModal = loadable(() => import("/imports/ui/courses/CourseModal"));

export default CourseItem = ({ course }) => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const toggleConfirmModal = () => setShowConfirmModal(!showConfirmModal);
	const toggleEditModal = () => setShowEditModal(!showEditModal);

	const history = useHistory();

	const handleDelete = () => {
		Meteor.call("course.remove", course._id, (error) => {
			if (error) { console.warn(error); }
		});
	};

	return (
		<div className="table-item">
			<div className="course-col">
				<p><strong>{course.title}</strong></p>
				<p>{`${Meteor.absoluteUrl()}courses/${course.permalink}`}</p>
			</div>

			<div className="date-col">
				<p>{dateFormat(course.createdAt, "MMM DD, YYYY - hh:mm A")}</p>
			</div>

			<div className="action-col three">
				<span onClick={() => history.push(`/courses/${course.permalink}`)}><IconExternalLink /></span>
				<span onClick={toggleEditModal}><IconEdit /></span>
				<span onClick={toggleConfirmModal}><IconDelete /></span>
			</div>

			{showEditModal && <CourseModal isOpen={showEditModal} onClose={toggleEditModal} course={course} />}
			{showConfirmModal &&
				<ConfirmAction
					isOpen={showConfirmModal}
					onClose={toggleConfirmModal}
					title="Permanently Delete Course"
					description="<p>Do you want to permanently delete this course?</p><p>This action cannot be undone.</p>"
					buttonText="Delete Course"
					action={handleDelete}
				/>
			}
		</div>
	);
};
