import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const InvitationsCollection = new Mongo.Collection("invitations");

InvitationSchema = new SimpleSchema({
	email: { type: String },
	token: { type: String },
	roles: { type : Array },
	"roles.$" : { type: String },
	createdAt: { type: Date },
	completedAt: { type: Date, optional: true }
});

InvitationsCollection.attachSchema(InvitationSchema);
