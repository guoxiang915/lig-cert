import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { templateToHtml } from "/imports/startup/server/emails/templateToHtml";

const { emailTemplates } = Accounts;
const { productName } = Meteor.settings.public;

emailTemplates.siteName = productName;
emailTemplates.from = Meteor.settings.private.contactEmail;

emailTemplates.resetPassword = {
	subject() {
		return `[${productName}] Reset Your Password`;
	},
	html(user, url) {
		return templateToHtml(Assets.getText("email-templates/reset-password.html"), {
			firstName: user.profile.name.first,
			productName,
			emailAddress: user.emails[0].address,
			buttonUrl: url.replace("#/", ""),
		});
	}
};
