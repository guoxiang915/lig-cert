import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

export const useAccount = () => useTracker(() => {
	const user = Meteor.user();
	const userId = Meteor.userId();

	return { user, userId };
}, []);
