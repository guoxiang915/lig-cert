import React, { useState } from "react";
import Editor from "@codifytools/react-text-editor";
import { Modal } from "/imports/ui/components/Modal";
import { cleanPermalink } from "/imports/ui/components/Functions";
import { blogErrorMessage, blogHasError } from "/imports/ui/components/Validations";

export default BlogModal = ({ isOpen, onClose, blog }) => {
	const [values, setValues] = useState({
		title: blog ? blog.title : "",
		permalink: blog ? blog.permalink : "",
		image: blog ? blog.image : "",
		content: blog ? blog.content : "",
		seoTitle: blog ? blog.seo.title : "",
		seoDescription: blog ? blog.seo.description : "",
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
		if (!values.image) return setValues({ ...values, errorState: "missing-image" });
		if (!values.content) return setValues({ ...values, errorState: "missing-content" });
		if (!values.seoTitle) return setValues({ ...values, errorState: "missing-seo-title" });
		if (!values.seoDescription) return setValues({ ...values, errorState: "missing-seo-description" });

		const blogData = {
			title: values.title,
			permalink: cleanPermalink(values.permalink),
			image: values.image,
			content: values.content,
			seo: { title: values.seoTitle, description: values.seoDescription }
		};

		const blogId = blog ? blog._id : null;
		setValues({ ...values, loading: true });

		Meteor.call("blog.upsert", blogId, blogData, (error) => {
			setValues({ ...values, loading: false });

			if (error) {
				if (error.reason === "Permalink already exists") return setValues({ ...values, errorState: "already-used-permalink" });
			} else {
				onClose();
			}
		});
	};

	const modalAction = `${blog ? "Update" : "Create"} Blog`;

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<h4>{modalAction}</h4>

				<label className={`${blogHasError("title", values.errorState) ? "error" : ""}`}>
					Title:
					<input type="text" name="title" value={values.title} onChange={handleChange} placeholder="e.g. Careers in Data Science" />
				</label>

				<label className={`${blogHasError("permalink", values.errorState) ? "error" : ""}`}>
					Permalink:
					<input type="text" name="permalink" value={values.permalink} onChange={handleChange} placeholder="e.g. careers-data-science" />
				</label>

				<label className={`${blogHasError("image", values.errorState) ? "error" : ""}`}>
					Image:
					<input type="text" name="image" value={values.image} onChange={handleChange} placeholder="e.g. www.example.com/image.jpg" />
				</label>

				<label className={`${blogHasError("content", values.errorState) ? "error" : ""}`}>
					Content:
					<Editor field="content" html={values.content} saveCallback={handleChange} placeholder="e.g. Getting a job in Data Science..." />
				</label>

				<hr/>
				<label className={`${blogHasError("seoTitle", values.errorState) ? "error" : ""}`}>
					Seo Title:
					<input type="text" name="seoTitle" value={values.seoTitle} onChange={handleChange} placeholder="e.g. Get a Job in Data Science" />
				</label>

				<label className={`${blogHasError("seoDescription", values.errorState) ? "error" : ""}`}>
					Seo Description:
					<input type="text" name="seoDescription" value={values.seoDescription} onChange={handleChange} placeholder="e.g. Data Science jobs are trending..." />
				</label>

				{values.errorState && <p>{blogErrorMessage(values.errorState)}</p>}

				<button type="submit" disabled={values.loading}>
					{values.loading ? "Loading..." : modalAction}
				</button>
			</form>
		</Modal>
	);
};
