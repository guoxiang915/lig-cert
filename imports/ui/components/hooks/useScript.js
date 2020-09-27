export const useScript = (scriptId, url, callback, embed, type="text/javascript") => {
	const existingScript = document.getElementById(scriptId);

	if (!existingScript) {
		const script = document.createElement("script");

		script.id = scriptId;
		script.async = true;

		if (url) {
			script.src = url;
		} else {
			script.type = type;
			script.innerHTML = embed;
		}

		document.body.appendChild(script);

		script.onload = () => {
			if (callback) callback();
		};
	}

	if (existingScript && callback) callback();
};
