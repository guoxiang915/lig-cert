import { Meteor } from "meteor/meteor";

let disconnectTimer = null;

Meteor.startup(() => { disconnectIfHidden(); });

document.addEventListener("visibilitychange", disconnectIfHidden);

function disconnectIfHidden() {
	removeDisconnectTimeout();

	if (document.hidden) {
		createDisconnectTimeout();
	} else {
		Meteor.reconnect();
	}
}

function createDisconnectTimeout() {
	removeDisconnectTimeout();

	disconnectTimer = setTimeout(function () {
		Meteor.disconnect();
	}, 18000); // 6000 = 1min
}

function removeDisconnectTimeout() {
	if (disconnectTimer) clearTimeout(disconnectTimer);
}
