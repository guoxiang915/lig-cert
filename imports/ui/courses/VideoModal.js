import React, { useState } from "react";
import { CoursesCollection } from "/imports/api/courses/courses";
import { UnitsCollection } from "/imports/api/courses/units";
import { cleanPermalink, _findWhere } from "/imports/ui/components/Functions";
import { Modal } from "/imports/ui/components/Modal";
import { IconWarning } from "/imports/ui/components/Icons";
import { courseHasError, courseErrorMessage } from "/imports/ui/components/Validations";

export default VideoModal = ({ isOpen, actionModal, unit, courseId, moduleId }) => {
	// Find order for new unit
	const findOrder = function(courseId, moduleId) {
		const course = CoursesCollection.findOne({ _id: courseId });
		const currentModule = _findWhere(course.modules, moduleId, "_id");

		const lastUnit = UnitsCollection.findOne({ courseId: courseId, moduleId: moduleId }, { sort: { order: -1 } });

		if (lastUnit) {
			return lastUnit.order + 1;
		} else {
			const prevModule = _findWhere(course.modules, currentModule.order - 1, "order");
			return prevModule ? findOrder(courseId, prevModule._id) : 0;
		}
	};

	const [values, setValues] = useState({
		title: unit ? unit.title : "",
		permalink: unit ? unit.permalink : "",
		order: unit ? unit.order : findOrder(courseId, moduleId),
		mediaId: unit ? unit.content.mediaId : "",
		mediaLength: unit ? unit.content.mediaLength : "",
		errorState: "",
		loading: false
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleDelete = (event) => {
		event.preventDefault();
		event.persist(); // Used to maintain the event for the asynchronous call of actionModal

		Meteor.call("unit.remove", unit._id, (error) => {
			if (error) { console.warn(error); }
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (!values.title) return setValues({ ...values, errorState: "missing-title" });
		if (!values.permalink) return setValues({ ...values, errorState: "missing-permalink" });
		if (!values.mediaId) return setValues({ ...values, errorState: "missing-media-id" });
		if (!values.mediaLength) return setValues({ ...values, errorState: "missing-media-length" });

		const unitData = {
			title: values.title,
			permalink: cleanPermalink(values.permalink),
			type: "video",
			courseId: courseId,
			moduleId: moduleId,
			order: values.order,
			content: {
				mediaId: values.mediaId,
				mediaLength: parseInt(values.mediaLength)
			}
		};

		event.persist();
		const unitId = unit ? unit._id : null;
		setValues({ ...values, loading: true });

		Meteor.call("unit.upsert", unitId, unitData, (error) => {
			setValues({ ...values, loading: false });

			if (error) {
				if (error.reason === "Permalink already exists") return setValues({ ...values, errorState: "already-used-permalink" });
				console.warn(error);
			} else {
				actionModal(event, false);
			}
		});
	};

	const modalAction = `${unit ? "Update" : "Create"} Video Unit`;

	return (
		<Modal isOpen={isOpen} onClose={(event) => actionModal(event, !isOpen)}>
			<form onSubmit={handleSubmit}>
				<h4>{modalAction}</h4>

				<label className={`${courseHasError("title", values.errorState) ? "error" : ""}`}>
					Title:
					<input type="text" name="title" value={values.title} onChange={handleChange} placeholder="e.g. Course Introduction" />
				</label>

				<label className={`${courseHasError("permalink", values.errorState) ? "error" : ""}`}>
					Permalink:
					<input type="text" name="permalink" value={values.permalink} onChange={handleChange} placeholder="e.g. course-introduction" />
				</label>

				<label className={`${courseHasError("mediaId", values.errorState) ? "error" : ""}`}>
					mediaId:
					<input type="text" name="mediaId" value={values.mediaId} onChange={handleChange} placeholder="e.g. nwGXn2Kh" />
				</label>

				<label className={`${courseHasError("mediaLength", values.errorState) ? "error" : ""}`}>
					Video Length:
					<input type="number" name="mediaLength" value={values.mediaLength} onChange={handleChange} placeholder="e.g. 241" />
				</label>

				{values.errorState && <p className="error-message"><IconWarning/>{courseErrorMessage(values.errorState)}</p>}

				{unit && <button onClick={handleDelete}>Delete Unit</button>}

				<button type="submit" disabled={values.loading}>
					{values.loading && <span className="loading"></span>} {modalAction}
				</button>
			</form>
		</Modal>
	);
};
