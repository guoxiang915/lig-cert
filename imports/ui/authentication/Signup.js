import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
import { IconWarning } from "/imports/ui/components/Icons";
import { isEmail, isValidPassword } from "/imports/ui/components/Functions";
import { authHasError, authErrorMessage } from "/imports/ui/components/Validations";

export default Signup = ({ actionModal }) => {
	const [values, setValues] = useState({ first_name: "", last_name: "", email: "", password: "", errorState: "", loading: false });

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (!values.first_name) return setValues({ ...values, errorState: "missing-fname" });
		if (!values.last_name) return setValues({ ...values, errorState: "missing-lname" });
		if (!values.email) return setValues({ ...values, errorState: "missing-email" });
		if (!isEmail(values.email)) return setValues({ ...values, errorState: "invalid-email" });
		if (!values.password) return setValues({ ...values, errorState: "missing-pwd" });
		if (!isValidPassword(values.password)) return setValues({ ...values, errorState: "invalid-pwd" });

		setValues({ ...values, loading: true });
		event.persist(); // Used to maintain the event for the asynchronous call of actionModal

		Accounts.createUser({
			email: values.email.toLowerCase(),
			password: values.password,
			profile: {
				name: { first: values.first_name, last: values.last_name }
			}
		}, (error) => {
			setValues({ ...values, loading: false });

			if (error) {
				if (error.reason === "Email already exists.") return setValues({ ...values, errorState: "already-used-email" });
			} else {
				actionModal(event, false);
			}
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<h4>Create Your Account</h4>

			<label className={`${authHasError("first_name", values.errorState) ? "error" : ""}`}>
				First Name
				<input type="text" name="first_name" value={values.first_name} onChange={handleChange} placeholder="First name" />
			</label>

			<label className={`${authHasError("last_name", values.errorState) ? "error" : ""}`}>
				Last Name
				<input type="text" name="last_name" value={values.last_name} onChange={handleChange} placeholder="Last name" />
			</label>

			<label className={`${authHasError("email", values.errorState) ? "error" : ""}`}>
				Email Address
				<input type="text" name="email" value={values.email} onChange={handleChange} placeholder="Email Address" />
			</label>

			<label className={`${authHasError("password", values.errorState) ? "error" : ""}`}>
				Password
				<input name="password" type="password" value={values.password} onChange={handleChange} placeholder="Password" />
			</label>

			{values.errorState && <p><IconWarning/>{authErrorMessage(values.errorState)}</p>}

			<button type="submit" disabled={values.loading}>
				{values.loading ? "Creating Account" : "Create Account"}
			</button>

			<p>Already have an account? <a onClick={(event) => actionModal(event, true, "Login")} href="">Sign in</a></p>
		</form>
	);
};
