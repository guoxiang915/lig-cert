import { Meteor } from "meteor/meteor";

// Set mail url provider
if (Meteor.settings.private && Meteor.settings.private.MAIL_URL) {
	process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
} else {
	console.warn("Email settings are not configured. Emails will not be sent.");
}
