import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Roles } from "meteor/alanning:roles";
import { PagesCollection } from "/imports/api/pages/pages";

Meteor.publish("pages/list", function() {
	if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { return this.ready(); }
	return PagesCollection.find({}, { sort: { createdAt: -1 } });
});

Meteor.publish("page/view", function(permalink) {
	if (!permalink) { return this.ready(); }
	check(permalink, String);
	return PagesCollection.find({ permalink: permalink });
});
