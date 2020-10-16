import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Modal } from "/imports/ui/components/Modal";
import { isEmail, isValidPassword } from "/imports/ui/components/Functions";
import { IconWarning } from "/imports/ui/components/Icons";
import { authErrorMessage, authHasError } from "/imports/ui/components/Validations";
import "/imports/ui/stylesheets/form.css";

export default ProfileModal = ({ isOpen, closeModal }) => {
	const user = Meteor.user();

	const [values, setValues] = useState({
		email: user.emails[0].address,
		first_name: user.profile.name.first,
		last_name: user.profile.name.last,
		current_password: "",
		new_password: "",
		confirm_password: "",
		errorState: ""
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

		const userData = {
			email: values.email.toLowerCase(),
			first_name: values.first_name,
			last_name: values.last_name,
			roles: user.roles
		};

		Meteor.call("user.update", user._id, userData, (error) => {
			if (error) {
				if (error.reason === "Email already exists.") return setValues({ ...values, errorState: "already-used-email" });
				console.warn(error);
			} else {
				closeModal();
			}
		});
	};

	const handlePasswordReset = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (!values.current_password) return setValues({ ...values, errorState: "missing-current-pwd" });
		if (!values.new_password) return setValues({ ...values, errorState: "missing-new-pwd" });
		if (!values.confirm_password) return setValues({ ...values, errorState: "missing-confirmation-pwd" });
		if (values.new_password !== values.confirm_password) return setValues({ ...values, errorState: "not-matching-pwd" });
		if (!isValidPassword(values.new_password)) return setValues({ ...values, errorState: "invalid-pwd" });

		Accounts.changePassword(values.current_password, values.new_password, (error) => {
			if (error) {
				if (error.reason === "Incorrect password") return setValues({ ...values, errorState: "incorrect-pwd" });
			} else {
				closeModal();
			}
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={closeModal}>
			<form className="form-container">
				<h4>Edit Profile</h4>

				<div className="input-two-columns">
					<label className={`${authHasError("first_name", values.errorState) ? "error" : ""}`}>
						First Name
						<input type="text" name="first_name" value={values.first_name} onChange={handleChange} placeholder="e.g. John" />
					</label>

					<label className={`${authHasError("last_name", values.errorState) ? "error" : ""}`}>
						Last Name
						<input type="text" name="last_name" value={values.last_name} onChange={handleChange} placeholder="e.g. Doe" />
					</label>
				</div>

				<label className={`${authHasError("email", values.errorState) ? "error" : ""}`}>
					Email Address
					<input type="text" name="email" value={values.email} onChange={handleChange} placeholder="e.g. john@doe.com" />
				</label>

				<button type="button" className="button primary-dark" onClick={handleSubmit}>Update Profile</button>
			</form>
			<hr/>

			<form className="form-container">
				<h4>Update Password</h4>

				<label className={`${authHasError("password", values.errorState) ? "error" : ""}`}>
					Current Password
					<input type="password" name="current_password" value={values.current_password} onChange={handleChange} placeholder="e.g. oldpassword123" />
				</label>

				<label className={`${authHasError("new_password", values.errorState) ? "error" : ""}`}>
					New Password
					<input type="password" name="new_password" value={values.new_password} onChange={handleChange} placeholder="e.g. newpassword123" />
				</label>

				<label className={`${authHasError("confirm_password", values.errorState) ? "error" : ""}`}>
					Confirm New Password
					<input type="password" name="confirm_password" value={values.confirm_password} onChange={handleChange} placeholder="e.g. newpassword123" />
				</label>

				<button type="button" className="button primary-dark" onClick={handlePasswordReset}>Reset Password</button>
			</form>

			{values.errorState && <p className="error-message"><IconWarning/>{authErrorMessage(values.errorState)}</p>}
		</Modal>
	);
};
