import React from "react";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
const AdminLayout = loadable(() => import("/imports/ui/layouts/AdminLayout"));
const Homepage = loadable(() => import("/imports/ui/homepage"));
const ResetPassword = loadable(() => import("/imports/ui/authentication/ResetPassword"));
const UsersList = loadable(() => import("/imports/ui/admin/users/UsersList"));

export const App = () => (
	<Router>
		<Switch>
			<Route path='/' exact component={Homepage} />
			<Route path="/reset-password/:token" component={ResetPassword} />
			<LoggedRoute path="/admin/users" layout={AdminLayout} component={UsersList} />
		</Switch>
	</Router>
);

const LoggedRoute = ({ layout: LayoutName, path, exact, component }) => {
	const { userId } = useAccount();
	const renderElement = LayoutName ? <LayoutName>{React.createElement(component)}</LayoutName> : React.createElement(component);

	return <Route path={path} exact={exact} render={() => userId ? renderElement : <Redirect to="/"/>} />;
};
