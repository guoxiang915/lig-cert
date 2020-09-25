import React, { useState, useEffect, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { FilesCollection } from "/imports/api/files/files";
import { SEO } from "/imports/ui/components/SEO";
import { _pluck } from "/imports/ui/components/Functions";
import FileUploader from "/imports/ui/admin/files/FileUploader";
import FileItem from "/imports/ui/admin/files/FileItem";
import FileUploaderItem from "/imports/ui/admin/files/FileUploaderItem";
import "/imports/ui/stylesheets/table.css";
import "/imports/ui/admin/files/styles.css";

export default FilesList = () => {
	const [uploader, setUploader] = useState(null);

	const { dataLoading, files } = useTracker(() => {
		const subs = Meteor.subscribe("files/list");

		return {
			dataLoading: !subs.ready(),
			files: FilesCollection.find({}, { sort: { createdAt: -1 } }).fetch()
		};
	}, []);

	useEffect(() => { window.prerenderReady = true; }, []);

	return (
		<Fragment>
			<SEO
				title='Files Administrator'
				description='Welcome to the Art of Visualization files administrator section.'
				contentType="website"
				path='admin/files'
			/>

			<FileUploader setUploader={setUploader} fileNames={_pluck(files, "name")} />

			{uploader && <FileUploaderItem uploader={uploader} setUploader={setUploader}/>}

			<div className="table">
				{dataLoading ? <p>Loading...</p> : files.map(file => <FileItem key={file._id} file={file} />)}
			</div>
		</Fragment>
	);
};
