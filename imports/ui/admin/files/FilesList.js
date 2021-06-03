import React, { useState, useEffect, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { FilesCollection } from "/imports/api/files/files";
import { SEO } from "/imports/ui/components/SEO";
import { SearchInput } from "/imports/ui/components/SearchInput";
import { _pluck } from "/imports/ui/components/Functions";
import FileUploader from "/imports/ui/admin/files/FileUploader";
import FileItem from "/imports/ui/admin/files/FileItem";
import FileUploaderItem from "/imports/ui/admin/files/FileUploaderItem";
import "/imports/ui/stylesheets/table.css";
import "/imports/ui/admin/files/styles.css";

export default FilesList = () => {
	const [filters, setfilters] = useState({ amount_page: 25, query: "" });
	const [uploader, setUploader] = useState(null);
	
	useEffect(() => { window.prerenderReady = true; }, []);

	const { dataLoading, files } = useTracker(() => {
		const subs = Meteor.subscribe("files/list", filters);

		return {
			dataLoading: !subs.ready(),
			files: FilesCollection.find({}, { sort: { createdAt: -1 } }).fetch()
		};
	}, [filters]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setfilters({ ...filters, [name]: value });
	};

	return (
		<Fragment>
			<SEO
				title='Files Administrator'
				description='Welcome to the files administrator section.'
				contentType="website"
				path='admin/files'
			/>

			<SearchInput
				field="query"
				value={filters.query}
				placeholder="Search file by name"
				saveCallback={handleChange}
			/>

			<FileUploader setUploader={setUploader} fileNames={_pluck(files, "name")} />

			{uploader && <FileUploaderItem uploader={uploader} setUploader={setUploader}/>}

			<div className="table">
				{dataLoading ? <p>Loading...</p> : files.map(file => <FileItem key={file._id} file={file} />)}
			</div>

			{files.length > filters.amount_page && <button onClick={() => setfilters({ ...filters, amount_page: filters.amount_page + 25 })}>Load More</button>}
		</Fragment>
	);
};
