import React from "react";
import { useHistory } from "react-router-dom";
import { LazyImage } from "/imports/ui/components/LazyImage";
import { dateFormat } from "/imports/ui/components/Functions";

export default BlogItem = ({ blog, classes }) => {
	const history = useHistory();

	return (
		<div className={`blog-item ${classes ? classes : ""}`} onClick={() => { history.push(`/blog/${blog.permalink}`); }}>
			<div className="image">
				<LazyImage src={blog.image} alt={`${blog.title} Blog Image`} />
			</div>

			<div className="information">
				<h4>{blog.title}</h4>
				<p>{blog.seo.description}</p>
				<span>Published on {dateFormat(blog.createdAt)}</span>
			</div>
		</div>
	);
};
