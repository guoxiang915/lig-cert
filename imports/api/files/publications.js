import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { check } from "meteor/check";
import { FilesCollection } from "/imports/api/files/files";

Meteor.publish("files/list", function (filter) {
	check(filter, {
		amount_page: Number,
		query: String
	});

	if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { return this.ready(); }

	const searchRegex = new RegExp(filter.query, "i");
	const search = filter.query ? { name: searchRegex } : {};

	return FilesCollection.find({}, {
		limit: filter.amount_page + 1,
		fields: { name: 1, url: 1, createdAt: 1 },
		sort: { createdAt: -1 }
	});
});
