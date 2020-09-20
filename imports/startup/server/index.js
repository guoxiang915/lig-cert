import { WebApp } from "meteor/webapp";
import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import "/imports/startup/server/setHeader";
// import "/imports/startup/server/emails/email";
// import "/imports/startup/server/emails/emailTemplates";
import "/imports/startup/server/database/mongoIndexes";
import "/imports/startup/server/onCreateUser";
import "/imports/startup/server/registerApis";
import "/imports/startup/server/allowDeny";
// import "/imports/startup/server/slingshot";

WebApp.addHtmlAttributeHook(() => ({ lang: "en" })); // Adds language attribute to the <html> tag

Meteor.startup(function () {
	const userRoles = ["admin"];

	if (Roles.getAllRoles().count() === 0) {
		userRoles.forEach((role) => { Roles.createRole(role); });
	}
});
