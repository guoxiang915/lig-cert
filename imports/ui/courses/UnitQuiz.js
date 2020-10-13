import React, { useState, useEffect, Fragment } from "react";
import { _union, _pluck, _difference } from "/imports/ui/components/Functions";
import { UnitHeader } from "/imports/ui/courses/UnitHeader";

export const UnitQuiz = ({ unit, nextState, toggleSidebar }) => {
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
				{nextQuestion && <button type="button" className="button primary dark-hover" onClick={handleNextQuestion} disabled={disableNext}>Next Question</button>}
				{!nextQuestion && !status.displaySummary && <button type="button" className="button primary dark-hover" onClick={handleSubmit} disabled={disableNext}>Submit Quiz</button>}

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
					<button type="button"className="button primary dark-hover" onClick={() => nextState.action()}>{nextState.title}</button>
				</Fragment>
			) : (
				<Fragment>
					<h4>Try Again!</h4>
					<p>You answered {questions.length - amountWrongAnswers}/{questions.length} answers correctly.</p>
					<button type="button" className="button primary dark-hover" onClick={handleRetry}>Retry</button>
				</Fragment>
			)}
		</Fragment>
	);
};
