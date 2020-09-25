import createIndex from "/imports/startup/server/database/createIndex";
// import Invitations from "/imports/api/invitations/invitations";
import { FilesCollection } from "/imports/api/files/files";

// createIndex(Invitations, { email: 1 });
createIndex(Meteor.users, { createdAt: 1 });
// createIndex(Meteor.users, { roles: 1 });
createIndex(FilesCollection, { createdAt: 1 });
