import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Roles } from "meteor/alanning:roles";
import { Random } from "meteor/random";
import { Accounts } from "meteor/accounts-base";
import { Promise } from "meteor/promise";
import { fetch } from "meteor/fetch";
import md5 from "md5";
import { sendEmail } from "/imports/startup/server/functions";
import { templateToHtml } from "/imports/startup/server/emails/templateToHtml";

const stripe = require("stripe")(Meteor.settings.private.stripe.secret_key);

Meteor.methods({
	"user.update"(userId, userData) {
		check(userId, String);
		check(userData, {
			email: String,
			first_name: String,
			last_name: String,
			roles: Array
		});

		if (!this.userId) { throw new Meteor.Error(401, "not-authorized"); }

		const userExists = Meteor.users.findOne({ "emails.0.address": userData.email, _id: { $ne: userId } });
		if (userExists) throw new Meteor.Error(403, "Email already exists.");

		Meteor.users.update(userId, { $set: {
			"emails.0.address": userData.email,
			"profile.name.first": userData.first_name,
			"profile.name.last": userData.last_name,
			roles: userData.roles
		} });
	},
	"password.update"(userId) {
		check(userId, String);
		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }

		const newPassword = Random.id();
		Accounts.setPassword(userId, newPassword);
		return newPassword;
	},
	"payment.intent" (price, description) {
		check(price, Number);
		check(description, String);
		if (!price) { throw new Meteor.Error(404, "undefined-price"); }

		// Create Stripe PaymentIntent
		const paymentIntent = Promise.await(stripe.paymentIntents.create({
			amount: price,
			currency: "usd",
			description: description
		}));

		return paymentIntent.client_secret;
	},
	"payment.complete" (userId, completionData) {
		check(userId, String);
		check(completionData, {
			roles: Array,
			userEmail: String,
			userName: String,
			productName: String,
			productPrice: Number
		});

		// Update user roles (include purchased course/bundle access)
		Meteor.users.update(userId, { $set: { roles: completionData.roles } });

		// Segment user in Mailchimp by purchase role
		const mailchimp = Meteor.settings.private.mailchimp;
		const subscriberHash = md5(completionData.userEmail.toLowerCase());
		const tags = [];

		completionData.roles.forEach(role => tags.push({ name: role, status: "active" }));

		fetch(`https://${mailchimp.server}.api.mailchimp.com/3.0/lists/${mailchimp.audienceId}/members/${subscriberHash}/tags`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Basic ${Buffer.from(`apikey:${mailchimp.apiKey}-${mailchimp.server}`).toString("base64")}`,
			},
			body: JSON.stringify({ tags })
		}).catch((error) => console.warn(error));

		// Send payment confirmation email
		const platformName = Meteor.settings.public.productName;

		sendEmail({
			email: completionData.userEmail,
			subject: `[${platformName}] Purchase Order Confirmed`,
			html: templateToHtml(Assets.getText("email-templates/payment-confirmation.html"), {
				platformName: platformName,
				userName: completionData.userName,
				productName: completionData.productName,
				productPrice: completionData.productPrice
			})
		});
	}
});
