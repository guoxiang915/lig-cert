import React, { useState, Fragment } from "react";
import { Random } from "meteor/random";
import { CoursesCollection } from "/imports/api/courses/courses";
import { UnitsCollection } from "/imports/api/courses/units";
import { cleanPermalink, _findWhere } from "/imports/ui/components/Functions";
import { Modal } from "/imports/ui/components/Modal";
import { IconDelete, IconWarning } from "/imports/ui/components/Icons";
import { courseHasError, courseErrorMessage } from "/imports/ui/components/Validations";

export default QuizModal = ({ isOpen, actionModal, unit, courseId, moduleId }) => {
	const amountUnits = UnitsCollection.find({ courseId: courseId }).count();

	// Find order for new unit
	const findOrder = function(courseId, moduleId) {
		const course = CoursesCollection.findOne({ _id: courseId });
		const currentModule = _findWhere(course.modules, moduleId, "_id");

		const lastUnit = UnitsCollection.findOne({ courseId: courseId, moduleId: moduleId }, { sort: { order: -1 } });

		if (lastUnit) {
			return lastUnit.order + 1;
		} else {
			const prevModule = _findWhere(course.modules, currentModule.order - 1, "order");
			return prevModule ? findOrder(courseId, prevModule._id) : 0;
		}
	};

	const [values, setValues] = useState({
		title: unit ? unit.title : "",
		permalink: unit ? unit.permalink : "",
		order: unit ? unit.order : findOrder(courseId, moduleId),
		questions: unit ? unit.content.questions : [],
		errorState: "",
		loading: false
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();

		if (!values.title) return setValues({ ...values, errorState: "missing-title" });
		if (!values.permalink) return setValues({ ...values, errorState: "missing-permalink" });
		if (values.questions.length === 0) return setValues({ ...values, errorState: "missing-questions" });

		const unitData = {
			title: values.title,
			permalink: cleanPermalink(values.permalink),
			type: "quiz",
			courseId: courseId,
			moduleId: moduleId,
			order: parseInt(values.order),
			content: {
				questions: values.questions
			}
		};

		event.persist(); // Used to maintain the event for the asynchronous call of actionModal
		const unitId = unit ? unit._id : null;
		setValues({ ...values, loading: true });

		Meteor.call("unit.upsert", unitId, unitData, (error) => {
			setValues({ ...values, loading: false });

			if (error) {
				if (error.reason === "Permalink already exists") return setValues({ ...values, errorState: "already-used-permalink" });
				console.warn(error);
			} else {
				actionModal(event, false);
			}
		});
	};

	const handleCreateQuestion = (event) => {
		event.preventDefault();
		values.questions.push({ question: "", answers: [], options: [] });
		setValues({ ...values });
	};

	const handleDelete = (event) => {
		event.preventDefault();
		event.persist();

		Meteor.call("unit.remove", unit._id, (error) => {
			if (error) { console.warn(error); }
		});
	};

	const modalAction = `${unit ? "Update" : "Create"} Quiz Unit`;

	return (
		<Modal isOpen={isOpen} onClose={(event) => actionModal(event, !isOpen)} classes="unit-modal">
			<form onSubmit={handleSubmit}>
				<h4>{modalAction}</h4>

				<label className={`${courseHasError("title", values.errorState) ? "error" : ""}`}>
					Title:
					<input type="text" name="title" value={values.title} onChange={handleChange} placeholder="e.g. Course Quiz" />
				</label>

				<label className={`${courseHasError("permalink", values.errorState) ? "error" : ""}`}>
					Permalink:
					<input type="text" name="permalink" value={values.permalink} onChange={handleChange} placeholder="e.g. course-quiz" />
				</label>

				<label>
					Order:
					<input type="number" name="order" value={values.order} onChange={handleChange} placeholder="e.g. 23" min="0" max={amountUnits - 1} disabled={!unit} />
				</label>

				<hr/>
				<label className={`${courseHasError("questions", values.errorState) ? "error" : ""}`}>
					Questions:
					{values.questions.map((question, pos) => <QuestionItem key={`question-${pos}`} values={values} setValues={setValues} questionPos={pos} question={question} /> )}
					<button type="button" onClick={handleCreateQuestion}>Add Question</button>
				</label>
				<hr/>

				{values.errorState && <p className="error-message"><IconWarning/>{courseErrorMessage(values.errorState)}</p>}

				{unit && <button onClick={handleDelete}>Delete Unit</button>}

				<button type="submit" disabled={values.loading}>
					{values.loading && <span className="loading"></span>} {modalAction}
				</button>
			</form>
		</Modal>
	);
};

const QuestionItem = ({ values, setValues, questionPos, question }) => {
	const handleChangeItem = (event) => {
		const { name, value } = event.target;
		const questions = values.questions;

		questions[questionPos] = { ...question, [name]: value };
		setValues({ ...values, questions: questions });
	};

	const handleDeleteItem = (event) => {
		event.preventDefault();
		const questions = values.questions;

		questions.splice(questionPos, 1);
		setValues({ ...values, questions: questions });
	};

	const handleCreateOption = (event) => {
		event.preventDefault();
		const questions = values.questions;

		question.options.push({ _id: Random.id(), text: "" });
		questions[questionPos] = question;
		setValues({ ...values, questions: questions });
	};

	return (
		<Fragment>
			<Fragment>
				<label>
					Question {questionPos + 1}
					<span onClick={handleDeleteItem}><IconDelete /></span>
				</label>
				<textarea type="text" name="question" value={question.question} onChange={handleChangeItem} placeholder="Question text..." />
			</Fragment>

			<div className="quiz-options-container">
				{question.options.map((option, pos) => <QuestionOption key={option._id} values={values} setValues={setValues} questionPos={questionPos} question={question} optionPos={pos} option={option} /> )}
				<button type="button" onClick={handleCreateOption}>Add Option</button>
			</div>
			<hr/>
		</Fragment>
	);
};

const QuestionOption = ({ values, setValues, questionPos, question, optionPos, option }) => {
	const handleCheckOption = () => {
		const questions = values.questions;

		if (!question.answers.includes(option._id)) {
			question.answers.push(option._id);
		} else {
			const answerIndex = question.answers.indexOf(option._id);
			question.answers.splice(answerIndex, 1);
		}

		questions[questionPos] = { ...question };
		setValues({ ...values, questions: questions });
	};

	const handleChangeOption = (event) => {
		const { name, value } = event.target;
		const questions = values.questions;
		const options = question.options;

		options[optionPos] = { ...option, [name]: value };
		questions[questionPos] = { ...question, options };
		setValues({ ...values, questions: questions });
	};

	const handleDeleteOption = (event) => {
		event.preventDefault();
		const questions = values.questions;
		const options = question.options;

		options.splice(optionPos, 1); // Remove quiz option

		if (question.answers.includes(option._id)) { // Removove question answer if deleted option was selected
			const answerIndex = question.answers.indexOf(option._id);
			question.answers.splice(answerIndex, 1);
		}

		questions[questionPos] = { ...question, options };
		setValues({ ...values, questions: questions });
	};

	return (
		<Fragment>
			<label>
				<input type="checkbox" checked={question.answers.includes(option._id)} onChange={handleCheckOption} />
				Option {optionPos + 1}
				<span onClick={handleDeleteOption}><IconDelete /></span>
			</label>
			<textarea type="text" name="text" value={option.text} onChange={handleChangeOption} placeholder="Question option text..." />
		</Fragment>
	);
};
