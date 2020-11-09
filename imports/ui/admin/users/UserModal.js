import React, { useState } from "react";
import { Modal } from "/imports/ui/components/Modal";
import { IconWarning } from "/imports/ui/components/Icons";
import { authHasError, authErrorMessage } from "/imports/ui/components/Validations";
import { isEmail } from "/imports/ui/components/Functions";
import { ListSelector } from "/imports/ui/components/ListSelector";

export default UserModal = ({ isOpen, onClose, user }) => {
	const [values, setValues] = useState({
		email: user.emails[0].address,
		first_name: user.profile.name.first,
		last_name: user.profile.name.last,
		roles: user.roles.slice(),
		errorState: "",
		loading: false,
		newPassword: "",
		resetLoading: false
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handlePasswordChange = (event) => {
		event.preventDefault();
		event.stopPropagation();

		setValues({ ...values, resetLoading: true });

		Meteor.call("password.update", user._id, (error, result) => {
			setValues({ ...values, resetLoading: false });

			if (error) {
				console.warn(error);
			} else {
				setValues({ ...values, newPassword: result });
			}
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();

		if (!values.email) return setValues({ ...values, errorState: "missing-email" });
		if (!isEmail(values.email)) return setValues({ ...values, errorState: "invalid-email" });
		if (!values.first_name) return setValues({ ...values, errorState: "missing-fname" });
		if (!values.last_name) return setValues({ ...values, errorState: "missing-lname" });

		const userData = {
			email: values.email.toLowerCase(),
			first_name: values.first_name,
			last_name: values.last_name,
			roles: values.roles
		};

		setValues({ ...values, loading: true });

		Meteor.call("user.update", user._id, userData, (error) => {
			setValues({ ...values, loading: false });

			if (error) {
				if (error.reason === "Email already exists.") return setValues({ ...values, errorState: "already-used-email" });
				console.warn(error);
			} else {
				onClose();
			}
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<h1>User Editing</h1>

				<label className={`${authHasError("email", values.errorState) ? "error" : ""}`}>
					Email Address:
					<input type="text" name="email" value={values.email} onChange={handleChange} placeholder="Email address" />
				</label>

				<label className={`${authHasError("first_name", values.errorState) ? "error" : ""}`}>
					First Name:
					<input type="text" name="first_name" value={values.first_name} onChange={handleChange} placeholder="First name" />
				</label>

				<label className={`${authHasError("last_name", values.errorState) ? "error" : ""}`}>
					Last Name:
					<input type="text" name="last_name" value={values.last_name} onChange={handleChange} placeholder="Last name" />
				</label>

				<label>
					User Roles:
					<ListSelector field="roles" options={["admin","course-tcp"]} currentValues={values.roles} saveCallback={handleChange} />
				</label>

				<hr/>
				<label>
					Password reset:
					<input type="text" value={values.newPassword} placeholder="Generate Password" disabled={true} />

					<button type="button" onClick={handlePasswordChange} disabled={values.resetLoading}>
						{values.resetLoading ? "Loading..." : "Generate New Password"}
					</button>
				</label>
				<hr/>

				{values.errorState && <p><IconWarning />{authErrorMessage(values.errorState)}</p>}

				<button type="submit" disabled={values.loading}>
					{values.loading ? "Loading..." : "Save Changes"}
				</button>
			</form>
		</Modal>
	);
};
