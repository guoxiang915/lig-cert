import { Mongo } from "meteor/mongo";

export default (Collection, index, options) => {
	if (Collection && Collection instanceof Mongo.Collection) {
		Collection.rawCollection().createIndex(index, options);
	} else {
		console.warn("[/imports/server/database/createIndex.js] Must pass a MongoDB collection instance to define index on.",);
	}
};
