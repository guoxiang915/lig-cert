export const authErrorMessage = (errorState) => {
	switch (errorState) {
	case "missing-fname":
		return "First name is required";
	case "missing-lname":
		return "Last name is required";
	case "missing-email":
		return "Email address is required";
	case "invalid-email":
		return "Enter a valid email";
	case "already-used-email":
		return "Email address has already been taken";
	case "notfound-user":
		return "Couldn't find your account";
	case "missing-pwd":
		return "Enter a password";
	case "missing-confirmation-pwd":
		return "Confirm new password";
	case "incorrect-pwd":
		return "Wrong password. Try again";
	case "invalid-pwd":
		return "Ups. Password is too short (minimum is 6 characters)";
	case "not-matching-pwd":
		return "Password's dont match. Try again";
	case "token-expired":
		return "Ups. The token already expired";
	default:
		return;
	}
};

export const authHasError = (inputField, errorState) => {
	switch (inputField) {
	case "first_name":
		return ["missing-fname"].includes(errorState);
	case "last_name":
		return ["missing-lname"].includes(errorState);
	case "email":
		return ["missing-email","invalid-email","already-used-email","notfound-user"].includes(errorState);
	case "password":
		return ["missing-pwd","invalid-pwd","incorrect-pwd","not-matching-pwd"].includes(errorState);
	case "confirm_password":
		return ["missing-confirmation-pwd"].includes(errorState);
	default:
		break;
	}
};

export const invitationErrorMessage = (errorState) => {
	switch (errorState) {
	case "missing-email":
		return "Email address is required";
	case "invalid-email":
		return "Enter a valid email";
	case "already-used-email":
		return "Email address has already been taken";
	case "already-exist-invitation":
		return "Email address has already been invited";
	default:
		return;
	}
};

export const invitationHasError = (inputField, errorState) => {
	switch (inputField) {
	case "email":
		return ["missing-email","invalid-email","already-used-email","already-exist-invitation"].includes(errorState);
	default:
		break;
	}
};
