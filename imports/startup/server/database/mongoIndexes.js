import createIndex from "/imports/startup/server/database/createIndex";
// import Invitations from "/imports/api/invitations/invitations";

// createIndex(Invitations, { email: 1 });
createIndex(Meteor.users, { createdAt: 1 });
// createIndex(Meteor.users, { roles: 1 });
