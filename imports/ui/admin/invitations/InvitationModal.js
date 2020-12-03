import React, { useState } from "react";
import { Random } from "meteor/random";
import { Modal } from "/imports/ui/components/Modal";
import { isEmail } from "/imports/ui/components/Functions";
import { IconWarning } from "/imports/ui/components/Icons";
import { invitationErrorMessage, invitationHasError } from "/imports/ui/components/Validations";
import { Checkbox } from "/imports/ui/components/Checkbox";
import { ListSelector } from "/imports/ui/components/ListSelector";

export default InvitationModal = ({ isOpen, onClose }) => {
	const [values, setValues] = useState({ email: "", roles: [], sendEmail: false, errorState: false, loading: false });

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (!values.email) return setValues({ ...values, errorState: "missing-email" });
		if (!isEmail(values.email)) return setValues({ ...values, errorState: "invalid-email" });

		const invitationData = {
			email: values.email,
			token: Random.id(),
			roles: values.roles
		};

		setValues({ ...values, loading: true });

		Meteor.call("invitation.create", invitationData, values.sendEmail, (error) => {
			setValues({ ...values, loading: false });

			if (error) {
				if (error.reason === "User already exists") return setValues({ ...values, errorState: "already-used-email" });
				if (error.reason === "Invitation already exists") return setValues({ ...values, errorState: "already-exist-invitation" });
			} else {
				onClose();
			}
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<h4>Invite New Member</h4>

				<label className={`${invitationHasError("email", values.errorState) ? "error" : ""}`}>
					Email Address:
					<input type="text" name="email" value={values.email} onChange={handleChange} placeholder="Email address" />
				</label>

				<label>
					Send invitation to users email?
					<Checkbox field="sendEmail" currentValue={values.sendEmail} saveCallback={handleChange} />
				</label>

				<label>
					User Rights:
					<ListSelector field="roles" options={["admin","course-tcp"]} currentValues={values.roles} saveCallback={handleChange} />
				</label>

				{values.errorState && <p><IconWarning />{invitationErrorMessage(values.errorState)}</p>}

				<button type="submit" disabled={values.loading}>
					{values.loading ? "Creating Invitation" : "Create Invitation"}
				</button>
			</form>
		</Modal>
	);
};
