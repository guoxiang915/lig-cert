import React, { useState, useEffect,Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import loadable from "@loadable/component";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import { useTagManager } from "/imports/ui/components/hooks/useTagManager";
import { hasRights, capitalizeText, _union } from "/imports/ui/components/Functions";
import { IconTrophy, IconEdit, IconPlus, IconVideo, IconText, IconQuiz, IconLock, IconCheck } from "/imports/ui/components/Icons";
import { CoursesCollection } from "/imports/api/courses/courses";
import { UnitsCollection } from "/imports/api/courses/units";
import { MemberlistsCollection } from "/imports/api/courses/memberlists";
import { Dropdown, DropdownExternalLink } from "/imports/ui/components/Dropdown";
import { SEO } from "/imports/ui/components/SEO";
import { VideoPlayer } from "/imports/ui/components/VideoPlayer";
import { LazyImage } from "/imports/ui/components/LazyImage";
import AuthModal from "/imports/ui/authentication/AuthModal";
const ProfileModal = loadable(() => import("/imports/ui/profile/ProfileModal"));
const PaymentModal = loadable(() => import("/imports/ui/payment/PaymentModal"));
const CourseModal = loadable(() => import("/imports/ui/courses/CourseModal"));
const ModuleModal = loadable(() => import("/imports/ui/courses/ModuleModal"));
const VideoModal = loadable(() => import("/imports/ui/courses/VideoModal"));
const TextModal = loadable(() => import("/imports/ui/courses/TextModal"));
const QuizModal = loadable(() => import("/imports/ui/courses/QuizModal"));
import "/imports/ui/stylesheets/navbar.css";
import "/imports/ui/stylesheets/footer.css";
import "/imports/ui/courses/styles.css";

export default CourseView = () => {
	const [showProfileModal, setShowProfileModal] = useState(false);
	const toggleProfileModal = () => setShowProfileModal(!showProfileModal);

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

	useEffect(() => {
		window.prerenderReady = true;
		Intercom("boot", { app_id: "ort0cycf" });

		return () => Intercom("shutdown");
	}, []);

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
			useTagManager({
				"event": "checkout",
				"ecommerce": {
					"checkout": {
						"actionField": { "step": 1 },
						"products": [{ "name": "TF Certification", "id": course.accessRoles.join(), "price": course.price, "brand": "TFC", "category": "Courses", "quantity": 1 }]
					}
				}
			});

			toggleModal("payment");
		} };
	}

	// Progression bar
	const amountCompleted = memberlist ? memberlist.unitsCompleted.length : 0;
	const courseCompleted = memberlist && memberlist.completedAt;

	return (
		<Fragment>
			<SEO
				title={course.seo.title}
				description={course.seo.description}
				contentType="website"
				path={`courses/${coursePermalink}`}
			/>

			<section className="section course-view-header">
				<div className="main-wrapper">
					<nav>
						<div className="logo-label">
							<img src="/logo.svg" alt="TF Certification Logo" onClick={() => history.push("/")} />
						</div>

						<ul className="actions hidden-xs">
							<li><a onClick={() => history.push("/")}>Home</a></li>
							<li onClick={() => history.push("/blog")}><a>Blog</a></li>

							<div className="buttons">
								{user ? (
									<Fragment>
										<Dropdown title={`Hi ${user.profile.name.first}`}>
											<a className="dropdown-item" onClick={toggleProfileModal}>Profile</a>
											{hasRights(["admin"]) && <a className="dropdown-item" onClick={() => history.push("/admin/users")}>Administrator</a>}

											<div className="dropdown-container">
												<DropdownExternalLink link="https://intercom.help/TFCertification" className="dropdown-item">Knowledge Base</DropdownExternalLink>
												<DropdownExternalLink link="https://discord.gg/TjhK28Kr9k" className="dropdown-item">Community</DropdownExternalLink>
												<DropdownExternalLink link="mailto:support@tfcertification.intercom.com" className="dropdown-item">Contact</DropdownExternalLink>
											</div>

											<a className="dropdown-item" onClick={() => Meteor.logout()}>Logout</a>
										</Dropdown>

										{showProfileModal && <ProfileModal isOpen={showProfileModal} closeModal={toggleProfileModal} />}
									</Fragment>
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
								productId: course.accessRoles.join(),
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
							<div className={`right-content ${courseCompleted ? "completed" : ""}`}>
								<IconTrophy />
								<div className="bar">
									<div className="progress" style={{ width: courseCompleted ? "100%" : "0%" }} />
								</div>
							</div>
						</div>
					}
				</div>

				<img src="/connection-pattern.svg" className="image-pattern connection-pattern"/>
				<img src="/landing/courses-bottom-pattern.svg" className="image-pattern bottom-pattern"/>
			</section>

			<section className="section course-view-content">
				<div className="main-wrapper">
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

					<LazyImage src="/tf-pattern.svg" alt="TF Pattern" classes="left-pattern hidden-xs"/>
					<LazyImage src="/tf-pattern.svg" alt="TF Pattern" classes="right-pattern hidden-xs"/>
				</div>
			</section>

			<section className="section footer">
				<div className="main-wrapper">
					<p>&copy; Copyright 2021 — All rights reserved — TF Certification</p>
					<p>
						<a href="/privacy-policy">Privacy Policy</a>
						<span className="hidden-xs">&bull;</span>
						<a href="/terms-conditions">Terms & Conditions</a>
					</p>
				</div>
			</section>
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
			<span className="icon"><RenderIcon /></span>

			<div>
				<a onClick={handleUnitClick}>{unit.title}</a>
				{hasRights(["admin"]) && <span className="action" onClick={(event) => toggleModal(event, true, componentType)}><IconEdit /></span>}
			</div>

			<span className="highlight hidden-xs">{descriptionText(unit)}</span>

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
