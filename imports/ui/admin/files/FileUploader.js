import React, { Fragment, useState } from "react";

export default FileUploader = ({ setUploader, fileNames }) => {
	const [error, setError] = useState("");

	const uploadFiles = (event) => {
		setError("");
		const fileInput = event.target;
		const file = event.target.files[0];

		const uploader = new Slingshot.Upload("uploader.files");

		if (!fileNames.includes(file.name)) {
			uploader.send(file, (error, fileUrl) => {
				if (error) {
					console.warn(`[uploader.files] ${error}`);
				} else {
					Meteor.call("file.insert", file.name, fileUrl, (error) => {
						if (error) { console.warn(error); }
					});
					setUploader(null);
				}
			});
			setUploader(uploader);
		} else {
			setError(`The ${file.name} has already been uploaded before.`);
			setUploader(null);
		}
		fileInput.value = null;
	};

	return (
		<Fragment>
			<input onChange={uploadFiles} id="file-uploader" type="file" />
			{error && <p className="error">{error}</p>}
		</Fragment>
	);
};
