import React, { useState, useEffect, Fragment } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import { isValidPassword } from "/imports/ui/components/Functions";
import { SEO } from "/imports/ui/components/SEO";
import { IconProfile, IconWarning } from "/imports/ui/components/Icons";
import { authHasError, authErrorMessage } from "/imports/ui/components/Validations";
import "/imports/ui/authentication/styles.css";
import "/imports/ui/stylesheets/form.css";

export default ResetPassword = () => {
	const [values, setValues] = useState({
		password: "",
		confirm_password: "",
		submitted: false,
		errorState: "",
		loading: false
	});

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
			<SEO
				title="Reset Password"
				description="Welcome to the TF Certification reset password page."
				contentType="website"
				path={`reset-password/${token}`}
			/>

			<div className="authentication-view-wrapper">
				<Link to="/"><img src="/logo.svg" alt="TF Certification Logo" /></Link>

				{values.submitted ? (
					<div>
						<h4>Password Reseted!</h4>
						<p>Your password was succesfully reseted. You can access the platform by <a onClick={() => history.push("/")} href="">Clicking Here</a></p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="form-container">
						<div className="header">
							<IconProfile />
							<p>Reset Password</p>
						</div>

						<label className={`${authHasError("password", values.errorState) ? "error" : ""}`}>
							<span>New Password</span>
							<input type="password" name="password" value={values.password} onChange={handleChange} placeholder='e.g. password123' />
						</label>

						<label className={`${authHasError("confirm_password", values.errorState) ? "error" : ""}`}>
							<span>Confirm New Password</span>
							<input type="password" name="confirm_password" value={values.confirm_password} onChange={handleChange} placeholder='e.g. password123' />
						</label>

						{values.errorState && <p className="error-message"><IconWarning/>{authErrorMessage(values.errorState)}</p>}

						<button type="submit" className="button primary" disabled={values.loading}>
							{values.loading ? "Resetting Password" : "Complete Reset Password"}
						</button>

						<p className="action">Remember your password? <a onClick={() => history.push("/")} href="">Log in</a></p>
					</form>
				)}
			</div>
		</Fragment>
	);
};
