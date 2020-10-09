import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const CoursesCollection = new Mongo.Collection("courses");

const CourseSchema = new SimpleSchema({
	title: { type: String },
	permalink: { type: String },
	createdAt: { type: Date },
	mediaId: { type: String },
	description: { type: String },
	price: { type: Number },
	modules: { type: Array },
	"modules.$": { type: Object, blackbox: true },
	accessRoles: { type: Array },
	"accessRoles.$": { type: String },
	unitCount: { type: Number }
});

CoursesCollection.attachSchema(CourseSchema);
