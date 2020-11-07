import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { check } from "meteor/check";
import { publishComposite } from "meteor/reywood:publish-composite";
import { BlogsCollection } from "/imports/api/blogs/blogs";

Meteor.publish("blogs/list", function (administrator=false) {
	check(administrator, Boolean);
	if (administrator && !this.userId || administrator && !Roles.userIsInRole(this.userId, "admin")) { return this.ready(); }

	const options = administrator ? { sort: { createdAt: 1 } } : { fields: { title: 1, permalink: 1, image: 1, createdAt: 1, seo: 1 } };
	return BlogsCollection.find({}, options);
});

publishComposite("blog/view", function (permalink) {
	return {
		find: function () {
			check(permalink, String);
			if (!permalink) { return this.ready(); }

			return BlogsCollection.find({ permalink: permalink });
		},
		children: [
			{
				find: function (blog) {
					return BlogsCollection.find({ _id: { $ne: blog._id } }, { limit: 3, sort: { createdAt : -1 }, fields: { title: 1, permalink: 1, image: 1, createdAt: 1, "seo.description": 1 } });
				}
			}
		]
	};
});
