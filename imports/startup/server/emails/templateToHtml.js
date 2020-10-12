import handlebars from "handlebars";

export const templateToHtml = (layoutHtml, context) => {
	if (layoutHtml && context) {
		const template = handlebars.compile(layoutHtml);
		return template(context);
	}

	throw new Error(
		"[templateToHtml] Please pass Handlebars markup to compile and a context object with data mapping to the Handlebars expressions used in your template (e.g., {{expressionToReplace}}).",
	);
};
