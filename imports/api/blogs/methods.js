import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Roles } from "meteor/alanning:roles";
import { BlogsCollection } from "/imports/api/blogs/blogs";

Meteor.methods({
	"blog.upsert"(blogId, blogData) {
		check(blogId, Match.OneOf(String, null));
		check(blogData, Object);
		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }

		// Verify permalink availability when there is a permalink to update
		if (blogData.permalink) {
			const blogExists = BlogsCollection.findOne({ permalink: blogData.permalink, _id: { $ne: blogId } });
			if (blogExists) throw new Meteor.Error(409, "Permalink already exists");
		}

		if (blogId) {
			BlogsCollection.update(blogId, { $set: blogData });
		} else {
			BlogsCollection.insert({ ...blogData, createdAt: new Date() });
		}
	},
	"blog.remove"(blogId) {
		check(blogId, String);
		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }

		BlogsCollection.remove({ _id: blogId });
	}
});
