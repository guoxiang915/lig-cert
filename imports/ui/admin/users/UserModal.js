import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import copy from "copy-text-to-clipboard";
import { Modal } from "/imports/ui/components/Modal";
import { MemberlistsCollection } from "/imports/api/courses/memberlists";
import { CoursesCollection } from "/imports/api/courses/courses";
import { IconEdit, IconCopy, IconSync, IconWarning } from "/imports/ui/components/Icons";
import { authHasError, authErrorMessage } from "/imports/ui/components/Validations";
import { isEmail, dateFormat } from "/imports/ui/components/Functions";
import { ListSelector } from "/imports/ui/components/ListSelector";
import "/imports/ui/stylesheets/form.css";

export default UserModal = ({ isOpen, onClose, user }) => {
	const [values, setValues] = useState({
		email: user.emails[0].address,
		first_name: user.profile.name.first,
		last_name: user.profile.name.last,
		roles: user.roles.slice(),
		new_password: "",
		errorState: "",
		loading: false
	});

	const { dataLoading, memberlists } = useTracker(() => {
		const subs = Meteor.subscribe("user/progression", user._id);

		return {
			dataLoading: !subs.ready(),
			memberlists: MemberlistsCollection.find({ userId: user._id }).fetch()
		};
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handlePasswordChange = () => {
		Meteor.call("password.update", user._id, (error, result) => {
			if (error) {
				console.warn(error);
			} else {
				setValues({ ...values, new_password: result });
			}
		});
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
		<Modal isOpen={isOpen} onClose={onClose} classes="user-modal">
			<form onSubmit={handleSubmit} className="form-container">
				<div className="header">
					<IconEdit />
					<p>Edit Member</p>
				</div>

				<div className="two-col">
					<label className={`${authHasError("first_name", values.errorState) ? "error" : ""}`}>
						<span>First Name</span>
						<input type="text" name="first_name" value={values.first_name} onChange={handleChange} placeholder="First name" />
					</label>

					<label className={`${authHasError("last_name", values.errorState) ? "error" : ""}`}>
						<span>Last Name</span>
						<input type="text" name="last_name" value={values.last_name} onChange={handleChange} placeholder="Last name" />
					</label>
				</div>

				<label className={`${authHasError("email", values.errorState) ? "error" : ""}`}>
					<span>Email Address</span>
					<input type="text" name="email" value={values.email} onChange={handleChange} placeholder="Email address" />
				</label>

				<label>
					<span>Generate Password</span>
					<input type="text" value={values.new_password} placeholder="New password displayed here" disabled={true} />

					<div className="actions">
						{values.new_password && <span onClick={() => copy(values.new_password)}><IconCopy /></span>}
						<span onClick={handlePasswordChange}><IconSync /></span>
					</div>
				</label>

				<label>
					<span>User Roles</span>
					<ListSelector field="roles" options={["admin","course-tcp"]} currentValues={values.roles} saveCallback={handleChange} />
				</label>

				{dataLoading ? <p>Loading...</p> : memberlists.map(memberlist => <UserProgressItem key={memberlist._id} memberlist={memberlist} />)}

				{values.errorState && <p className="error-message"><IconWarning />{authErrorMessage(values.errorState)}</p>}

				<div className="actions">
					<button type="submit" className="button primary" disabled={values.loading}>
						{values.loading ? "Loading..." : "Save Changes"}
					</button>
				</div>
			</form>
		</Modal>
	);
};

const UserProgressItem = ({ memberlist }) => {
	const course = CoursesCollection.findOne({ _id: memberlist.courseId });

	return (
		<div className="user-progression-item">
			<p>{course.title} (Completed {Math.floor((memberlist.unitsCompleted.length / course.unitCount) * 100)}%)</p>
			<p><strong>Start Date:</strong> {dateFormat(memberlist.startedAt, "MMM DD, YYYY - hh:mm A")}</p>
			{memberlist.completedAt && <p><strong>Completion Date:</strong> {dateFormat(memberlist.completedAt, "MMM DD, YYYY - hh:mm A")}</p>}
		</div>
	);
};
