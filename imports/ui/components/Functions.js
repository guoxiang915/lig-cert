import { Roles } from "meteor/alanning:roles";
import dayjs from "dayjs";

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

export const cleanPermalink = (input) => {
	try {
		return input.replace(/ /g, "-").toLowerCase();
	} catch (exception) {
		throw new Error(`[func.cleanPermalink] ${exception.message}`);
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

export const capitalizeText = (input) => {
	try {
		return input.charAt(0).toUpperCase() + input.slice(1);
	} catch (exception) {
		throw new Error(`[func.capitalizeText] ${exception.message}`);
	}
};

export const dateFormat = (date, format) => {
	const finalFormat = format ? format : "MMM DD, YYYY";
	try {
		return dayjs(date).format(finalFormat);
	} catch (exception) {
		throw new Error(`[func.dateFormat] ${exception.message}`);
	}
};

// Underscore Functions
export const _difference = (first_array, second_array) => {
	try {
		return [first_array, second_array].reduce((a, b) => a.filter(c => !b.includes(c)));
	} catch (exception) {
		throw new Error(`[func._difference] ${exception.message}`);
	}
};

export const _pluck = (array, field) => {
	try {
		return array.map((option) => option[field]);
	} catch (exception) {
		throw new Error(`[func._pluck] ${exception.message}`);
	}
};

export const _union = (first_array, second_array) => {
	try {
		return [...new Set([...first_array, ...second_array])];
	} catch (exception) {
		throw new Error(`[func._union] ${exception.message}`);
	}
};

export const _findWhere = (array, identifier, field) => {
	try {
		return array.find(item => item[field] == identifier);
	} catch (exception) {
		throw new Error(`[func._findWhere] ${exception.message}`);
	}
};
