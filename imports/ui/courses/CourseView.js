import React, { useState, useEffect,Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import loadable from "@loadable/component";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import { hasRights, capitalizeText, _union } from "/imports/ui/components/Functions";
import { IconTrophy, IconEdit, IconPlus, IconVideo, IconText, IconQuiz, IconLock, IconCheck } from "/imports/ui/components/Icons";
import { CoursesCollection } from "/imports/api/courses/courses";
import { UnitsCollection } from "/imports/api/courses/units";
import { SEO } from "/imports/ui/components/SEO";
import { MemberlistsCollection } from "/imports/api/courses/memberlists";
import { VideoPlayer } from "/imports/ui/components/VideoPlayer";
// import { LazyImage } from "/imports/ui/components/LazyImage";
import AuthModal from "/imports/ui/authentication/AuthModal";
// const ProfileModal = loadable(() => import("/imports/ui/profile/ProfileModal"));
const PaymentModal = loadable(() => import("/imports/ui/payment/PaymentModal"));
const CourseModal = loadable(() => import("/imports/ui/courses/CourseModal"));
const ModuleModal = loadable(() => import("/imports/ui/courses/ModuleModal"));
const VideoModal = loadable(() => import("/imports/ui/courses/VideoModal"));
const TextModal = loadable(() => import("/imports/ui/courses/TextModal"));
const QuizModal = loadable(() => import("/imports/ui/courses/QuizModal"));
import "/imports/ui/stylesheets/navbar.css";
// import "/imports/ui/stylesheets/footer.css";
import "/imports/ui/courses/styles.css";

export default CourseView = () => {
	// const [showProfile, setShowProfile] = useState(false);
	// const toggleProfile = () => setShowProfile(!showProfile);

	const [showDescription, setShowDescription] = useState(false);
	const toggleDescription = () => setShowDescription(!showDescription);

	const [showAuthModal, setShowAuthModal] = useState(false);
	const [authComponent, setAuthComponent] = useState("");

	const toggleAuthModal = (event, activeModal, component) => {
		event.preventDefault();
		if (component) setAuthComponent(component);
		setShowAuthModal(activeModal);
	};

	const [modal, setModal] = useState({ payment: false, course: false, module: false });
	const toggleModal = (section) => {
		modal[section] = !modal[section];
		setModal({ ...modal });
	};

	const { coursePermalink } = useParams();
	const { user } = useAccount();
	const history = useHistory();

	useEffect(() => { window.prerenderReady = true; }, []);

	const { dataLoading, course, memberlist } = useTracker(() => {
		const subs = Meteor.subscribe("course/view", coursePermalink);
		const course = CoursesCollection.findOne({ permalink: coursePermalink });

		return {
			dataLoading: !subs.ready(),
			course,
			memberlist: MemberlistsCollection.findOne({ userId: Meteor.userId(), courseId: course && course._id })
		};
	}, [coursePermalink]);

	if (dataLoading) return <p>Loading...</p>;

	const hasCourseAccess = user ? hasRights(_union(["admin"], course.accessRoles)) : false; // Veiry user has access to the course content

	// Start/Continue/Purchase Course button functionality
	let buttonState;

	if (!user) {
		buttonState = { title: "Get Started", action: (event) => toggleAuthModal(event, true, "Signup") };
	} else if (memberlist && memberlist.completedAt) {
		buttonState = { title: "Course Completed" };
	} else if (memberlist) {
		const nextUnit = UnitsCollection.findOne({ _id: { $nin: memberlist.unitsCompleted } }, { sort: { order: 1 } }); // Get first non-completed unit
		buttonState = { title: "Continue Course", action: () => history.push(`/courses/${coursePermalink}/${nextUnit.permalink}`) };
	} else if (hasCourseAccess) {
		const nextUnit = UnitsCollection.findOne({ order: 0 });
		buttonState = { title: "Start Course", action: () => history.push(`/courses/${coursePermalink}/${nextUnit.permalink}`) };
	} else {
		buttonState = { title: "Purchase Course", action: () => {
			toggleModal("payment");
		} };
	}

	// Progression bar
	const amountCompleted = memberlist ? memberlist.unitsCompleted.length : 0;
	const courseCompelted = memberlist && memberlist.completedAt;

	return (
		<Fragment>
			<SEO
				title={course.title}
				description={`Welcome to the TF Certification ${course.title} course.`}
				contentType="website"
				path={`courses/${coursePermalink}`}
			/>

			<section className="section course-view-header">
				<div className="main-wrapper">
					<nav>
						<img src="/logo.svg" alt="TF Certification Logo"/>

						<ul className="actions hidden-xs">
							<li><a>Features</a></li>
							<li><a>Instructor</a></li>
							<li><a>Courses</a></li>

							<div className="buttons">
								{user ? (
									<div className="nav-dropdown">
										<button className="button">Hi {user.profile.name.first}</button>

										<div className="dropdown-content clearfix">
											{/* <a className="dropdown-item" onClick={toggleProfile}>Profile</a> */}
											{hasRights(["admin"]) && <a href="/admin/users" className="dropdown-item">Administrator</a>}
											<a className="dropdown-item" onClick={() => Meteor.logout()}>Logout</a>
										</div>

										{/* {showProfile && <ProfileModal isOpen={showProfile} closeModal={toggleProfile} />} */}
									</div>
								) : (
									<Fragment>
										<button type="button" className="button" onClick={(event) => toggleAuthModal(event, true, "Login")}>Login</button>
										<button type="button" className="button primary-dark" onClick={(event) => toggleAuthModal(event, true, "Signup")}>Get Started</button>
									</Fragment>
								)}

								{showAuthModal && <AuthModal isOpen={showAuthModal} actionModal={toggleAuthModal} component={authComponent} />}
							</div>
						</ul>
					</nav>

					<h1>{course.title}</h1>

					{hasRights(["admin"]) && <button onClick={() => toggleModal("course")} className="button">Edit Course</button>}
					{modal.course && <CourseModal isOpen={modal.course} onClose={() => toggleModal("course")} course={course} />}

					<button onClick={buttonState.action && buttonState.action} className="button primary-dark">{buttonState.title}</button>

					{modal.payment && (
						<PaymentModal
							isOpen={modal.payment}
							onClose={() => toggleModal("payment")}
							data={{
								title: course.title,
								price: course.price,
								roles: course.accessRoles,
								successActionText: "Start Learning",
								successAction: () => { history.push(`/courses/${course.permalink}`);}
							}}
						/>
					)}

					<div className="video-player">
						<VideoPlayer playerId="promo" mediaId={course.mediaId} />
					</div>

					{hasCourseAccess &&
						<div className="progression">
							<div className="left-content">
								<p>{amountCompleted} of {course.unitCount} units completed</p>
								<div className="bar">
									<div className="progress" style={{ width: `${(amountCompleted / course.unitCount) * 100}%` }} />
								</div>
							</div>
							<div className={`right-content ${courseCompelted ? "completed" : ""}`}>
								<IconTrophy />
								<div className="bar">
									<div className="progress" style={{ width: courseCompelted ? "100%" : "0%" }} />
								</div>
							</div>
						</div>
					}
				</div>

				<img src="/connection-pattern.svg" alt="Connection Pattern" className="image-pattern connection-pattern"/>
				<img src="/landing/courses-bottom-pattern.svg" alt="Header Bottom Pattern" className="image-pattern bottom-pattern"/>
			</section>

			<section className="section course-view-content">
				<div className="course-view-wrapper">
					<h4>Description</h4>

					<div className={`description-container ${showDescription ? "expanded" : ""}`}>
						<div dangerouslySetInnerHTML={{ __html: course.description }} className="description-content" />
						{course.description.length > 590 && <span onClick={toggleDescription}><IconPlus /> View more</span>}
					</div>

					{hasRights(["admin"]) && <button onClick={() => toggleModal("module")}>Create Module</button>}
					{modal.module && <ModuleModal isOpen={modal.module} onClose={() => toggleModal("module")} course={course} />}

					<h4>Course Content</h4>
					<div className="curriculum-wrapper">
						{course.modules.map((module) => <CourseModule key={module._id} hasCourseAccess={hasCourseAccess} course={course} memberlist={memberlist} module={module} />)}
					</div>
				</div>
			</section>

			{/* <section className="section footer course-view">
				<div className="main-wrapper">
					<div className="content">
						<p>&copy; Copyright 2020 — All rights reserved — TF Certification</p>
						<p>
							<a href="/affiliate-program">Affiliate Program</a>
							<span className="hidden-xs">&bull;</span>
							<a href="/privacy-policy">Privacy Policy</a>
							<span className="hidden-xs">&bull;</span>
							<a href="/terms-conditions">Terms & Conditions</a>
						</p>
					</div>
				</div>
			</section> */}
		</Fragment>
	);
};

const CourseModule = ({ hasCourseAccess, course, memberlist, module }) => {
	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => setShowModal(!showModal);

	const units = UnitsCollection.find({ moduleId: module._id }, { sort: { order: 1 } }).fetch();

	return (
		<Fragment>
			<div className="lectures-header">
				{module.title} {hasRights(["admin"]) && <span className="action" onClick={toggleModal}><IconEdit /></span>}

				{showModal && <ModuleModal isOpen={showModal} onClose={toggleModal} course={course} module={module} />}
			</div>

			<div className="lectures-container">
				{units.map((unit) => <CourseUnit key={unit._id} hasCourseAccess={hasCourseAccess} memberlist={memberlist} courseId={course._id} moduleId={module._id} unit={unit} />)}
			</div>

			{hasRights(["admin"]) && <ModuleActions courseId={course._id} moduleId={module._id} /> }
		</Fragment>
	);
};

// Module Unit Creation Functionality (Select between Video, Text, Quiz)
const ModuleActions = ({ courseId, moduleId }) => {
	const [showModal, setShowModal] = useState(false);
	const [unitComponent, setUnitComponent] = useState("");

	const components = { VideoModal, TextModal, QuizModal };
	const RenderComponent = components[unitComponent];

	const toggleModal = (event, activeModal, component) => {
		event.preventDefault();
		event.stopPropagation();

		if (component) setUnitComponent(component);
		setShowModal(activeModal);
	};

	return (
		<div>
			<button onClick={(event) => toggleModal(event, true, "VideoModal")}>Create Video Unit</button>
			<button onClick={(event) => toggleModal(event, true, "TextModal")}>Create Text Unit</button>
			<button onClick={(event) => toggleModal(event, true, "QuizModal")}>Create Quiz Unit</button>

			{showModal && <RenderComponent isOpen={showModal} actionModal={toggleModal} courseId={courseId} moduleId={moduleId} />}
		</div>
	);
};

// Course Unit. This function lets you view and edit the units content.
const CourseUnit = ({ hasCourseAccess, memberlist, courseId, moduleId, unit }) => {
	const [showModal, setShowModal] = useState(false);
	const [unitComponent, setUnitComponent] = useState("");

	const components = { VideoModal, TextModal, QuizModal };
	const RenderComponent = components[unitComponent];

	const toggleModal = (event, activeModal, component) => {
		event.preventDefault();
		event.stopPropagation();

		if (component) setUnitComponent(component);
		setShowModal(activeModal);
	};
	const componentType = `${capitalizeText(unit.type)}Modal`; // Generates the Modal name based on the field unit.type

	// Course unit access functionality
	const { coursePermalink } = useParams();
	const history = useHistory();
	const handleUnitClick = () => { if (hasCourseAccess) history.push(`/courses/${coursePermalink}/${unit.permalink}`); }; // Open Unit only if user has access to the course

	// Check if user already completed this unit
	const unitCompleted = memberlist && memberlist.unitsCompleted.includes(unit._id);

	// Unit icon generator
	const icons = { IconVideo, IconText, IconQuiz, IconLock, IconCheck };
	const RenderIcon = icons[unitCompleted ? "IconCheck" : hasCourseAccess ? `Icon${capitalizeText(unit.type)}` : "IconLock"];

	return (
		<div className={`lecture-container ${hasCourseAccess ? "available" : ""} ${unitCompleted ? "completed" : ""}`}>
			<div className="left-content">
				<RenderIcon />
				<a onClick={handleUnitClick}>{unit.title}</a>
				{hasRights(["admin"]) && <span className="action" onClick={(event) => toggleModal(event, true, componentType)}><IconEdit /></span>}
			</div>

			<span className="length hidden-xs">{descriptionText(unit)}</span>

			{showModal && <RenderComponent isOpen={showModal} actionModal={toggleModal} courseId={courseId} moduleId={moduleId} unit={unit} />}
		</div>
	);
};

const descriptionText = (unit) => {
	switch (unit.type) {
	case "video":
		const mediaLength = unit.content.mediaLength;

		let amountMinutes = Math.floor(mediaLength / 60);
		amountMinutes =  amountMinutes < 10 ? `0${amountMinutes}` : amountMinutes;

		let amountSeconds = mediaLength % 60;
		amountSeconds = amountSeconds < 10 ? `0${amountSeconds}` : amountSeconds;
		return `${amountMinutes}:${amountSeconds}`;
	case "text":
		return "";
	case "quiz":
		const amountQuestions = unit.content.questions.length;
		return amountQuestions == 1 ? "1 Question" : `${amountQuestions} Questions`;
	default:
		return "";
	}
};
