import React, { useState, Fragment } from "react";
import { Accounts } from "meteor/accounts-base";
import { isEmail } from "/imports/ui/components/Functions";
import { IconWarning } from "/imports/ui/components/Icons";
import { authHasError, authErrorMessage } from "/imports/ui/components/Validations";

export default ResetPassword = ({ actionModal }) => {
	const [values, setValues] = useState({ email: "", submitted: false, errorState: "", loading: false });

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (!values.email) return setValues({ ...values, errorState: "missing-email" });
		if (!isEmail(values.email)) return setValues({ ...values, errorState: "invalid-email" });

		setValues({ ...values, loading: true });

		Accounts.forgotPassword({
			email: values.email
		}, (error) => {
			setValues({ ...values, loading: false });

			if (error) {
				if (error.reason === "User not found") return setValues({ ...values, errorState: "notfound-user" });
			} else {
				setValues({ ...values, submitted: true });
			}
		});
	};

	return (
		<Fragment>
			{values.submitted ? (
				<div>
					<h4>Password Resetted!</h4>
					<p>Please check your email. We have sent you the instructions to complete your password reset.</p>
					<p>Go back to <a onClick={(event) => actionModal(event, true, "Login")} href="">Log in</a></p>
				</div>
			) : (
				<form onSubmit={handleSubmit} className="form-container">
					<h4>Reset Password</h4>

					<label className={`${authHasError("email", values.errorState) ? "error" : ""}`}>
						Email Address
						<input type="text" name="email" value={values.email} onChange={handleChange} placeholder="e.g. john.doe@example.com" />
					</label>

					{values.errorState && <p><IconWarning/>{authErrorMessage(values.errorState)}</p>}

					<button type="submit" className="button primary-dark primary-dark-hover" disabled={values.loading}>
						{values.loading ? "Resetting Password" : "Reset Password"}
					</button>

					<p>Remember your password? <a onClick={(event) => actionModal(event, true, "Login")} href="">Sign in!</a></p>
				</form>
			)}
		</Fragment>
	);
};
