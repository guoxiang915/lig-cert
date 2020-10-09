import React, { useState } from "react";
import loadable from "@loadable/component";
import { hasRights, dateFormat } from "/imports/ui/components/Functions";
import { IconOptions } from "/imports/ui/components/Icons";
const UserModal = loadable(() => import("/imports/ui/admin/users/UserModal"));

export default UserItem = ({ user }) => {
	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => setShowModal(!showModal);

	let userState;

	if (hasRights(["admin"], user._id)) {
		userState = "Administrator";
	} else if (hasRights(["course-1"], user._id)) {
		userState = "Purchased Course 1";
	} else {
		userState = "Free Member";
	}

	return (
		<div className="table-item">
			<div className="user-col">
				<p><strong>{user.emails[0].address}</strong></p>
				<p>{user.profile.name.first} {user.profile.name.last}</p>
			</div>

			<div className="user-access-col">
				<p>{userState}</p>
			</div>

			<div className="date-col">
				<p>{dateFormat(user.createdAt, "MMM DD, YYYY - hh:mm A")}</p>
			</div>

			<div className="action-col">
				<span onClick={toggleModal}><IconOptions /></span>
			</div>

			{showModal && <UserModal user={user} isOpen={showModal} onClose={toggleModal} />}
		</div>
	);
};
