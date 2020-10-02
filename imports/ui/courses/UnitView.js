import React, { Fragment, useState, useRef, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { CoursesCollection } from "/imports/api/courses/courses";
import { UnitsCollection } from "/imports/api/courses/units";
import { MemberlistsCollection } from "/imports/api/courses/memberlists";
import { SEO } from "/imports/ui/components/SEO";
import { IconMenu, IconVideo, IconText, IconQuiz, IconCheck } from "/imports/ui/components/Icons";
import { hasRights, _union, capitalizeText, _pluck, _difference } from "/imports/ui/components/Functions";
import { VideoPlayer } from "/imports/ui/components/VideoPlayer";
import "/imports/ui/courses/styles.css";

export default UnitView = () => {
	const [showSidebar, setShowSidebar] = useState(true);
	const toggleSidebar = () => setShowSidebar(!showSidebar);

	const { coursePermalink, unitPermalink } = useParams();

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
		<Fragment>
			{hasCourseAccess ? (
				<div className="unit-container">
					<UnitSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} course={course} memberlist={memberlist} />
					<UnitContent showSidebar={showSidebar} toggleSidebar={toggleSidebar} course={course} />
				</div>
			) : (
				<Fragment>
					<h1>Ups, you dont have access to this course.</h1>
					<p>If you want to get full access to this course, please <Link to={`/courses/${coursePermalink}`}>Click Here</Link> and Purchase the course.</p>
				</Fragment>
			)}
		</Fragment>
	);
};

const UnitContent = ({ showSidebar, toggleSidebar, course }) => {
	const { coursePermalink, unitPermalink } = useParams();
	const history = useHistory();
	const unit = UnitsCollection.findOne({ permalink: unitPermalink });

	// Generate unit component
	const components = { UnitVideo, UnitText, UnitQuiz };
	const RenderComponent = components[`Unit${capitalizeText(unit.type)}`];

	// Generation Next Step Functionality
	const nextUnit = UnitsCollection.findOne({ order: unit.order + 1 });
	const lastUnit = course.unitCount === unit.order + 1;

	const nextState = {
		title: lastUnit ? "Finish Course" : "Next Unit",
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
				if (error) { console.warn(error); }
			});

			return lastUnit ? history.push(`/courses/${coursePermalink}`) : history.push(`/courses/${coursePermalink}/${nextUnit.permalink}`);
		}
	};

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
			</div>
		</Fragment>
	);
};

const UnitHeader = ({ unit, classes="", toggleSidebar, showHeader=true }) => {
	const { coursePermalink } = useParams();

	return (
		<div className={`header ${classes} ${showHeader ? "" : "hidden"}`}>
			<span onClick={toggleSidebar}><IconMenu /></span>
			<p>{unit.title}</p>
			<Link to={`/courses/${coursePermalink}`} className="">Back to Course</Link>
		</div>
	);
};

const UnitVideo = ({ course, unit, nextState, toggleSidebar }) => {
	const [showHeader, setShowHeader] = useState(true);

	const customActions = (videoPlayer) => {
		// Next Unit button. Defined here since it should only work with the Unit View Player
		videoPlayer.addButton("/player/skip.svg", "Next Unit", () => {
			videoPlayer.pause();
			nextState.action();
		}, "skip", "jw-icon-skip");

		let hideInterval;

		videoPlayer.on("firstFrame", () => {
			hideInterval = setInterval(() => {
				const isInactive = videoPlayer.getContainer().classList.contains("jw-flag-user-inactive");
				setShowHeader(!isInactive);
			}, 250);
		});

		videoPlayer.on("remove", () => {
			clearInterval(hideInterval); // Interval has to be clean within this function, otherwise its reference will exist
		});
	};

	return (
		<Fragment>
			<UnitHeader unit={unit} classes="video" toggleSidebar={toggleSidebar} showHeader={showHeader} />
			<VideoPlayer playerId="unit" mediaId={unit.content.mediaId} custom={customActions} />
			{/* <button type="button" onClick={() => nextState.action()}>{nextState.title}</button> */}
		</Fragment>
	);
};

const UnitText = ({ unit, nextState, toggleSidebar }) => {
	return (
		<Fragment>
			<UnitHeader unit={unit} toggleSidebar={toggleSidebar} showHeader={true} />

			<div className="text-content">
				<div dangerouslySetInnerHTML={{ __html: unit.content.text }} />
				<br/>
				<button type="button" className="button primary-dark" onClick={() => nextState.action()}>{nextState.title}</button>
			</div>
		</Fragment>
	);
};

const UnitQuiz = ({ unit, nextState, toggleSidebar }) => {
	const [status, setStatus] = useState({ questionPos: 0, selectedAnswers: [], displaySummary: false });

	useEffect(() => { setStatus({ questionPos: 0, selectedAnswers: [], displaySummary: false }); }, [unit._id]);

	const questions = unit.content.questions;
	const currentQuestion = questions[status.questionPos];
	const multipleChoice = currentQuestion?.answers.length > 1; // Says if the quiz has multiple options
	const nextQuestion = status.questionPos !== questions.length - 1;
	const disableNext = !(status.selectedAnswers.length === status.questionPos + 1 && status.selectedAnswers[status.questionPos] && status.selectedAnswers[status.questionPos].length);

	const handleNextQuestion = (event) => {
		event.preventDefault();
		setStatus({ ...status, questionPos: status.questionPos + 1 });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setStatus({ ...status, displaySummary: true });
	};

	return (
		<Fragment>
			<UnitHeader unit={unit} toggleSidebar={toggleSidebar} showHeader={true} />

			<div className="quiz-content">
				<span>Question {status.questionPos + 1} of {questions.length}</span>
				<div dangerouslySetInnerHTML={{ __html: currentQuestion?.question }} className="question" />

				<div>
					{currentQuestion?.options.map((option) => <UnitQuizOption key={option._id} option={option} status={status} setStatus={setStatus} multipleChoice={multipleChoice} />)}
				</div>

				<br/>
				{nextQuestion && <button type="button" className="button primary-dark" onClick={handleNextQuestion} disabled={disableNext}>Next Question</button>}
				{!nextQuestion && !status.displaySummary && <button type="button" className="button primary-dark" onClick={handleSubmit} disabled={disableNext}>Submit Quiz</button>}

				{status.displaySummary && <UnitQuizSummary unit={unit} nextState={nextState} status={status} setStatus={setStatus} />}
			</div>
		</Fragment>
	);
};

const UnitQuizOption = ({ option, status, setStatus, multipleChoice }) => {
	const { displaySummary, questionPos, selectedAnswers } = status;
	let questionAnswers = selectedAnswers[questionPos] ? selectedAnswers[questionPos] : [];

	const handleCheckOption = () => {
		const optionSelected = questionAnswers.includes(option._id);

		if (optionSelected) {
			const answerIndex = questionAnswers.indexOf(option._id);
			questionAnswers.splice(answerIndex, 1);
		} else {
			multipleChoice ? questionAnswers.push(option._id) : questionAnswers = [option._id];
		}

		selectedAnswers[questionPos] = questionAnswers;
		setStatus({ ...status, selectedAnswers: selectedAnswers });
	};

	return (
		<div>
			<input type="checkbox" onChange={handleCheckOption} checked={questionAnswers.includes(option._id)} disabled={displaySummary} />
			{option.text}
		</div>
	);
};

const UnitQuizSummary = ({ unit, nextState, status, setStatus }) => {
	const questions = unit.content.questions;
	const answers = _pluck(questions, "answers");
	let amountWrongAnswers = 0;

	// If statement needed for UnitQuiz re-render
	if (answers.length === status.selectedAnswers.length) answers.forEach((answer, index) => {
		if (_difference(answer, status.selectedAnswers[index]).length) amountWrongAnswers += 1;
	});

	const passedQuiz = Math.ceil(questions.length * 0.8) <= questions.length - amountWrongAnswers; // Pass the exam with 80% correct answers

	const handleRetry = (event) => {
		event.preventDefault();
		setStatus({ questionPos: 0, selectedAnswers: [], displaySummary: false });
	};

	return (
		<Fragment>
			<hr/>
			{passedQuiz ? (
				<Fragment>
					<h4>Good Job!</h4>
					<p>You answered {questions.length - amountWrongAnswers}/{questions.length} answers correctly.</p>
					<button type="button"className="button primary-dark" onClick={() => nextState.action()}>{nextState.title}</button>
				</Fragment>
			) : (
				<Fragment>
					<h4>Try Again!</h4>
					<p>You answered {questions.length - amountWrongAnswers}/{questions.length} answers correctly.</p>
					<button type="button" className="button primary-dark" onClick={handleRetry}>Retry</button>
				</Fragment>
			)}
		</Fragment>
	);
};

// Unit View Sidebar
const UnitSidebar = ({ showSidebar, toggleSidebar, course, memberlist }) => {
	const activeModuleRef = useRef(null);

	useEffect(() => activeModuleRef.current.scrollIntoView(), [activeModuleRef]);

	return (
		<div className={`sidebar-content ${showSidebar ? "visible" : ""}`}>
			<p className="menu-action visible-xs" onClick={toggleSidebar}>
				Hide Menu
				<IconMenu />
			</p>

			{course.modules.map((module) => <SidebarModule key={module._id} course={course} memberlist={memberlist} module={module} activeModuleRef={activeModuleRef} />)}
		</div>
	);
};

const SidebarModule = ({ course, memberlist, module, activeModuleRef }) => {
	const units = UnitsCollection.find({ moduleId: module._id }, { sort: { order: 1 } }).fetch();

	const { unitPermalink } = useParams();
	const isActiveModule = units.find((unit) => { return unit.permalink == unitPermalink; } );

	return (
		<Fragment>
			<div className="lectures-header" ref={isActiveModule ? activeModuleRef : null}>{module.title}</div>

			<div className="lectures-container">
				{units.map((unit) => <SidebarUnit key={unit._id} course={course} memberlist={memberlist} unit={unit} />)}
			</div>
		</Fragment>
	);
};

const SidebarUnit = ({ course, memberlist, unit }) => {
	// Check if unit is currently active
	const { unitPermalink } = useParams();
	const activeUnit = unit.permalink == unitPermalink;

	// Check if user already completed this unit
	const unitCompleted = memberlist && memberlist.unitsCompleted.includes(unit._id);

	// Sidebar unit icon generator
	const icons = { IconVideo, IconText, IconQuiz, IconCheck };
	const RenderIcon = icons[unitCompleted ? "IconCheck" : `Icon${capitalizeText(unit.type)}`];

	return (
		<div className={`lecture-container ${unitCompleted ? "completed" : ""} ${activeUnit ? "active" : ""}`}>
			<RenderIcon />
			<Link to={`/courses/${course.permalink}/${unit.permalink}`}>{unit.title}</Link>
		</div>
	);
};
