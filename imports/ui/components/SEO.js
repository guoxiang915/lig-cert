import React from "react";
import { Helmet } from "react-helmet";
import { Meteor } from "meteor/meteor";

export const SEO = ({ title, description, contentType, path, image, scripts, facebookAppId }) => (
	<Helmet>
		<title>{title} | TF Certification</title>
		<link rel="canonical" href={Meteor.absoluteUrl(path)} />

		<meta name="description" content={description} />
		<meta name="twitter:title" content={`${title} | TF Certification`} />
		<meta name="twitter:description" content={description} />
		{image && <meta name="twitter:image:src" content={image} />}

		{scripts && scripts.map((script, index) => <script key={index} src={script} async />)}

		<meta property="og:title" content={`${title} | TF Certification`} />
		<meta property="og:type" content={contentType} />
		<meta property="og:url" content={Meteor.absoluteUrl(path)} />
		<meta property="og:description" content={description} />
		<meta property="og:site_name" content="TF Certification" />
		{image && <meta property="og:image" content={image} />}

		{facebookAppId && <meta name="fb:app_id" content={facebookAppId} />}
	</Helmet>
);
