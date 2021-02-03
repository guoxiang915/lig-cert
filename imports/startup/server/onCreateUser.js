import { Accounts } from "meteor/accounts-base";
import { fetch } from "meteor/fetch";

Accounts.onCreateUser((options, user) => {
	const userToCreate = user;

	if (options.profile) userToCreate.profile = options.profile;
	userToCreate.roles = options.roles ? options.roles : [];

	// Add user to Mailchimp email list
	const mailchimp = Meteor.settings.private.mailchimp;

	const body = {
		email_address: user.emails[0].address,
		status: "subscribed",
		merge_fields: {
			FNAME: user.profile.name.first,
			LNAME: user.profile.name.last
		}
	};

	fetch(`https://${mailchimp.server}.api.mailchimp.com/3.0/lists/${mailchimp.audienceId}/members/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Basic ${Buffer.from(`apikey:${mailchimp.apiKey}-${mailchimp.server}`).toString("base64")}`,
		},
		body: JSON.stringify(body)
	}).catch((error) => console.warn(error));

	return userToCreate;
});
