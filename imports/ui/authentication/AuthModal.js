import React from "react";
import { Modal } from "/imports/ui/components/Modal";
import loadable from "@loadable/component";
// import "/imports/ui/stylesheets/form.css";

const Login = loadable(() => import("/imports/ui/authentication/Login"));
const Signup = loadable(() => import("/imports/ui/authentication/Signup"));
const RecoverPassword = loadable(() => import("/imports/ui/authentication/RecoverPassword"));

export default AuthModal = ({ isOpen, component, actionModal }) => {
	const components = { Login, Signup, RecoverPassword };
	const RenderComponent = components[component];

	return (
		<Modal classes="auth-modal" isOpen={isOpen} onClose={(event) => actionModal(event, !isOpen)}>
			<RenderComponent actionModal={actionModal} />
		</Modal>
	);
};
