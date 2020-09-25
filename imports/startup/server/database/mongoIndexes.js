import createIndex from "/imports/startup/server/database/createIndex";
import { FilesCollection } from "/imports/api/files/files";
import { InvitationsCollection } from "/imports/api/invitations/invitations";

createIndex(Meteor.users, { createdAt: 1 });
// createIndex(Meteor.users, { roles: 1 });
createIndex(FilesCollection, { createdAt: 1 });
// createIndex(InvitationsCollection, { email: 1 });
createIndex(InvitationsCollection, { token: 1 });
createIndex(InvitationsCollection, { createdAt: 1 });
