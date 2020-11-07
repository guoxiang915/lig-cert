import React from "react";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
const AdminLayout = loadable(() => import("/imports/ui/layouts/AdminLayout"));
const Homepage = loadable(() => import("/imports/ui/homepage"));
const ResetPassword = loadable(() => import("/imports/ui/authentication/ResetPassword"));
const CompleteInvitation = loadable(() => import("/imports/ui/authentication/CompleteInvitation"));
const CourseView = loadable(() => import("/imports/ui/courses/CourseView"));
const UnitView = loadable(() => import("/imports/ui/courses/UnitView"));
const UsersList = loadable(() => import("/imports/ui/admin/users/UsersList"));
const FilesList = loadable(() => import("/imports/ui/admin/files/FilesList"));
const InvitationsList = loadable(() => import("/imports/ui/admin/invitations/InvitationsList"));
const CoursesList = loadable(() => import("/imports/ui/admin/courses/CoursesList"));
const AdminBlogsList = loadable(() => import("/imports/ui/admin/blogs/BlogsList"));
const BlogsList = loadable(() => import("/imports/ui/blogs/BlogsList"));
const BlogView = loadable(() => import("/imports/ui/blogs/BlogView"));
const TermsConditions = loadable(() => import("/imports/ui/legal/TermsConditions"));
const PrivacyPolicy = loadable(() => import("/imports/ui/legal/PrivacyPolicy"));

export const App = () => (
	<Router>
		<Switch>
			<Route path='/' exact component={Homepage} />
			<Route path="/reset-password/:token" component={ResetPassword} />
			<Route path="/invite/:token" component={CompleteInvitation} />
			<Route path="/courses/:coursePermalink" exact component={CourseView} />
			<LoggedRoute path="/courses/:coursePermalink/:unitPermalink" component={UnitView} />
			<LoggedRoute path="/admin/users" layout={AdminLayout} component={UsersList} />
			<LoggedRoute path="/admin/files" layout={AdminLayout} component={FilesList} />
			<LoggedRoute path="/admin/invitations" layout={AdminLayout} component={InvitationsList} />
			<LoggedRoute path="/admin/courses" layout={AdminLayout} component={CoursesList} />
			<LoggedRoute path="/admin/blogs" layout={AdminLayout} component={AdminBlogsList} />
			<Route path="/blog" exact component={BlogsList} />
			<Route path="/blog/:permalink" exact component={BlogView} />
			<Route path="/terms-conditions" component={TermsConditions} />
			<Route path="/privacy-policy" component={PrivacyPolicy} />
		</Switch>
	</Router>
);

const LoggedRoute = ({ layout: LayoutName, path, exact, component }) => {
	const { userId } = useAccount();
	const renderElement = LayoutName ? <LayoutName>{React.createElement(component)}</LayoutName> : React.createElement(component);

	return <Route path={path} exact={exact} render={() => userId ? renderElement : <Redirect to="/"/>} />;
};
