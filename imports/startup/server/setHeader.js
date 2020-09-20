import { WebApp } from "meteor/webapp";

Meteor.startup(() => {
	WebApp.connectHandlers.use((req, res, next) => {
		res.setHeader("X-Frame-Options", "DENY");
		res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
		res.setHeader("X-Content-Type-Options", "nosniff");
		res.setHeader("X-XSS-Protection", "1; mode=block");
		next();
	});
});
