import { Email } from "meteor/email";
import { check } from "meteor/check";

export const sendEmail = (emailData) => {
	check(emailData, Object);
	try {
		Meteor.defer(function () {
			Email.send({
				to: emailData.email,
				from: Meteor.settings.private.contactEmail,
				subject: emailData.subject,
				html: emailData.html
			});
		});
	} catch (exception) {
		throw new Error(`[func.sendEmail] ${exception.message}`);
	}
};
