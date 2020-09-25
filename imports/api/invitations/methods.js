import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Roles } from "meteor/alanning:roles";
import { Accounts } from "meteor/accounts-base";
import { InvitationsCollection } from "/imports/api/invitations/invitations";
import { sendEmail } from "/imports/startup/server/functions";
import { templateToHtml } from "/imports/startup/server/emails/templateToHtml";

Meteor.methods({
	"invitation.create"(invitationData, sendInvitation) {
		check(invitationData, Object);
		check(sendInvitation, Boolean);
		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }

		const usersExists = Accounts.findUserByEmail(invitationData.email);
		const invitationExists = InvitationsCollection.findOne({ email: invitationData.email });

		if (usersExists) throw new Meteor.Error(403, "User already exists");
		if (invitationExists) throw new Meteor.Error(403, "Invitation already exists");

		InvitationsCollection.insert({ ...invitationData, createdAt: new Date() });

		const productName = Meteor.settings.public.productName;

		if (sendInvitation) {
			sendEmail({
				email: invitationData.email,
				subject: `[${productName}] You have been invited`,
				html: templateToHtml(Assets.getText("email-templates/invitation.html"), {
					productName: productName,
					emailAddress: invitationData.email,
					buttonUrl: `${Meteor.absoluteUrl()}invite/${invitationData.token}`,
				})
			});
		}
	},
	"invitation.update"(invitationId, invitationData) {
		check(invitationId, String);
		check(invitationData, Object);
		if (!this.userId) { throw new Meteor.Error(401, "not-authorized"); }

		InvitationsCollection.update({ _id: invitationId }, { $set: invitationData });
	},
	"invitation.remove"(invitationId) {
		check(invitationId, String);
		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }

		InvitationsCollection.remove({ _id: invitationId });
	}
});
