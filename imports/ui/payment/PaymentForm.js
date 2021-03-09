import React, { useState, Fragment } from "react";
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import { useTagManager } from "/imports/ui/components/hooks/useTagManager";
import { _union } from "/imports/ui/components/Functions";
import { IconPayment, IconCheck, IconWarning } from "/imports/ui/components/Icons";
import "/imports/ui/stylesheets/form.css";

export default PaymentForm = ({ onClose, data }) => {
	const [status, setStatus] = useState ({ discount: 0, transactionId: "", coupon: "", submitted: false, errorMessage: "", loading: false });

	const { user } = useAccount();
	const elements = useElements();
	const stripe = useStripe();

	const userEmail = user && user.emails[0].address;
	const userName = user && user.profile && `${user.profile.name.first} ${user.profile.name.last}`;

	const elementOptions = {
		style: {
			base: { fontSize: "14px", lineHeight: "37px", fontWeight: "400" },
			invalid: { color: "#ea5770" }
		}
	};

	const handleKeyChange = () => setStatus({ ...status, errorMessage: "" });

	const handlePayment = async(clientSecret) => {
		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardNumberElement),
				billing_details: { name: userName, email: userEmail }
			}
		});

		if (payload.error) {
			console.warn(payload.error);
			setStatus({ ...status, loading: false, errorMessage: payload.error.message });
		} else {
			const productPrice = data.price - status.discount;

			const completionData = {
				roles: _union(user.roles, data.roles),
				userEmail: userEmail,
				userName: userName,
				productName: data.title,
				productPrice: productPrice
			};

			Meteor.call("payment.complete", user._id, completionData, (error) => {
				setStatus({ ...status, loading: false });

				if (error) {
					console.warn(error);
					setStatus({ ...status, errorMessage: "There was an error on our servers, contact support" });
				} else {
					useTagManager({
						"event" : "purchase",
						"ecommerce": {
							"purchase": {
								"actionField": { "id": payload.paymentIntent.id, "affiliation": "", "revenue": productPrice, "tax":"0", "shipping": "0", "coupon": status.coupon },
								"products": [{ "name": data.title, "id": data.productId, "price": data.price, "brand": "TFC", "category": "Courses", "quantity": 1 }]
							}
						}
					});

					setStatus({ ...status, transactionId: payload.paymentIntent.id, submitted: true });
				}
			});
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const price = (data.price - status.discount) * 100; // 100 = 1 USD
		let description = `Course: ${data.title}`;
		if (status.discount > 0) description = `${description} (Coupon Applied)`;

		const card = elements.getElement(CardNumberElement);
		const card_cvc = elements.getElement(CardCvcElement);
		const card_expiration = elements.getElement(CardExpiryElement);

		if (card._empty) return setStatus({ ...status, errorMessage: "Your card number is incomplete." });
		if (card._invalid) return setStatus({ ...status, errorMessage: "Your card number is invalid." });
		if (card_cvc._empty || card_cvc._invalid) return setStatus({ ...status, errorMessage: "Your card's security code is incomplete." });
		if (card_expiration._empty || card_cvc._invalid) return setStatus({ ...status, errorMessage: "Your card's expiration date is incomplete." });
		if (card_expiration._invalid) return setStatus({ ...status, errorMessage: "Your card's expiration year is invalid." });

		setStatus({ ...status, loading: true });

		Meteor.call("payment.intent", price, description, (error, response) => {
			if(error) {
				console.warn(error);
			} else {
				handlePayment(response);
			}
		});
	};

	const toggleSuccessAction = () => {
		onClose();
		data.successAction();
	};

	return (
		<Fragment>
			{status.submitted ? (
				<div className="form-submitted">
					<div className="icon-box">
						<IconCheck />
					</div>
					<h2>Course Purchased!</h2>
					<p>You have successfully bought {data.title}.</p>
					<a onClick={toggleSuccessAction}>{data.successActionText}</a>
				</div>
			) : (
				<form onSubmit={handleSubmit} className="form-container">
					<div className="header">
						<IconPayment />
						<p>Checkout</p>
					</div>

					<div className="summary">
						<p>Course: <span>{data.title}</span></p>
						<p>Price: <span>${data.price}</span></p>
						{(status.discount > 0) && <p>Discount: <span>-${status.discount}</span></p>}
						<hr/>
						<p>Total: <span>${data.price - status.discount}</span></p>
					</div>

					<p>If you want to update your personal information, please do so in your profile settings.</p>

					<label>
						<span>Name</span>
						<input type="text" value={userName} disabled />
					</label>

					<label>
						<span>Email Address</span>
						<input type="email" value={userEmail} disabled />
					</label>

					<label>
						<span>Card Number</span>
						<CardNumberElement options={elementOptions} onChange={handleKeyChange} />
					</label>

					<div className="two-col">
						<label>
							<span>CVC</span>
							<CardCvcElement options={elementOptions} onChange={handleKeyChange} />
						</label>

						<label>
							<span>Expiration Date</span>
							<CardExpiryElement options={elementOptions} onChange={handleKeyChange} />
						</label>
					</div>

					<Coupon data={data} status={status} setStatus={setStatus} />

					<p className="agreement">By clicking 'Submit Payment' you agree that TFC provides you immediate access to digital content as soon as you complete your purchase, without waiting the 14-day withdrawal period, and with the ability for a refund based on the Pass or We Pay Guarantee. Therefore, you expressly waive your rights to withdraw from this purchase.</p>

					{status.errorMessage && <p className="error-message"><IconWarning /> {status.errorMessage}</p>}

					<div className="actions">
						<button type="submit" className="button primary primary-dark primary-dark-hover" disabled={status.loading}>
							{status.loading ? "Processing Payment..." : "Submit Payment"}
						</button>
					</div>
				</form>
			)}
		</Fragment>
	);
};

const Coupon = ({ data, status, setStatus }) => {
	const [coupon, setCoupon] = useState ({ display: false, code: "", validated: false });

	const handleChange = (event) => {
		const { name, value } = event.target;
		setStatus({ ...status, errorMessage: "" });
		setCoupon({ ...coupon, [name]: value });
	};

	const toggleDisplay = () => {
		if (coupon.validated) return;
		setCoupon({ ...coupon, code: "", display: !coupon.display });
		setStatus({ ...status, errorMessage: "" });
	};

	const handleCoupon = () => {
		if (!coupon.code) return setStatus({ ...status, errorMessage: "Coupon code is required" });

		const coupons = [
			{ code: "WEBINAR_2021", discount: 40, productId: "course-tcp" },
			{ code: "TFC_2021", discount: 40, productId: "course-tcp" },
			{ code: "TFC_WEB_2021", discount: 40, productId: "course-tcp" }
		];

		// const inputCoupon = _findWhere(coupons, coupon.code, "code");
		const inputCoupon = coupons.find(item => (item.code == coupon.code && item.productId == data.productId));

		// Coupon doesnt exist
		if (!inputCoupon) return setStatus({ ...status, errorMessage: "Coupon code is invalid" });

		// Invalid coupon. Used a coupon not available for the selected purchase
		if (data.productId !== inputCoupon.productId) return setStatus({ ...status, errorMessage: "Coupon invalid for this purchase." });

		// Coupon valid. Activate in final price
		setCoupon({ ...coupon, code: "", display: false, validated: true });
		setStatus({ ...status, discount: inputCoupon.discount, coupon: inputCoupon.code, errorMessage: "" });
	};

	return (
		<div className="coupon-block">
			<div className="actions">
				<p className={`${coupon.validated ? "disabled" : ""}`} onClick={toggleDisplay}>Have a coupon code?</p>
				{coupon.validated && <span>Discount code successfully applied.</span>}
			</div>

			{coupon.display && (
				<label>
					<span>Coupon Code</span>
					<div>
						<input type="text" name="code" value={coupon.code} onChange={handleChange} placeholder="e.g. Coupon123" />
						<a onClick={handleCoupon}>Apply Coupon</a>
					</div>
				</label>
			)}
		</div>
	);
};
