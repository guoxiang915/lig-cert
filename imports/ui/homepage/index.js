import React, { useState, useEffect, useRef, Fragment } from "react";
import { Meteor } from "meteor/meteor";
import loadable from "@loadable/component";
import { useHistory } from "react-router-dom";
import { Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import { SEO } from "/imports/ui/components/SEO";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import { hasRights } from "/imports/ui/components/Functions";
import AuthModal from "/imports/ui/authentication/AuthModal";
import { Dropdown } from "/imports/ui/components/Dropdown";
import { VideoPlayer } from "/imports/ui/components/VideoPlayer";
import { LazyImage } from "/imports/ui/components/LazyImage";
import { IconPlus, IconMinus, IconAward, IconLinkedin, IconUdemy, IconCircleCheck, IconLongLeftArrow, IconLongRightArrow, IconBlockquote } from "/imports/ui/components/Icons";
import { SliderWrapper } from "/imports/ui/components/SliderWrapper";
const ProfileModal = loadable(() => import("/imports/ui/profile/ProfileModal"));
import "/imports/ui/stylesheets/navbar.css";
import "/imports/ui/stylesheets/footer.css";
import "/imports/ui/homepage/styles.css";

export default Homepage = () => {
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [authComponent, setAuthComponent] = useState("");

	const [showProfileModal, setShowProfileModal] = useState(false);
	const toggleProfileModal = () => setShowProfileModal(!showProfileModal);

	const { user } = useAccount();
	const history = useHistory();

	const toggleAuthModal = (event, activeModal, component) => {
		event.preventDefault();
		if (component) setAuthComponent(component);
		setShowAuthModal(activeModal);
	};

	useEffect(() => { window.prerenderReady = true; }, []);

	// Ref definitions for Navbar Scrolling
	const advantagesRef = useRef();
	const instructorRef = useRef();
	const courseRef = useRef();

	return (
		<Fragment>
			<SEO
				title='Welcome'
				description='TBD'
				contentType="website"
				path='/'
			/>

			<section className="section homepage-header">
				<div className="main-wrapper">
					<nav>
						<img src="/logo.svg" alt="TF Certification Logo"/>

						<ul className="actions hidden-xs">
							<li onClick={() => advantagesRef.current.scrollIntoView({ behavior: "smooth" })}><a>Features</a></li>
							<li onClick={() => instructorRef.current.scrollIntoView({ behavior: "smooth" })}><a>Instructor</a></li>
							<li onClick={() => courseRef.current.scrollIntoView({ behavior: "smooth" })}><a>Course</a></li>

							<div className="buttons">
								{user ? (
									<Fragment>
										<Dropdown title={`Hi ${user.profile.name.first}`}>
											<a className="dropdown-item" onClick={toggleProfileModal}>Profile</a>
											{hasRights(["admin"]) && <a className="dropdown-item" onClick={() => history.push("/admin/users")}>Administrator</a>}
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

					<div className="information-container">
						<div className="left-content">
							<h1>Become a TensorFlow Certified Professional Developer</h1>
							<p>Join the best training ground for AI mastery and gain the skills you need to become a TensorFlow Certified Developer.</p>
						</div>
						<div className="right-content">
							<VideoPlayer playerId="presentation" mediaId="QyhlZf0X" />
						</div>
					</div>
				</div>

				<img src="/connection-pattern.svg" alt="Connection Pattern" className="image-pattern connection-pattern"/>
				<img src="/landing/header-bottom-pattern.svg" alt="Header Bottom Pattern" className="image-pattern bottom-pattern"/>
			</section>

			<SkillsContainer />

			<section className="section homepage-advantages" ref={advantagesRef}>
				<LazyImage src="/landing/advantages-top-pattern.svg" alt="Advantages Top Pattern" classes="image-pattern top-pattern"/>

				<div className="main-wrapper">
					<div className="left-content">
						<h1>Open Doors with TensorFlow Certification</h1>
						<p>TensorFlow’s rapid rise in adoption and job growth listings aren't showing signs of slowing down. </p>
						<p>TensorFlow is here to stay, and certification sets you apart on the job market.  The TensorFlow Developer Professional Certificate course puts you on the fast track to certification.</p>
						<a className="button primary-dark" onClick={(event) => toggleAuthModal(event, true, "Signup")}>Get Started</a>
					</div>

					<div className="right-content">
						<div className="column">
							<div className="advantage-item">
								<LazyImage src="/landing/advantages-icon-1.svg" alt="Advantages Icon 1"/>
								<h5>Earn Google’s Stamp of Approval</h5>
								<p>Set yourself apart by becoming a Google Certified Developer. Get listed not the developer network and put yourself in front of companies searching for qualified AI experts.</p>
							</div>

							<div className="advantage-item">
								<LazyImage src="/landing/advantages-icon-2.svg" alt="Advantages Icon 2"/>
								<h5>Gain Practical Machine Learning Skills</h5>
								<p>Develop the skill set needed to develop state-of-the-art ML and DL solutions for some of the most common problems that businesses face today.</p>
							</div>
						</div>

						<div className="column">
							<div className="advantage-item">
								<LazyImage src="/landing/advantages-icon-3.svg" alt="Advantages Icon 3"/>
								<h5>Advance Your Career</h5>
								<p>Do more and earn more by becoming TensorFlow certified and proving to current and future employers you have the right skills to drive real change.</p>
							</div>

							<div className="advantage-item highlight">
								<LazyImage src="/landing/advantages-icon-4.svg" alt="Advantages Icon 4"/>
								<h5>Our Guarantee</h5>
								<p>Gain peace of mind with our ‘Pass or We Pay' for your 2nd exam attempt guarantee*</p>
								<p><i>if you don’t pass on your first try.</i></p>
							</div>
						</div>
					</div>

					<LazyImage src="/tf-pattern.svg" alt="TF Pattern" classes="left-pattern hidden-xs"/>
				</div>

				<LazyImage src="/landing/advantages-bottom-pattern.svg" alt="Advantages Bottom Pattern" classes="image-pattern bottom-pattern"/>
			</section>

			<section className="section homepage-expertise" ref={instructorRef}>
				<div className="main-wrapper">
					<div className="instructor">
						<h1>Learn from an AI Expert</h1>
						<p className="subtitle">Hadelin de Ponteves, one of the world’s youngest leading providers of professional online education, top Udemy instructor, innovator in the global Data Science community, academic writer and High-Tech entrepreneur, guides you to the world of TensorFlow adventures.</p>

						<div className="instructor-container">
							<div className="left-content">
								<div className="image">
									<LazyImage src="/landing/hadelin-picture.jpg" alt="Hadelin Picture"/>
								</div>

								<div className="stats-item">
									<IconAward />
									<div className="description">
										<p><strong>Most Popular</strong></p>
										<p>Artificial Intelligence Course Online</p>
									</div>
								</div>

								<div className="stats-item">
									<IconAward />
									<div className="description">
										<p><strong>1.2M+</strong></p>
										<p>Students in All Courses</p>
									</div>
								</div>

								<div className="stats-item">
									<IconAward />
									<div className="description">
										<p><strong>200,000 +</strong></p>
										<p>5 Star Reviews</p>
									</div>
								</div>
							</div>

							<div className="right-content">
								<h1>Hadelin de Ponteves</h1>
								<p>Hadelin is an ex-Google Artificial Intelligence expert holding an Engineering Masters degree from École Centrale Paris with a specialization in Machine Learning.</p>
								<p>He is a Co-Founder and CEO at BlueLife AI, which leverages the power of Artificial Intelligence to empower businesses to make massive profits by innovating, automating processes and maximizing efficiency. He is an online entrepreneur who has created over 70 top-rated educational e-courses, which have made 2M+ sales in 210 countries.</p>
								<p>Hadelin’s personal philosophy is to help people around the world leverage the available cutting-edge knowledge to create a better world.</p>
								<div className="links">
									<a href="https://www.linkedin.com/in/hadelin-de-ponteves-1425ba5b" target="_blank" rel="noopener"><IconLinkedin /></a>
									<a href="https://www.udemy.com/user/hadelin-de-ponteves" target="_blank" rel="noopener"><IconUdemy /></a>
								</div>

								<div>
									{!user && <button className="button primary-dark" onClick={(event) => toggleAuthModal(event, true, "Signup")}>Get Started</button>}
									<a href="mailto: support@tfcertification.com" target="_blank" rel="noopener">Contact us for more details</a>
								</div>
							</div>
						</div>

						<LazyImage src="/tf-pattern.svg" alt="TF Pattern" classes="right-pattern hidden-xs"/>
					</div>

					<div className="insurance">
						<LazyImage src="/landing/insurance-icon.svg" alt="Insurance Icon" classes="image" />
						<h1>With Success Insurance</h1>
						<h2>Pass or we pay or your second exam attempt</h2>

						<LazyImage src="/landing/insurance-pattern.svg" alt="Insurance Pattern" classes="image-pattern bottom-pattern"/>
					</div>
				</div>
			</section>

			<section className="section homepage-courses">
				<LazyImage src="/landing/courses-top-pattern.svg" alt="Courses Top Pattern" classes="image-pattern top-pattern"/>

				<div className="main-wrapper">
					<div className="features-container">
						<div className="feature-item">
							<LazyImage src="/landing/feature-icon-1.svg" alt="Features Icon 1" />
							<h5>Lifetime Access</h5>
							<p>Receive lifetime access to all course content and additional learning materials for reference ahead of your exam or after certification.</p>
						</div>

						<div className="feature-item">
							<LazyImage src="/landing/feature-icon-2.svg" alt="Features Icon 2" />
							<h5>Hands-On with A Certified Instructor</h5>
							<p>Follow along as AI Expert and TensorFlow-certified instructor Hadelin de Ponteves guides you step-by-step in building Deep Learning models in TensorFlow.</p>
						</div>

						<div className="feature-item">
							<LazyImage src="/landing/feature-icon-3.svg" alt="Features Icon 3" />
							<h5>Start from Scratch</h5>
							<p>Cover Deep Learning theory and understand how artificial neural networks work. Master Computer Vision, Transfer Learning, Natural Language Processing, and more.</p>
						</div>
					</div>

					<div className="courses-container" ref={courseRef}>
						<h1>Your Certificate Is Waiting</h1>
						<p className="subtitle">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>

						<div className="course-item">
							<div className="video-content">
								<div className="price-label">
									<h2>$199</h2>
								</div>

								<VideoPlayer playerId="homepage-course-tca" mediaId="0YytwiBG" />
							</div>
							<div className="description-content">
								<div className="shape">
									<h1>TensorFlow Developer Professional Certificate Course</h1>
									<p>Dive into TensorFlow 2.0 and master the popular deep learning framework in this hands-on course. Gain the skills and confidence you need to become an official Google TensorFlow Developer and earn your certificate.</p>
									<p>Whether you’re starting from scratch or building on existing skills, this course provides the foundational and intermediate set of tools and techniques you need to become TensorFlow certified and build practical AI applications.</p>
									<p>First, cover deep learning theory in-depth and understand how artificial neural networks work at their core. Then learn how to solve more complex challenges related to computer vision, transfer learning, natural language processing, real-world time series, and more.</p>

									<div className="bullets-container">
										<p className="bullet-item"><IconCircleCheck />144 Tutorials</p>
										<p className="bullet-item"><IconCircleCheck />17 Hours of Video Content</p>
										<p className="bullet-item"><IconCircleCheck />Regularly Updated Sample Exam Questions</p>
										<p className="bullet-item"><IconCircleCheck />'Pass or we pay' guarantee</p>
									</div>
								</div>
							</div>
						</div>

						<div className="actions">
							<a className="button primary-dark" onClick={() => history.push("/courses/tensorflow-developer-professional-certificate")}>Go to Course</a>
						</div>
					</div>
				</div>

				<LazyImage src="/connection-pattern.svg" alt="Connection Pattern" classes="image-pattern connection-pattern"/>

				<LazyImage src="/landing/courses-bottom-pattern.svg" alt="Courses Bottom Pattern" classes="image-pattern bottom-pattern"/>
			</section>

			<HomepageTestimonials />

			<section className="section homepage-certified-banner">
				<LazyImage src="/landing/banner-top-pattern.svg" alt="Banner Top Pattern" classes="image-pattern top-pattern"/>

				<div className="main-wrapper">
					<h1>Your TensorFlow Developer Certificate is Waiting</h1>
					{!user && <button className="button primary-dark" onClick={(event) => toggleModal(event, true, "Signup")}>Get Started</button>}
				</div>

				<LazyImage src="/connection-pattern.svg" alt="Connection Pattern" classes="image-pattern connection-pattern"/>
			</section>

			<section className="section footer">
				<div className="main-wrapper">
					<p>&copy; Copyright 2020 — All rights reserved — TF Certification</p>
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

const SkillsContainer = () => {
	const [active, setActive] = useState("skill-1");

	const skills = [
		{
			_id: "skill-1",
			title: "Unlock Business Knowledge",
			description: "The TensorFlow Developer Professional Certificate Course tests your newfound skills across a range of business niches and develops the business acumen hiring managers demand."
		}, {
			_id: "skill-2",
			title: "Gain Industry Recognition",
			description: "Get the skills you need to obtain Google’s official TensorFlow Developer Certificate and prove your expertise in ML and AI in a rapidly growing global job market. This course provides you with the practical machine learning skills you need for the real world, and positions you to demonstrate your expertise to future employers!"
		}, {
			_id: "skill-3",
			title: "Join Google’s Certificate Network",
			description: "Prepare to pass the official TensorFlow Certification exam, join Google's TensorFlow Certificate Network and get noticed by the biggest players in AI."
		}, {
			_id: "skill-4",
			title: "Earn More",
			description: "TensorFlow experts earn up to $204,000 USD a year, with the average salary hovering around $148,000 per year. With a Google certificate on your resume and the ever-growing demand for TensorFlow skills, getting certified is a vital step toward becoming a top-paid TensorFlow expert."
		},
	];

	return (
		<section className="section homepage-skills">
			<div className="main-wrapper">
				<h1>Set Yourself Apart with TensorFlow Certification</h1>

				<div className="skills-container">
					<div className="left-content">
						<img src="/landing/skills-image.svg" alt="Skills Image"/>
					</div>
					<div className="right-content">
						{skills.map((skill) =>
							<div key={skill._id} className={`skill-item ${skill._id == active ? "active" : ""}`} onClick={() => setActive(skill._id)}>
								<div className="header">
									{active === skill._id ? <IconMinus /> : <IconPlus />}
									<p><strong>{skill.title}</strong></p>
								</div>

								{active === skill._id && <div className="description">
									<p>{skill.description}</p>
								</div>}
							</div>
						)}
					</div>
				</div>

				<LazyImage src="/tf-pattern.svg" alt="TF Pattern" classes="right-pattern hidden-xs"/>
			</div>
		</section>
	);
};

const HomepageTestimonials = () => {
	const testimonials = [
		{
			author: "Silvia Natalia",
			position: "Tanahoon founder",
			message: "Validate your data analysis and visualization skills at a professional level, and gain instant recognition from current and future employers.",
		}, {
			author: "Silvia Natalia",
			position: "Tanahoon founder",
			message: "Stand out from the crowded data science job market with the stamp of approval that hiring managers from leaders like Cisco, Amazon, Deloitte and more, are searching for."
		}, {
			author: "Silvia Natalia",
			position: "Tanahoon founder",
			message: "The average salary of a Tableau-certified BI Specialist can reach as high as $152,400—ranking it as one of the highest-paying certification categories in North America, according to Glassdoor data."
		}, {
			author: "Silvia Natalia",
			position: "Tanahoon founder",
			message: "Gain the professional data storytelling skills to impress in the C-suite, uncover deeper insights and drive results that make a difference to your business’ bottom line. Gain the professional data storytelling skills to impress in the C-suite, uncover deeper insights and drive results that make a difference to your business’ bottom line "
		}, {
			author: "Silvia Natalia",
			position: "Tanahoon founder",
			message: "Gain the professional data storytelling skills to impress in the C-suite, uncover deeper insights and drive results that make a difference to your business’ bottom line. Gain the professional data storytelling skills to impress in the C-suite, uncover deeper insights and drive results that make a difference to your business’ bottom line."
		}, {
			author: "Silvia Natalia",
			position: "Tanahoon founder",
			message: "Gain the professional data storytelling skills to impress in the C-suite, uncover deeper insights and drive results that make a difference to your business’ bottom line."
		}
	];

	const slides =  testimonials.map((testimonial, index) => (
		<Slide key={index}>
			<div className="testimonial-item">
				<span className="quote"><IconBlockquote /></span>
				<div className="description">
					<p>{testimonial.message}</p>

					<div className="author">
						<p><strong>{testimonial.author}</strong></p>
						<p>{testimonial.position}</p>
					</div>
				</div>
			</div>
		</Slide>
	));

	return (
		<section className="section homepage-testimonials">
			<div className="main-wrapper">
				<h1>Satisfied, Specialized & Certified</h1>

				<div className="slider-container testimonials-container">
					<SliderWrapper
						slides={slides}
						autoPlay={false}
						height={100}
						width={100}
						mobileSlides={1}
						desktopSlides={3}
					>
						<div className="slider-buttons">
							<ButtonBack className="button-left"><IconLongLeftArrow/></ButtonBack>
							<ButtonNext className="button-right"><IconLongRightArrow/></ButtonNext>
						</div>
					</SliderWrapper>
				</div>

				<LazyImage src="/tf-pattern.svg" alt="TF Pattern" classes="right-pattern hidden-xs"/>
			</div>
		</section>
	);
};
