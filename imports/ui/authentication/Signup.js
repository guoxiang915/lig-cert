import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
import { useTagManager } from "/imports/ui/components/hooks/useTagManager";
import { IconProfile, IconWarning } from "/imports/ui/components/Icons";
import { isEmail, isValidPassword } from "/imports/ui/components/Functions";
import { authHasError, authErrorMessage } from "/imports/ui/components/Validations";

export default Signup = ({ actionModal }) => {
	const [values, setValues] = useState({
		first_name: "",
		last_name: "",
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
				useTagManager({ "event" : "signup" });
				actionModal(event, false);
			}
		});
	};

	return (
		<form onSubmit={handleSubmit} className="form-container">
			<div className="header">
				<IconProfile />
				<p>Create Your Account</p>
			</div>

			<div className="two-col">
				<label className={`${authHasError("first_name", values.errorState) ? "error" : ""}`}>
					<span>First Name</span>
					<input type="text" name="first_name" value={values.first_name} onChange={handleChange} placeholder="e.g. John" />
				</label>

				<label className={`${authHasError("last_name", values.errorState) ? "error" : ""}`}>
					<span>Last Name</span>
					<input type="text" name="last_name" value={values.last_name} onChange={handleChange} placeholder="e.g. Doe" />
				</label>
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
				{values.loading ? "Creating Account" : "Create Account"}
			</button>

			<p className="action">Already have an account? <a onClick={(event) => actionModal(event, true, "Login")} href="">Log in</a></p>
		</form>
	);
};
