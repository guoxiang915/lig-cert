import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const BlogsCollection = new Mongo.Collection("blogs");

const BlogSchema = new SimpleSchema({
	title: { type: String },
	permalink: { type: String },
	image: { type: String },
	createdAt: { type: Date },
	content: { type: String },
	seo: { type: Object },
	"seo.title": { type: String },
	"seo.description": { type: String }
});

BlogsCollection.attachSchema(BlogSchema);
