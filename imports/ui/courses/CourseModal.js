import React, { useState } from "react";
import Editor from "@codifytools/react-text-editor";
import { Modal } from "/imports/ui/components/Modal";
import { cleanPermalink } from "/imports/ui/components/Functions";
import { IconWarning } from "/imports/ui/components/Icons";
import { courseHasError, courseErrorMessage } from "/imports/ui/components/Validations";
import { ListSelector } from "/imports/ui/components/ListSelector";

export default CourseModal = ({ isOpen, onClose, course }) => {
	const [values, setValues] = useState({
		title: course ? course.title : "",
		permalink: course ? course.permalink : "",
		mediaId: course ? course.mediaId : "",
		description: course ? course.description : "",
		price: course ? course.price : "",
		accessRoles: course ? course.accessRoles : [],
		seoTitle: course ? course.seo.title : "",
		seoDescription: course ? course.seo.description : "",
		errorState: "",
		loading: false
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (!values.title) return setValues({ ...values, errorState: "missing-title" });
		if (!values.permalink) return setValues({ ...values, errorState: "missing-permalink" });
		if (!values.mediaId) return setValues({ ...values, errorState: "missing-media-id" });
		if (!values.description) return setValues({ ...values, errorState: "missing-description" });
		if (!values.seoTitle) return setValues({ ...values, errorState: "missing-seo-title" });
		if (!values.seoDescription) return setValues({ ...values, errorState: "missing-seo-description" });

		const courseData = {
			title: values.title,
			permalink: cleanPermalink(values.permalink),
			mediaId: values.mediaId,
			description: values.description,
			price: parseInt(values.price),
			modules: course ? course.modules : [],
			accessRoles: values.accessRoles,
			seo: { title: values.seoTitle, description: values.seoDescription }
		};

		const courseId = course ? course._id : null;
		setValues({ ...values, loading: true });

		Meteor.call("course.upsert", courseId, courseData, (error) => {
			setValues({ ...values, loading: false });

			if (error) {
				if (error.reason === "Permalink already exists") return setValues({ ...values, errorState: "already-used-permalink" });
				console.warn(error);
			} else {
				onClose();
			}
		});
	};

	const modalAction = `${course ? "Update" : "Create"} Course`;

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<h4>{modalAction}</h4>

				<label className={`${courseHasError("title", values.errorState) ? "error" : ""}`}>
					Title:
					<input type="text" name="title" value={values.title} onChange={handleChange} placeholder="e.g. Tableau Certification" />
				</label>

				<label className={`${courseHasError("permalink", values.errorState) ? "error" : ""}`}>
					Permalink:
					<input type="text" name="permalink" value={values.permalink} onChange={handleChange} placeholder="e.g. tableau-certification" />
				</label>

				<label className={`${courseHasError("mediaId", values.errorState) ? "error" : ""}`}>
					mediaId:
					<input type="text" name="mediaId" value={values.mediaId} onChange={handleChange} placeholder="e.g. YreFwqn9" />
				</label>

				<label className={`${courseHasError("description", values.errorState) ? "error" : ""}`}>
					Description:
					<Editor field="description" html={values.description} saveCallback={handleChange} placeholder="e.g. Welcome to the tableau certification course..." />
				</label>

				<label className={`${courseHasError("mediaLength", values.errorState) ? "error" : ""}`}>
					Price (in USD):
					<input type="number" name="price" value={values.price} onChange={handleChange} placeholder="e.g. 399" />
				</label>

				<label className={`${courseHasError("seoTitle", values.errorState) ? "error" : ""}`}>
					Seo Title:
					<input type="text" name="seoTitle" value={values.seoTitle} onChange={handleChange} placeholder="e.g. Tensorflow Certification" />
				</label>

				<label className={`${courseHasError("seoDescription", values.errorState) ? "error" : ""}`}>
					Seo Description:
					<input type="text" name="seoDescription" value={values.seoDescription} onChange={handleChange} placeholder="e.g. Tensorflow Ceritifcation will teach you to..." />
				</label>

				<label>
					Access Roles:
					<ListSelector field="accessRoles" options={["course-tcp"]} currentValues={values.accessRoles} saveCallback={handleChange} />
				</label>

				{values.errorState && <p className="error-message"><IconWarning/>{courseErrorMessage(values.errorState)}</p>}

				<button type="submit" disabled={values.loading}>
					{values.loading && <span className="loading"></span>} {modalAction}
				</button>
			</form>
		</Modal>
	);
};
