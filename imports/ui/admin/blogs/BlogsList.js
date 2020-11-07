import React, { useState, useEffect, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import loadable from "@loadable/component";
import { SEO } from "/imports/ui/components/SEO";
import { BlogsCollection } from "/imports/api/blogs/blogs";
import BlogItem from "/imports/ui/admin/blogs/BlogItem";
const BlogModal = loadable(() => import("/imports/ui/admin/blogs/BlogModal"));
import "/imports/ui/stylesheets/table.css";
import "/imports/ui/admin/blogs/styles.css";

export default AdminBlogsList = () => {
	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => setShowModal(!showModal);

	useEffect(() => { window.prerenderReady = true; }, []);

	const { dataLoading, blogs } = useTracker(() => {
		const subs = Meteor.subscribe("blogs/list", true);

		return {
			dataLoading: !subs.ready(),
			blogs: BlogsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
		};
	}, []);

	return (
		<Fragment>
			<SEO
				title='Blogs Administration'
				description='Welcome to the blogs administration section.'
				contentType="website"
				path='admin/blogs'
			/>

			<button type="button" onClick={toggleModal}>Create Blog</button>

			<div className="table">
				{dataLoading ? <p>Loading...</p> : blogs.map(blog => <BlogItem key={blog._id} blog={blog} />)}
			</div>

			{showModal && <BlogModal isOpen={showModal} onClose={toggleModal} />}
		</Fragment>
	);
};
