import React, { Fragment } from "react";

export default FileUploader = ({ setUploader, fileNames }) => {
	const uploadFiles = (event) => {
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
			console.warn(`The ${file.name} has already been uploaded`);
			setUploader(null);
		}
		fileInput.value = null;
	};

	return (
		<Fragment>
			<label htmlFor="file-uploader">Add File</label>
			<input onChange={uploadFiles} id="file-uploader" type="file" />
		</Fragment>
	);
};
