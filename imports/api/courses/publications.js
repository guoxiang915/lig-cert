import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { publishComposite } from "meteor/reywood:publish-composite";
import { CoursesCollection } from "/imports/api/courses/courses";
import { UnitsCollection } from "/imports/api/courses/units";
import { MemberlistsCollection } from "/imports/api/courses/memberlists";

Meteor.publish("courses/list", function () {
	if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { return this.ready(); }
	return CoursesCollection.find({}, { sort: { createdAt: -1 } });
});

publishComposite("course/view", function (permalink) {
	return {
		find: function () {
			check(permalink, String);
			if (!permalink) { return this.ready(); }
			return CoursesCollection.find({ permalink: permalink });
		},
		children: [
			{
				find: function (course) {
					return UnitsCollection.find({ courseId: course._id });
				}
			},
			{
				find: function (course) {
					return MemberlistsCollection.find({ courseId: course._id, userId: Meteor.userId() });
				}
			}
		]
	};
});

Meteor.publish("unit/view", function (coursePermalink) {
	if (!coursePermalink || !this.userId) { return this.ready(); }
	check(coursePermalink, String);

	const course = CoursesCollection.findOne({ permalink: coursePermalink });

	return [
		UnitsCollection.find({ courseId: course._id }),
		CoursesCollection.find({ permalink: coursePermalink }, { fields: { title: 1, permalink: 1, "modules._id": 1, "modules.title": 1, unitCount: 1, accessRoles: 1, communityLink: 1 } }),
		MemberlistsCollection.find({ courseId: course._id, userId: this.userId })
	];
});
