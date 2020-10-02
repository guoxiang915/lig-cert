import React, { useState, useEffect, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { SEO } from "/imports/ui/components/SEO";
import loadable from "@loadable/component";
import { CoursesCollection } from "/imports/api/courses/courses";
import CourseItem from "/imports/ui/admin/courses/CourseItem";
const CourseModal = loadable(() => import("/imports/ui/courses/CourseModal"));
import "/imports/ui/stylesheets/table.css";
import "/imports/ui/admin/courses/styles.css";

export default CoursesList = () => {
	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => setShowModal(!showModal);

	useEffect(() => { window.prerenderReady = true; }, []);

	const { dataLoading, courses } = useTracker(() => {
		const subs = Meteor.subscribe("courses/list");

		return {
			dataLoading: !subs.ready(),
			courses: CoursesCollection.find().fetch()
		};
	}, []);

	return (
		<Fragment>
			<SEO
				title='Courses Administration'
				description='Welcome to the courses administration section.'
				contentType="website"
				path='admin/courses'
			/>

			<button type="button" onClick={toggleModal}>Create Course</button>

			<div className="table">
				{dataLoading ? <p>Loading...</p> : courses.map(course => <CourseItem key={course._id} course={course} />)}
			</div>

			{showModal && <CourseModal isOpen={showModal} onClose={toggleModal} />}
		</Fragment>
	);
};
