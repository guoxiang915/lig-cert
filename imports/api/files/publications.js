import { Meteor } from "meteor/meteor";
import { FilesCollection } from "/imports/api/files/files";

Meteor.publish("files/list", function () {
	return FilesCollection.find({}, {
		fields: { name: 1, url: 1, createdAt: 1 },
		sort: { createdAt: -1 }
	});
});
