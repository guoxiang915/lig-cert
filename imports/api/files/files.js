import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const FilesCollection = new Mongo.Collection("files");

FileSchema = new SimpleSchema({
	name: { type: String },
	url: { type: String },
	createdAt: { type: Date },
	createdBy: { type: String }
});

FilesCollection.attachSchema(FileSchema);
