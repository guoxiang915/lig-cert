import { Accounts } from "meteor/accounts-base";
import { HTTP } from "meteor/http";

Accounts.onCreateUser((options, user) => {
	const userToCreate = user;

	if (options.profile) userToCreate.profile = options.profile;
	userToCreate.roles = options.roles ? options.roles : [];

	// Add user to Mailchimp email list
	const mailchimp = Meteor.settings.private.mailchimp;

	const headerData = {
		data: {
			email_address: user.emails[0].address,
			status: "subscribed",
			merge_fields: {
				FNAME: user.profile.name.first,
				LNAME: user.profile.name.last
			}
		},
		auth: `apikey:${mailchimp.apiKey}-${mailchimp.server}`,
		headers: { "content-type": "application/json" }
	};

	HTTP.call("POST", `https://${mailchimp.server}.api.mailchimp.com/3.0/lists/${mailchimp.audienceId}/members/`, headerData, function(error) {
		if (error) console.warn(error);
	});

	return userToCreate;
});
