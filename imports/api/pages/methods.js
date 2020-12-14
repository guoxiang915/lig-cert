import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Roles } from "meteor/alanning:roles";
import { PagesCollection } from "/imports/api/pages/pages";

Meteor.methods({
	"page.upsert"(pageId, pageData) {
		check(pageId, Match.OneOf(String, null));
		check(pageData, Object);

		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }

		const pageExists = PagesCollection.findOne({ permalink: pageData.permalink, _id: { $ne: pageId } });
		if (pageExists) throw new Meteor.Error(403, "Permalink already exists");

		if (pageId) {
			PagesCollection.update({ _id: pageId }, { $set: pageData });
		} else {
			PagesCollection.insert({ ...pageData, createdAt: new Date() });
		}
	},
	"page.remove"(pageId) {
		check(pageId, String);
		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }
		PagesCollection.remove({ _id: pageId });
	},
});
