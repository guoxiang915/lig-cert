import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Roles } from "meteor/alanning:roles";
import { Random } from "meteor/random";
import { Accounts } from "meteor/accounts-base";

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
	}
});
