import React from "react";
import ReactModal from "react-modal";
import { IconClose } from "/imports/ui/components/Icons";
import "/imports/ui/components/Modal/styles.css";

export const Modal = ({ children, classes, isOpen, onClose }) => {
	const modalStyles = { overlay: { backgroundColor: "rgba(0,0,0,.5)", overflow: "auto", zIndex: "10" } };

	return (
		<ReactModal className={`modal-card ${classes ? classes : ""}`} isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false} style={modalStyles}>
			<span className="modal-close" onClick={onClose}><IconClose /></span>
			{children}
		</ReactModal>
	);
};
