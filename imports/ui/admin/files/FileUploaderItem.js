import React, { useEffect, useState } from "react";

let refreshTimer = null;

export default FileUploaderItem = ({ uploader, setUploader }) => {
	const [values, setValues] = useState({ progress: 0, hasError: false });

	useEffect(() => {
		if (uploader.status() !== "failed") {
			refreshTimer = getUploadProgress();
		} else {
			setValues({ ...values, hasError: true });
		}
		return () => clearInterval(refreshTimer);
	}, [uploader]);

	const getUploadProgress = () => {
		return setInterval(() => {
			if (uploader.status() === "failed") {
				setValues({ ...values, hasError: true });
				return clearInterval(refreshTimer);
			}

			const progress = Math.round(uploader.progress() * 100);

			if (progress != 100) {
				setValues({ ...values, progress: isNaN(progress) ? 0 : progress });
			} else {
				clearInterval(refreshTimer);
			}
		}, 50);
	};

	return (
		<div>
			<div>
				{uploader.file.name}
				{values.hasError ? <span>(This file has an invalid type or exceeded the max size 10 MB)</span> : <span> - Uploading: {values.progress}%</span>}
			</div>

			{values.hasError && <button onClick={() => setUploader(null)}>Remove</button>}
			<hr/>
		</div>
	);
};
