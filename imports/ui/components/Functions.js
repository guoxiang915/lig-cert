import { Roles } from "meteor/alanning:roles";

export const isEmail = (email) => {
	try {
		const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return filter.test(email);
	} catch (exception) {
		throw new Error(`[func.isEmail] ${exception.message}`);
	}
};

export const isValidPassword = (password) => {
	try {
		return password.length > 6;
	} catch (exception) {
		throw new Error(`[func.isValidPassword] ${exception.message}`);
	}
};

export const hasRights = (roles, userId) => {
	const uniqueId = userId ? userId : Meteor.userId();
	try {
		return Roles.userIsInRole(uniqueId, roles);
	} catch (exception) {
		throw new Error(`[func.hasRights] ${exception.message}`);
	}
};
