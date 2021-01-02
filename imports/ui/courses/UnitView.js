import React, { useState, useEffect, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { CoursesCollection } from "/imports/api/courses/courses";
import { UnitsCollection } from "/imports/api/courses/units";
import { MemberlistsCollection } from "/imports/api/courses/memberlists";
import { SEO } from "/imports/ui/components/SEO";
import { hasRights, _union, capitalizeText } from "/imports/ui/components/Functions";
import { IconLock } from "/imports/ui/components/Icons";
import { UnitSidebar } from "/imports/ui/courses/UnitSidebar";
import { UnitVideo } from "/imports/ui/courses/UnitVideo";
import { UnitText } from "/imports/ui/courses/UnitText";
import { UnitQuiz } from "/imports/ui/courses/UnitQuiz";
import { UnitPopup } from "/imports/ui/courses/UnitPopup";
import "/imports/ui/courses/styles.css";

export default UnitView = () => {
	const [showSidebar, setShowSidebar] = useState(true);
	const toggleSidebar = () => setShowSidebar(!showSidebar);

	const { coursePermalink, unitPermalink } = useParams();
	const history = useHistory();

	const { dataLoading, course, memberlist } = useTracker(() => {
		const subs = Meteor.subscribe("unit/view", coursePermalink);
		const course = CoursesCollection.findOne({ permalink: coursePermalink });

		return {
			dataLoading: !subs.ready(),
			course,
			memberlist: MemberlistsCollection.findOne({ userId: Meteor.userId(), courseId: course && course._id })
		};
	}, [coursePermalink, unitPermalink]);

	if (dataLoading) return <p>Loading...</p>;

	const hasCourseAccess = hasRights(_union(["admin"], course.accessRoles)); // Verify user has access to the course content

	return (
		<div className="unit-container">
			<UnitSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} course={course} memberlist={memberlist} />

			{hasCourseAccess ? (
				<UnitContent showSidebar={showSidebar} toggleSidebar={toggleSidebar} course={course} />
			) : (
				<div className="unit-content blocked">
					<IconLock/>
					<h2>Ups, you dont have access to this lecture</h2>
					<p>If you want to get full access to this course, please <a onClick={() => history.push(`/courses/${coursePermalink}`) }>click here</a> and purchase the course.</p>
				</div>
			)}
		</div>
	);
};

const UnitContent = ({ showSidebar, toggleSidebar, course }) => {
	const [showPopup, setShowPopup] = useState(false);

	const { coursePermalink, unitPermalink } = useParams();
	const unit = UnitsCollection.findOne({ permalink: unitPermalink });

	// Generate unit component
	const components = { UnitVideo, UnitText, UnitQuiz };
	const RenderComponent = components[`Unit${capitalizeText(unit.type)}`];

	// Generation Next Step Functionality
	const nextUnit = UnitsCollection.findOne({ order: unit.order + 1 });
	const isLastUnit = course.unitCount === unit.order + 1;

	const nextState = {
		title: isLastUnit ? "Finish Course" : "Next Unit",
		action: () => {
			const memberlist = MemberlistsCollection.findOne({ userId: Meteor.userId(), courseId: course?._id });
			// Store users progress in memberlist
			const memberlistData = memberlist ? memberlist : {
				userId: Meteor.userId(),
				courseId: course._id,
				unitsCompleted: [unit._id]
			};

			if (!memberlistData.unitsCompleted.includes(unit._id)) memberlistData.unitsCompleted.push(unit._id);
			if (!memberlistData.completedAt && course.unitCount == memberlistData.unitsCompleted.length) memberlistData.completedAt = new Date(); // Add completedAt if field doesnt exist and user completed all the course units

			Meteor.call("memberlist.upsert", memberlistData._id, memberlistData, (error) => {
				if (error) {
					console.warn(error);
				} else {
					setShowPopup(true);
				}
			});
		}
	};

	useEffect(() => { setShowPopup(false); }, [unit._id]); // CLose UnitPopup if unit is changed (e.g. through UnitSidebar)

	return (
		<Fragment>
			<SEO
				title={`${unit.title} | ${course.title}`}
				description={`Continue learning with the ${unit.title} unit.`}
				path={`courses/${coursePermalink}/${unit.permalink}`}
				contentType="website"
			/>

			<div className={`unit-content ${showSidebar ? "visible-sidebar" : ""}`}>
				<RenderComponent course={course} unit={unit} nextState={nextState} toggleSidebar={toggleSidebar} />
				{showPopup && <UnitPopup nextUnit={nextUnit} isLastUnit={isLastUnit} coursePermalink={coursePermalink} setShowPopup={setShowPopup} />}
			</div>
		</Fragment>
	);
};
