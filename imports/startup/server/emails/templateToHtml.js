import handlebars from "handlebars";

export default (layoutHtml, context) => {
	if (layoutHtml && context) {
		const template = handlebars.compile(layoutHtml);
		const content = template(context);

		return content;
	}

	throw new Error(
		"[templateToHtml] Please pass Handlebars markup to compile and a context object with data mapping to the Handlebars expressions used in your template (e.g., {{expressionToReplace}}).",
	);
};
