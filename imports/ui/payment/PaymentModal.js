import React from "react";
import { Meteor } from "meteor/meteor";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Modal } from "/imports/ui/components/Modal";
import PaymentForm from "/imports/ui/payment/PaymentForm";
import "/imports/ui/payment/styles.css";

// Called outside function to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(Meteor.settings.public.stripe.public_key, { locale: "en" });

export default PaymentModal = ({ isOpen, onClose, data }) => {
	return (
		<Modal classes="payment-modal" isOpen={isOpen} onClose={onClose}>
			<Elements stripe={stripePromise}>
				<PaymentForm onClose={onClose} data={data} />
			</Elements>
		</Modal>
	);
};
