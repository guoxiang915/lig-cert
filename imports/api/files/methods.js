import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import AWS from "aws-sdk";
import { FilesCollection } from "/imports/api/files/files";

Meteor.methods({
	"file.insert"(fileName, url) {
		check(fileName, String);
		check(url, String);
		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }

		FilesCollection.insert({
			name: fileName,
			url: url,
			createdAt: new Date(),
			createdBy: this.userId
		});
	},
	"file.remove"(fileName, fileId) {
		check(fileName, String);
		check(fileId, Match.OneOf( String, false ));
		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }

		const filePath = fileName.replace(/https:\/\/(.*)amazonaws\.com\//g, "");

		AWS.config.update({
			accessKeyId: Meteor.settings.private.storage.access_key,
			secretAccessKey: Meteor.settings.private.storage.secret_key
		});

		const s3 = new AWS.S3;
		params = {
			Bucket: Meteor.settings.private.storage.bucket,
			Key: filePath
		};

		if (fileId) { FilesCollection.remove({ _id: fileId }); }

		return Meteor.wrapAsync(s3.deleteObject(params, function(error) {
			if (error) { console.warn(error); }
		}));
	}
});
