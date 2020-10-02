import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const MemberlistsCollection = new Mongo.Collection("memberlists");

const MemberlistSchema = new SimpleSchema({
	userId: { type: String },
	courseId: { type: String },
	startedAt: { type: Date },
	completedAt: { type: Date, optional: true },
	unitsCompleted: { type: Array },
	"unitsCompleted.$": { type: String }
});

MemberlistsCollection.attachSchema(MemberlistSchema);
