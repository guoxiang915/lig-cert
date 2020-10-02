import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { Modal } from "/imports/ui/components/Modal";
import { IconWarning } from "/imports/ui/components/Icons";
import { courseHasError, courseErrorMessage } from "/imports/ui/components/Validations";

export default ModuleModal = ({ isOpen, onClose, course, module }) => {
	const [values, setValues] = useState({
		title: module ? module.title : "",
		errorState: "",
		loading: false
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleDelete = (event) => {
		event.preventDefault();
		const modules = course.modules;
		modules.splice(module.order, 1);

		Meteor.call("module.remove", course._id, modules, module._id, (error) => {
			if (error) {
				console.warn(error);
			} else {
				onClose();
			}
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (!values.title) return setValues({ ...values, errorState: "missing-title" });

		const moduleData = {
			_id: module ? module._id : Random.id(),
			order: module ? module.order : course.modules.length,
			title: values.title
		};

		course.modules[moduleData.order] = moduleData;

		setValues({ ...values, loading: true });

		Meteor.call("course.upsert", course._id, { modules: course.modules }, (error) => {
			setValues({ ...values, loading: false });

			if (error) {
				console.warn(error);
			} else {
				onClose();
			}
		});
	};

	const modalAction = `${module ? "Update" : "Create"} Module`;

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<h4>{modalAction}</h4>

				<label className={`${courseHasError("title", values.errorState) ? "error" : ""}`}>
					Title:
					<input type="text" name="title" value={values.title} onChange={handleChange} placeholder="Module title..." />
				</label>

				{values.errorState && <p className="error-message"><IconWarning/>{courseErrorMessage(values.errorState)}</p>}

				{module && <button onClick={handleDelete}>Delete Module</button>}

				<button type="submit" disabled={values.loading}>
					{values.loading && <span className="loading"></span>} {modalAction}
				</button>
			</form>
		</Modal>
	);
};
