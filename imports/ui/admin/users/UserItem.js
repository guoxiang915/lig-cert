import React, { useState } from "react";
import loadable from "@loadable/component";
import { hasRights, dateFormat } from "/imports/ui/components/Functions";
import { IconOptions } from "/imports/ui/components/Icons";
const UserModal = loadable(() => import("/imports/ui/admin/users/UserModal"));

export default UserItem = ({ user }) => {
	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => setShowModal(!showModal);

	return (
		<div className="table-item">
			<div className="user-col">
				<p><strong>{user.emails[0].address}</strong></p>
				<p>{user.profile.name.first} {user.profile.name.last}</p>
			</div>

			<div className="user-access-col">
				<p>{hasRights(["admin"], user._id) ? "Administrator" : "Free Member"}</p>
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
