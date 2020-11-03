import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useAccount } from "/imports/ui/components/hooks/useAccount";

export const UnitPopup = ({ nextUnit, isLastUnit, coursePermalink, setShowPopup }) => {
	const history = useHistory();
	const { user } = useAccount();

	const handleStay = () => setShowPopup(false);

	const handleReturn = (event) => {
		event.stopPropagation();
		setShowPopup(false);
		history.push(`/courses/${coursePermalink}`);
	};

	const handleNext = (event) => {
		event.stopPropagation();
		setShowPopup(false);
		history.push(`/courses/${coursePermalink}/${nextUnit.permalink}`);
	};

	return (
		<div className="unit-popup">
			<div className="main-wrapper">
				{isLastUnit ? (
					<Fragment>
						<h5>Congratulations {`${user.profile.name.first} ${user.profile.name.last}`}</h5>
						<h5>You've finished the last lesson of this course!</h5>

						<div className="actions">
							<button type="button" className="button primary" onClick={handleReturn}>Back to Course Page</button>
							<button type="button" className="button white-border" onClick={handleStay}>Stay Here</button>
						</div>
					</Fragment>
				) : (
					<Fragment>
						<span>Up Next</span>
						<h5>{nextUnit.title}</h5>

						<div className="actions">
							<button type="button" className="button primary-dark" onClick={handleNext}>Continue</button>
							<button type="button" className="button white-border" onClick={handleStay}>Stay Here</button>
						</div>
					</Fragment>
				)}
			</div>
		</div>
	);
};
