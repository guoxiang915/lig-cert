import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const UnitsCollection = new Mongo.Collection("units");

const UnitSchema = new SimpleSchema({
	title: { type: String },
	permalink: { type: String },
	type: { type: String, allowedValues: ["video","text","quiz"] },
	courseId: { type: String },
	moduleId: { type: String },
	order: { type: Number },
	content: { type: Object, blackbox: true }
});

UnitsCollection.attachSchema(UnitSchema);
