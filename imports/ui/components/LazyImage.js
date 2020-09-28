import React, { useEffect } from "react";
import LazyLoad from "vanilla-lazyload";

export const LazyImage = ({ src, alt, classes }) => {
	if (!document.lazyLoadInstance) document.lazyLoadInstance = new LazyLoad({ elements_selector: ".lazy" }); // Initialize one time for the entire application

	useEffect(() => document.lazyLoadInstance.update(), []); // Update lazyLoad after the rendering of each image

	return (
		<img data-src={src} alt={alt} className={`lazy ${classes ? classes : ""}`} />
	);
};
