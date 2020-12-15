import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { check } from "meteor/check";
import { MemberlistsCollection } from "/imports/api/courses/memberlists";
import { CoursesCollection } from "/imports/api/courses/courses";

Meteor.publish("users/list", function (filter) {
	check(filter, {
		amount_page: Number,
		query: String,
		roles: String
	});

	if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { return this.ready(); }

	const searchRegex = new RegExp(filter.query, "i");
	const search = {};

	if (filter.query) search["emails.address"] = searchRegex;
	if (filter.roles) search["roles"] = { $in: filter.roles.split(",") };

	return Meteor.users.find(search, { limit: filter.amount_page, sort: { createdAt: -1 } });
});

publishComposite("user/progression", function (userId) {
	if (!userId || !this.userId || !Roles.userIsInRole(this.userId, "admin")) { return this.ready(); }
	return {
		find: function () {
			check(userId, String);
			return MemberlistsCollection.find({ userId: userId });
		},
		children: [
			{
				find: function (memberlist) {
					return CoursesCollection.find({ _id: memberlist.courseId }, { fields: { title: 1, unitCount: 1 } });
				}
			}
		]
	};
});
