import React, { useState, useEffect, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import { isValidPassword } from "/imports/ui/components/Functions";
import { IconWarning } from "/imports/ui/components/Icons";
import { authHasError, authErrorMessage } from "/imports/ui/components/Validations";

export default ResetPassword = () => {
	const [values, setValues] = useState({ password: "", confirm_password: "", submitted: false, errorState: "", loading: false });
	const history = useHistory();
	const { token } = useParams();

	useEffect(() => { window.prerenderReady = true; }, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (!values.password) return setValues({ ...values, errorState: "missing-pwd" });
		if (!values.confirm_password) return setValues({ ...values, errorState: "missing-confirmation-pwd" });
		if (values.password !== values.confirm_password) return setValues({ ...values, errorState: "not-matching-pwd" });
		if (!isValidPassword(values.password)) return setValues({ ...values, errorState: "invalid-pwd" });

		setValues({ ...values, loading: true });

		Accounts.resetPassword(token, values.password, (error) => {
			setValues({ ...values, loading: false });

			if (error) {
				if (error.reason === "Token expired") return setValues({ ...values, errorState: "token-expired" });
			} else {
				setValues({ ...values, submitted: true });
			}
		});
	};

	return (
		<Fragment>
			{values.submitted ? (
				<div>
					<h4>Password Reseted!</h4>
					<p>Your password was succesfully reseted. You can access the platform by <a onClick={() => history.push("/")} href="">Clicking Here</a></p>
				</div>
			) : (
				<form onSubmit={handleSubmit}>
					<h4>Reset Password</h4>

					<div className={`${authHasError("password", values.errorState) ? "error" : ""}`}>
						New Password
						<input type="password" name="password" value={values.password} onChange={handleChange} placeholder='e.g. password123' />
					</div>

					<div className={`${authHasError("confirm_password", values.errorState) ? "error" : ""}`}>
						Confirm New Password
						<input type="password" name="confirm_password" value={values.confirm_password} onChange={handleChange} placeholder='e.g. password123' />
					</div>

					{values.errorState && <p className="error-message"><IconWarning/>{authErrorMessage(values.errorState)}</p>}

					<button type="submit" disabled={values.loading}>
						{values.loading ? "Resetting Password" : "Complete Reset Password"}
					</button>

					<p>Remember your password? <a onClick={() => history.push("/")} href="">Sign in!</a></p>
				</form>
			)}
		</Fragment>
	);
};
