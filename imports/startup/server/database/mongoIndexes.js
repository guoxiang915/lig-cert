import createIndex from "/imports/startup/server/database/createIndex";
import { FilesCollection } from "/imports/api/files/files";
import { InvitationsCollection } from "/imports/api/invitations/invitations";
import { CoursesCollection } from "/imports/api/courses/courses";
import { UnitsCollection } from "/imports/api/courses/units";
import { MemberlistsCollection } from "/imports/api/courses/memberlists";

createIndex(CoursesCollection, { permalink: 1 });
createIndex(UnitsCollection, { courseId: 1, moduleId: 1, permalink: 1 });
createIndex(MemberlistsCollection, { courseId: 1, userId: 1 });
createIndex(InvitationsCollection, { email: 1 });
createIndex(InvitationsCollection, { token: 1 });
createIndex(InvitationsCollection, { createdAt: 1 });
createIndex(FilesCollection, { createdAt: 1 });
createIndex(Meteor.users, { createdAt: 1 });
// createIndex(Meteor.users, { roles: 1 });
