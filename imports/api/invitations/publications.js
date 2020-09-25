import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { check, Match } from "meteor/check";
import { InvitationsCollection } from "/imports/api/invitations/invitations";

Meteor.publish("invitations/list", function () {
	if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { return this.ready(); }
	return InvitationsCollection.find({}, { sort: { createdAt: -1 } });
});

Meteor.publish("invitation/completion", function (tokenId) {
	check(tokenId, Match.OneOf( String, null ));
	return InvitationsCollection.find({ token: tokenId });
});
