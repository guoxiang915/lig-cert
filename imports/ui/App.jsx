import React from "react";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Homepage = loadable(() => import("/imports/ui/homepage"));
const ResetPassword = loadable(() => import("/imports/ui/authentication/ResetPassword"));

export const App = () => (
	<Router>
		<Switch>
			<Route path='/' exact component={Homepage} />
			<Route path="/reset-password/:token" component={ResetPassword} />
		</Switch>
	</Router>
);
