import React, { useState, useEffect, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useParams, useHistory, Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { InvitationsCollection } from "/imports/api/invitations/invitations";
import { isValidPassword } from "/imports/ui/components/Functions";
import { SEO } from "/imports/ui/components/SEO";
import { IconProfile, IconWarning } from "/imports/ui/components/Icons";
import { authHasError, authErrorMessage } from "/imports/ui/components/Validations";
import "/imports/ui/authentication/styles.css";
import "/imports/ui/stylesheets/form.css";

export default CompleteInvitation = () => {
	const [values, setValues] = useState({
		first_name: "",
		last_name: "",
		password: "",
		errorState: "",
		loading: false
	});

	const { token } = useParams();
	const history = useHistory();

	useEffect(() => { window.prerenderReady = true; }, []);

	const { dataLoading, invitation } = useTracker(() => {
		const subs = Meteor.subscribe("invitation/completion", token);

		return {
			dataLoading: !subs.ready(),
			invitation: InvitationsCollection.findOne({ token })
		};
	}, [token]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (!values.first_name) return setValues({ ...values, errorState: "missing-fname" });
		if (!values.last_name) return setValues({ ...values, errorState: "missing-lname" });
		if (!values.password) return setValues({ ...values, errorState: "missing-pwd" });
		if (!isValidPassword(values.password)) return setValues({ ...values, errorState: "invalid-pwd" });

		setValues({ ...values, loading: true });

		Accounts.createUser({
			email: invitation.email,
			password: values.password,
			profile: {
				name: { first: values.first_name, last: values.last_name }
			},
			roles: invitation.roles
		}, (error) => {
			if (error) {
				console.warn(error);
			} else {
				Meteor.call("invitation.update", invitation._id, { completedAt: new Date() }, (error) => {
					setValues({ ...values, loading: false });

					if (error) {
						console.warn(error);
					} else {
						history.push("/");
					}
				});
			}
		});
	};

	if (dataLoading) return <div>Loading...</div>;
	if (!invitation || invitation.completedAt) return <div><h4>Ups, Something Ocurred!</h4><p>The invitation url that you entered may have already been used or doesn't exist.</p></div>;

	return (
		<Fragment>
			<SEO
				title="Complete Invitation"
				description="Welcome to the TF Certification complete invitation page."
				contentType="website"
				path={`invite/${token}`}
			/>

			<div className="authentication-view-wrapper">
				<Link to="/"><img src="/logo.svg" alt="TF Certification Logo" /></Link>

				<form onSubmit={handleSubmit} className="form-container">
					<div className="header">
						<IconProfile />
						<p>Complete Invitation Signup</p>
					</div>

					<p>Hello {invitation.email}, complete your invitation here:</p>

					<label className={`${authHasError("first_name", values.errorState) ? "error" : ""}`}>
						<span>First Name</span>
						<input type="text" name="first_name" value={values.first_name} onChange={handleChange} placeholder="e.g. John" />
					</label>

					<label className={`${authHasError("last_name", values.errorState) ? "error" : ""}`}>
						<span>Last Name</span>
						<input type="text" name="last_name" value={values.last_name} onChange={handleChange} placeholder="e.g. Doe" />
					</label>

					<label className={`${authHasError("password", values.errorState) ? "error" : ""}`}>
						<span>Password</span>
						<input type="password" name="password" value={values.password} onChange={handleChange} placeholder="e.g. password123" />
					</label>

					{values.errorState && <p className="error-message"><IconWarning/>{authErrorMessage(values.errorState)}</p>}

					<button type="submit" className="button primary" disabled={values.loading}>
						{values.loading ? "Signing Up" : "Complete Invitation Signup"}
					</button>

					<p className="action">Already have an account? <a onClick={() => history.push("/")} href="">Log in</a></p>
				</form>
			</div>
		</Fragment>
	);
};
