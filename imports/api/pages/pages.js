import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const PagesCollection = new Mongo.Collection("pages");

PageSchema = new SimpleSchema({
	title: { type: String },
	permalink: { type: String },
	content: { type: String },
	createdAt: { type: Date },
	scripts: { type: Array },
	"scripts.$": { type: String },
	seo: { type: Object, blackbox: true }
});

PagesCollection.attachSchema(PageSchema);
