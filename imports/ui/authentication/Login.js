import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { isEmail } from "/imports/ui/components/Functions";
import { IconProfile, IconWarning } from "/imports/ui/components/Icons";
import { authHasError, authErrorMessage } from "/imports/ui/components/Validations";

export default Login = ({ actionModal }) => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		errorState: "",
		loading: false
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (!values.email) return setValues({ ...values, errorState: "missing-email" });
		if (!isEmail(values.email)) return setValues({ ...values, errorState: "invalid-email" });
		if (!values.password) return setValues({ ...values, errorState: "missing-pwd" });

		setValues({ ...values, loading: true });
		event.persist(); // Used to maintain the event for the asynchronous call of actionModal

		Meteor.loginWithPassword(values.email, values.password, (error) => {
			setValues({ ...values, loading: false });

			if (error) {
				if (error.reason === "User not found") return setValues({ ...values, errorState: "notfound-user" });
				if (error.reason === "Incorrect password") return setValues({ ...values, errorState: "incorrect-pwd" });
			} else {
				actionModal(event, false);
			}
		});
	};

	return (
		<form onSubmit={handleSubmit} className="form-container login">
			<div className="header">
				<IconProfile />
				<p>Log in</p>
			</div>

			<label className={`${authHasError("email", values.errorState) ? "error" : ""}`}>
				<span>Email Address</span>
				<input type="text" name="email" value={values.email} onChange={handleChange} placeholder="e.g. john.doe@example.com" />
			</label>

			<label className={`${authHasError("password", values.errorState) ? "error" : ""}`}>
				<span>Password</span>
				<input name="password" type="password" value={values.password} onChange={handleChange} placeholder="e.g. password123" />
			</label>

			{values.errorState && <p className="error-message"><IconWarning/>{authErrorMessage(values.errorState)}</p>}

			<button type="submit" className="button primary" disabled={values.loading}>
				{values.loading ? "Logging in" : "Log in"}
			</button>

			<p className="forgot-action">or <a onClick={(event) => actionModal(event, true, "RecoverPassword")} href="">Forgot password?</a></p>

			<p className="action">Don't have an account? <a onClick={(event) => actionModal(event, true, "Signup")} href="">Sign up</a></p>
		</form>
	);
};
