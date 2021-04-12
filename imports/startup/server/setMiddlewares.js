import { WebApp } from "meteor/webapp";

WebApp.connectHandlers.use((req, res, next) => {
	res.setHeader("X-Frame-Options", "DENY");
	res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
	res.setHeader("X-Content-Type-Options", "nosniff");
	res.setHeader("X-XSS-Protection", "1; mode=block");
	return next();
});

WebApp.connectHandlers.use((req, res, next) => {
	if (process.env.NODE_ENV != "development" && !req.headers.host.includes("www")) {
		res.writeHead(301, { "Location": `https://www.tfcertification.com${req.originalUrl}` } );
		return res.end();
	}

	return next();
});
