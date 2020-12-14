import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Modal } from "/imports/ui/components/Modal";
import { TextEditor } from "/imports/ui/components/TextEditor";
import { ArrayManager } from "/imports/ui/components/ArrayManager";
import { cleanPermalink } from "/imports/ui/components/Functions";
import { IconWarning } from "/imports/ui/components/Icons";
import { pageHasError, pageErrorMessage } from "/imports/ui/components/Validations";

export default PageModal = ({ isOpen, onClose, page }) => {
	const [values, setValues] = useState({
		title: page ? page.title : "",
		permalink: page ? page.permalink : "",
		content: page ? page.content : "",
		scripts: page ? page.scripts : [],
		seoTitle: page ? page.seo.title : "",
		seoDescription: page ? page.seo.description : "",
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
		if (!values.content) return setValues({ ...values, errorState: "missing-content" });
		if (!values.seoTitle) return setValues({ ...values, errorState: "missing-seo-title" });
		if (!values.seoDescription) return setValues({ ...values, errorState: "missing-seo-description" });

		const pageData = {
			title: values.title,
			permalink: cleanPermalink(values.permalink),
			content: values.content,
			scripts: values.scripts,
			seo: { title: values.seoTitle, description: values.seoDescription }
		};

		const pageId = page ? page._id : null;
		setValues({ ...values, loading: true });

		Meteor.call("page.upsert", pageId, pageData, (error) => {
			setValues({ ...values, loading: false });

			if (error) {
				if (error.reason === "Permalink already exists") return setValues({ ...values, errorState: "already-used-permalink" });
				console.warn(error);
			} else {
				onClose();
			}
		});
	};

	const modalAction = `${page ? "Update" : "Create"} Page`; ;

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<h4>{modalAction}</h4>

				<label className={`${pageHasError("title", values.errorState) ? "error" : ""}`}>
					Title:
					<input type="text" name="title" value={values.title} onChange={handleChange} placeholder="e.g. Tableau Course Materials" />
				</label>

				<label className={`${pageHasError("permalink", values.errorState) ? "error" : ""}`}>
					Permalink:
					<input type="text" name="permalink" value={values.permalink} onChange={handleChange} placeholder="e.g. tableau-course-materials" />
				</label>

				<label className={`${pageHasError("content", values.errorState) ? "error" : ""}`}>
					Content
					<TextEditor field="content" html={values.content} disabled={false} saveCallback={handleChange} placeholder="e.g. Download course course materials for the module ..." enableEditor={true} />
				</label>
				<hr/>

				<label>
					Scripts
					<ArrayManager field="scripts" currentValue={values.scripts} saveCallback={handleChange} inputPlaceholder="Script..." buttonText="Add Script" />
				</label>

				<hr/>
				<label className={`${pageHasError("seoTitle", values.errorState) ? "error" : ""}`}>
					SEO Title:
					<input type="text" name="seoTitle" value={values.seoTitle} onChange={handleChange} placeholder="e.g. Tableau Course Materials" />
				</label>

				<label className={`${pageHasError("seoDescription", values.errorState) ? "error" : ""}`}>
					SEO Description:
					<textarea name="seoDescription" value={values.seoDescription} onChange={handleChange} placeholder="e.g. Course materials assets displayed in one..."></textarea>
				</label>

				{values.errorState && <p className="error-message"><IconWarning/>{pageErrorMessage(values.errorState)}</p>}

				<button type="submit" disabled={values.loading}>
					{values.loading ? "Loading..." : modalAction}
				</button>
			</form>
		</Modal>
	);
};
