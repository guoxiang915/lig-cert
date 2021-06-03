import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Roles } from "meteor/alanning:roles";
import { CoursesCollection } from "/imports/api/courses/courses";
import { UnitsCollection } from "/imports/api/courses/units";
import { MemberlistsCollection } from "/imports/api/courses/memberlists";
import { _pluck } from "/imports/ui/components/Functions";

Meteor.methods({
	"course.upsert"(courseId, courseData) {
		check(courseId, Match.OneOf(String, null));
		check(courseData, Object);
		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }

		// Verify permalink availability when there is a permalink to update
		if (courseData.permalink) {
			const courseExists = CoursesCollection.findOne({ permalink: courseData.permalink, _id: { $ne: courseId } });
			if (courseExists) throw new Meteor.Error(409, "Permalink already exists");
		}

		if (courseId) {
			CoursesCollection.update(courseId, { $set: courseData });
		} else {
			CoursesCollection.insert({ ...courseData, createdAt: new Date(), unitCount: 0 });
		}
	},
	"course.remove"(courseId) {
		check(courseId, String);
		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }

		UnitsCollection.remove({ courseId: courseId });
		MemberlistsCollection.remove({ courseId: courseId });
		CoursesCollection.remove({ _id: courseId });
	},
	"module.remove"(courseId, modules, moduleIds, moduleId) {
		check(courseId, String);
		check(modules, Array);
		check(moduleIds, Array);
		check(moduleId, String);
		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }

		const units = UnitsCollection.find({ courseId: courseId, moduleId: moduleId }).fetch();

		CoursesCollection.update({ _id: courseId }, { $set: { "modules": modules }, $inc: { unitCount: -units.length } }); // Update unitCount field from courses
		UnitsCollection.remove({ courseId: courseId, moduleId: moduleId }); // Delete all the units inside of the deleted module
		UnitsCollection.update({ courseId: courseId, moduleId: { $in: moduleIds } }, { $inc : { order: -units.length } }, { multi: true }); // Update all units order field after removed module
		MemberlistsCollection.update({}, { $pull: { unitsCompleted: { $in: _pluck(units, "_id") } } }, { multi: true });  // Remove all units from all memberlists so there is no track of non-existent units
	},
	"unit.upsert"(unitId, unitData) {
		check(unitId, Match.OneOf(String, null));
		check(unitData, Object);
		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }

		if (unitData.permalink) {
			const unitExists = UnitsCollection.findOne({ courseId: unitData.courseId, permalink: unitData.permalink, _id: { $ne: unitId } });
			if (unitExists) throw new Meteor.Error(409, "Permalink already exists");
		}

		if (unitId) {
			const unit = UnitsCollection.findOne({ _id: unitId });

			// If unit order changed, update all units order field
			if (unit.order !== unitData.order) {
				const newOrderUnit = UnitsCollection.findOne({ courseId: unitData.courseId, order: unitData.order, _id: { $ne: unitId } });

				if (unitData.moduleId !== newOrderUnit.moduleId) unitData.moduleId = newOrderUnit.moduleId;
				if (unitData.order < unit.order) UnitsCollection.update({ courseId: unitData.courseId, order: { $gte: unitData.order, $lt: unit.order } }, { $inc: { order: 1 } }, { multi: true });
				if (unitData.order > unit.order) UnitsCollection.update({ courseId: unitData.courseId, order: { $gt: unit.order, $lte: unitData.order } }, { $inc: { order: -1 } }, { multi: true });
			}

			UnitsCollection.update({ _id: unitId }, { $set: unitData });
		} else {
			CoursesCollection.update({ _id: unitData.courseId }, { $inc: { unitCount: 1 } });
			const newUnitId = UnitsCollection.insert(unitData);

			// Update order of all the units with order bigger that the new unit
			UnitsCollection.update({ courseId: unitData.courseId, _id: { $ne: newUnitId }, order: { $gte: unitData.order } }, { $inc: { order: 1 } }, { multi: true });
		}
	},
	"unit.remove"(unitId) {
		check(unitId, String);
		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }

		const unit = UnitsCollection.findOne({ _id: unitId });

		UnitsCollection.remove(unitId); // Remove the unit
		UnitsCollection.update({ courseId: unit.courseId, order: { $gt: unit.order } }, { $inc: { order: -1 } }, { multi: true }); // Update order position of the other units in the same course
		CoursesCollection.update({ _id: unit.courseId }, { $inc: { unitCount: -1 } }); // Update unitCount after the unit deletion
		MemberlistsCollection.update({}, { $pull: { unitsCompleted: { $in: [unit._id] } } }, { multi: true }); // Remove unit from all memberlists so there is no track of non-existent unit
	},
	"memberlist.upsert"(memberlistId, memberlistData) {
		check(memberlistId, Match.OneOf(String, null));
		check(memberlistData, Object);
		if (!this.userId) { throw new Meteor.Error(401, "not-authorized"); }

		if (memberlistId) {
			MemberlistsCollection.update(memberlistId, { $set: memberlistData });
		} else {
			MemberlistsCollection.insert({ ...memberlistData, startedAt: new Date() });
		}
	},
	"memberlist.remove"(memberlistId) {
		check(memberlistId, String);
		if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) { throw new Meteor.Error(401, "not-authorized"); }

		MemberlistsCollection.remove(memberlistId); 
	},
});
