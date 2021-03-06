import React from "react";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
const Private = loadable(() => import("/imports/ui/layouts/Private"));
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
const PagesList = loadable(() => import("/imports/ui/admin/pages/PagesList"));
const BlogsList = loadable(() => import("/imports/ui/blogs/BlogsList"));
const BlogView = loadable(() => import("/imports/ui/blogs/BlogView"));
const PageView = loadable(() => import("/imports/ui/pages/PageView"));
const TermsConditions = loadable(() => import("/imports/ui/legal/TermsConditions"));
const PrivacyPolicy = loadable(() => import("/imports/ui/legal/PrivacyPolicy"));
const Webinar = loadable(() => import("/imports/ui/webinar"));
const NotFound = loadable(() => import("/imports/ui/not-found"));

export const App = () => (
	<Router>
		<Switch>
			<Route path='/' exact component={Homepage} />
			<Route path="/reset-password/:token" component={ResetPassword} />
			<Route path="/invite/:token" component={CompleteInvitation} />
			<Route path="/courses/:coursePermalink" exact component={CourseView} />
			<LoggedRoute path="/courses/:coursePermalink/:unitPermalink" component={UnitView} />
			<LoggedRoute path="/admin/users" layout={Private} component={UsersList} />
			<LoggedRoute path="/admin/files" layout={Private} component={FilesList} />
			<LoggedRoute path="/admin/invitations" layout={Private} component={InvitationsList} />
			<LoggedRoute path="/admin/courses" layout={Private} component={CoursesList} />
			<LoggedRoute path="/admin/blogs" layout={Private} component={AdminBlogsList} />
			<LoggedRoute path="/admin/pages" layout={Private} component={PagesList} />
			<Route path="/blog" exact component={BlogsList} />
			<Route path="/blog/:permalink" exact component={BlogView} />
			<Route path="/pages/:permalink" exact component={PageView} />
			<Route path="/terms-conditions" component={TermsConditions} />
			<Route path="/privacy-policy" component={PrivacyPolicy} />
			<Route path="/webinar" exact component={Webinar} />
			<Route component={NotFound} />
		</Switch>
	</Router>
);

const LoggedRoute = ({ layout: LayoutName, path, exact, component }) => {
	const { userId } = useAccount();
	const renderElement = LayoutName ? <LayoutName>{React.createElement(component)}</LayoutName> : React.createElement(component);

	return <Route path={path} exact={exact} render={() => userId ? renderElement : <Redirect to="/"/>} />;
};
