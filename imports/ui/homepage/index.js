import React, { useState, useEffect, useRef, Fragment } from "react";
import { Meteor } from "meteor/meteor";
import loadable from "@loadable/component";
import { useHistory } from "react-router-dom";
import { Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import { SEO } from "/imports/ui/components/SEO";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import { hasRights, _findWhere } from "/imports/ui/components/Functions";
import AuthModal from "/imports/ui/authentication/AuthModal";
import { Dropdown } from "/imports/ui/components/Dropdown";
import { VideoPlayer } from "/imports/ui/components/VideoPlayer";
import { LazyImage } from "/imports/ui/components/LazyImage";
import { Modal } from "/imports/ui/components/Modal";
import { IconPlus, IconMinus, IconAward, IconLinkedin, IconFacebook, IconTwitter, IconInstagram, IconYoutube, IconUdemy, IconWebsite, IconCircleCheck, IconInformation , IconLongLeftArrow, IconLongRightArrow, IconBlockquote } from "/imports/ui/components/Icons";
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
				description='Join the best training ground for AI mastery and gain the skills you need to become a TensorFlow Certified Developer.'
				contentType="website"
				path='/'
			/>

			<section className="section homepage-header">
				<div className="main-wrapper">
					<nav>
						<div className="logo-label">
							<img src="/logo.svg" alt="TF Certification Logo" onClick={() => history.push("/")} />
						</div>

						<ul className="actions hidden-xs">
							<li onClick={() => history.push("/blog")}><a>Blog</a></li>
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
							<VideoPlayer playerId="presentation" mediaId="npKzoDrm" />
						</div>
					</div>
				</div>

				<img src="/connection-pattern.svg" alt="Connection Pattern" className="image-pattern connection-pattern"/>
				<img src="/landing/header-bottom-pattern.svg" alt="Header Bottom Pattern" className="image-pattern bottom-pattern"/>
			</section>

			<SkillsContainer />

			<section className="section homepage-advantages" ref={advantagesRef}>
				<img src="/landing/advantages-top-pattern.svg" alt="Advantages Top Pattern" className="image-pattern top-pattern"/>

				<div className="main-wrapper">
					<div className="left-content">
						<h1>Open Doors with TensorFlow Certification</h1>
						<p>TensorFlow’s rapid rise in adoption and job growth listings aren't showing signs of slowing down. </p>
						<p>TensorFlow is here to stay, and certification sets you apart on the job market.  The TensorFlow Developer Professional Certificate course puts you on the fast track to certification.</p>
						{!user && <button className="button primary-dark" onClick={(event) => toggleAuthModal(event, true, "Signup")}>Get Started</button>}
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

				<img src="/landing/advantages-bottom-pattern.svg" alt="Advantages Bottom Pattern" className="image-pattern bottom-pattern"/>
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
									<a href="https://www.facebook.com/hadelin.ponteves" target="_blank" rel="noopener"><IconFacebook /></a>
									<a href="https://twitter.com/hadelin2p" target="_blank" rel="noopener"><IconTwitter /></a>
									<a href="https://www.instagram.com/hadelin2p/" target="_blank" rel="noopener"><IconInstagram /></a>
									<a href="https://www.youtube.com/channel/UCfatmRnNl-n6IwFkMhbBEVA" target="_blank" rel="noopener"><IconYoutube /></a>
									<a href="https://www.udemy.com/user/hadelin-de-ponteves" target="_blank" rel="noopener"><IconUdemy /></a>
									<a href="https://www.hadelindeponteves.com/" target="_blank" rel="noopener"><IconWebsite /></a>
								</div>

								<div className="hidden-xs">
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
				<img src="/landing/courses-top-pattern.svg" alt="Courses Top Pattern" className="image-pattern top-pattern"/>

				<div className="main-wrapper">
					<div className="features-container">
						<div className="feature-item">
							<LazyImage src="/landing/feature-icon.svg" alt="Features Icon" classes="image-desktop" />
							<img src="/landing/feature-icon-hover.svg" alt="Features Icon" className="image-hover"/>
							<h5>Lifetime Access</h5>
							<p>Receive lifetime access to all course content and additional learning materials for reference ahead of your exam or after certification.</p>
						</div>

						<div className="feature-item">
							<LazyImage src="/landing/feature-icon.svg" alt="Features Icon" classes="image-desktop" />
							<img src="/landing/feature-icon-hover.svg" alt="Features Icon" className="image-hover"/>
							<h5>Hands-On with A Certified Instructor</h5>
							<p>Follow along as AI Expert and TensorFlow-certified instructor Hadelin de Ponteves guides you step-by-step in building Deep Learning models in TensorFlow.</p>
						</div>

						<div className="feature-item">
							<LazyImage src="/landing/feature-icon.svg" alt="Features Icon" classes="image-desktop" />
							<img src="/landing/feature-icon-hover.svg" alt="Features Icon" className="image-hover"/>
							<h5>Start from Scratch</h5>
							<p>Cover Deep Learning theory and understand how artificial neural networks work. Master Computer Vision, Transfer Learning, Natural Language Processing, and more.</p>
						</div>
					</div>

					<div className="courses-container" ref={courseRef}>
						<h1>Your Certificate Is Waiting</h1>
						<CourseBlock history={history} />
					</div>
				</div>

				<div className="background-color-container">
					<LazyImage src="/connection-pattern.svg" alt="Connection Pattern" classes="image-pattern connection-pattern"/>
					<LazyImage src="/landing/courses-bottom-pattern.svg" alt="Courses Bottom Pattern" classes="image-pattern bottom-pattern"/>
				</div>

				<LazyImage src="/landing/advantages-bottom-pattern.svg" alt="Advantages Bottom Pattern" classes="image-pattern bottom-pattern"/>
			</section>

			<HomepageTestimonials />

			<section className="section homepage-certified-banner">
				<img src="/landing/banner-top-pattern.svg" alt="Banner Top Pattern" className="image-pattern top-pattern"/>

				<div className="main-wrapper">
					<h1>Your TensorFlow Developer Certificate is Waiting</h1>
					{!user && <button className="button primary-dark" onClick={(event) => toggleAuthModal(event, true, "Signup")}>Get Started</button>}
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
			image: "/landing/skills-image-pattern-1.svg",
			title: "Gain Industry Recognition",
			description: "Get the skills you need to obtain Google’s official TensorFlow Developer Certificate and prove your expertise in ML and AI in a rapidly growing global job market. This course provides you with the practical machine learning skills you need for the real world, and positions you to demonstrate your expertise to future employers!"
		}, {
			_id: "skill-2",
			image: "/landing/skills-image-pattern-2.svg",
			title: "Unlock Business Knowledge",
			description: "The TensorFlow Developer Professional Certificate Course tests your newfound skills across a range of business niches and develops the business acumen hiring managers demand."
		}, {
			_id: "skill-3",
			image: "/landing/skills-image-pattern-3.svg",
			title: "Join Google’s Certificate Network",
			description: "Prepare to pass the official TensorFlow Certification exam, join Google's TensorFlow Certificate Network and get noticed by the biggest players in AI."
		}, {
			_id: "skill-4",
			image: "/landing/skills-image-pattern-4.svg",
			title: "Earn More",
			description: "TensorFlow experts earn up to $204,000 USD a year, with the average salary hovering around $148,000 per year. With a Google certificate on your resume and the ever-growing demand for TensorFlow skills, getting certified is a vital step toward becoming a top-paid TensorFlow expert."
		},
	];

	const currentSkill = _findWhere(skills, active, "_id");

	return (
		<section className="section homepage-skills">
			<div className="main-wrapper">
				<h1>Set Yourself Apart with TensorFlow Certification</h1>

				<div className="skills-container">
					<div className="left-content">
						<div className="image-container">
							<img src={currentSkill.image} alt={`${currentSkill.title} - Skills Icon`} className="pattern"/>
							<img src="/landing/skills-image-background.svg" alt="Skills Image" className="background" />
						</div>
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

const CourseBlock = ({ history }) => {
	const [active, setActive] = useState("overview-1");
	const [showTermsModal, setShowTermsModal] = useState(false);
	const toggleTermsModal = () => setShowTermsModal(!showTermsModal);

	const overviews = [
		{
			_id: "overview-1",
			title: "Parts 1 to 3: Deep Learning",
			description: "We will start by studying Deep Learning in-depth so that you can understand how different types of neural networks work and learn. And while covering the Deep Learning theory, we will also build together three neural networks: Artificial Neural Network, Convolutional Neural Network and Recurrent Neural Network from scratch, step by step, and code every single line of code together."
		}, {
			_id: "overview-2",
			title: "Parts 4 to 10: Computer Vision",
			description: "Now you will be more independent with the course materials and dive deeper into them yourself having highly detailed written explanations. In this section, you will be introduced to Computer Vision and together we will code the first Computer Vision Neural Network. We will also dive deeper into convolutions, understand how to handle more complex and real-world images, get a solid understanding of image augmentation and the concept of transfer learning, as well as move from binary to multi-class classification."
		}, {
			_id: "overview-3",
			title: "Parts 11 to 13: JavaScript",
			description: "In this section, you will dig even deeper and learn and explore the diverse tools to become a global master in TensorFlow. You will be introduced to Computer Vision and Transfer Learning in JavaScript. We will learn how to reuse and convert the existing models to JavaScript, as well as understand and dive deep into the performance of the new models."
		}, {
			_id: "overview-4",
			title: "Parts 14 to 17: Natural Language Processing",
			description: "We will start by giving an introduction to NLP and then we will learn tokenization and sequences in detail. Further, we will be introduced to embeddings and explore recurrent models. We will understand how LSTMs are applied to NLP and then implement several LSTMs together. While learning NLP, we will also dive into text generation with RNNs and train RNNs by using inference."
		}, {
			_id: "overview-5",
			title: "Parts 18 to 21: Time Series Analysis",
			description: "This section is concentrated on theory and all the codes will be presented on the slides. You will be introduced to the Time Series and learn the specifics of sequences and prediction. We will dive deep into examples, common patterns and metrics for evaluating the performance of Time Series, cover the concepts of moving average and differencing, as well as understand how forecasting works. Furthermore, we will learn how Machine Learning is applied to Time Series and make predictions. We will have a conceptual overview of how RNNs are used with sequences and how to use convolutions for real-world Time Series."
		}, {
			_id: "overview-6",
			title: "Parts 22 to 25: TensorFlow Lite",
			description: "In this extra section, you will be introduced to TensorFlow Lite, specifically to its different features and components, including its architecture and performance. Then we will cover some optimization techniques in TensorFlow Lite and see the very important concept of quantization. Further, we will learn how to convert a model to TensorFlow Lite and understand how to do Transfer Learning with TensorFlow Lite. We will also dig deeper and learn how to implement TensorFlow Lite in Android and iOS, as well embedded systems like Raspberry Pi."
		}, {
			_id: "overview-7",
			title: "Exam 1 - 3: Real TensorFlow Certification Exam Solutions and Explanations",
			description: "In this section, you will be presented with a detailed overview of the real TensorFlow Developer Certificate exams to prepare you to pass the certification assessment. The detailed explanations will help you understand the certification exam expectations, as well as demonstrate the required practical Machine Learning skills through the building and training of models using TensorFlow. The content of this section will be updated in line with the formation of the new assessment exam questions developed by the TensorFlow team."
		}
	];

	return (
		<div className="course-block">
			<div className="presentation-container">
				<div className="left-content">
					<h1>TensorFlow Developer Professional Certificate Course</h1>
					<p>Dive into TensorFlow 2.0 and master the popular deep learning framework in this hands-on course. Gain the skills and confidence you need to become an official Google TensorFlow Developer and earn your certificate.</p>
					<p>Whether you’re starting from scratch or building on existing skills, this course provides the foundational and intermediate set of tools and techniques you need to become TensorFlow certified and build practical AI applications.</p>
					<p>First, cover deep learning theory in-depth and understand how artificial neural networks work at their core. Then learn how to solve more complex challenges related to computer vision, transfer learning, natural language processing, real-world time series, and more. </p>

					<div className="bullets-container">
						<div className="bullet-item">
							<IconCircleCheck />
							<p>144 Tutorials</p>
						</div>

						<div className="bullet-item">
							<IconCircleCheck />
							<p>17 Hours of Video Content</p>
						</div>

						<div className="bullet-item">
							<IconCircleCheck />
							<p>10 Practical Case Studies</p>
						</div>

						<div className="bullet-item action">
							<IconCircleCheck />
							<p onClick={toggleTermsModal}>Pass or We Pay Guarantee <span><IconInformation /></span></p>
							{showTermsModal && <TermsModal isOpen={showTermsModal} onClose={toggleTermsModal} />}
						</div>

						<div className="bullet-item">
							<IconCircleCheck />
							<p>Regularly Updated Sample Exam Questions</p>
						</div>
					</div>

					<div className="actions">
						<a className="button primary-dark primary-dark-hover" onClick={() => history.push("/courses/tensorflow-developer-professional-certificate")}>Go to Course</a>
						<a className="button border-primary-dark primary-dark-hover" href="/landing/course-curriculum.pdf" target="_blank" rel="noopener">Download Curriculum</a>
					</div>
				</div>

				<div className="right-content">
					<div className="sidebar-container">
						<div className="price-label">
							<h2>$199</h2>
						</div>

						<VideoPlayer playerId="homepage-course-tca" mediaId="AsuWhuwg" />
					</div>
				</div>
			</div>

			<div className="information-container">
				<div className="left-content">
					<h4>Who this course is for:</h4>
					<p>The course is targeted towards AI practitioners, aspiring data scientists, Tech enthusiasts, and consultants wanting to pass the TensorFlow Developer Certification. Here’s a list of who is this course for:</p>
					<ul>
						<li>Data Scientists who simply want to learn how to use TensorFlow at an advanced level.</li>
						<li>Data Scientists who want to pass the TensorFlow Developer Certification.</li>
						<li>AI Practitioners who want to build more powerful AI models using TensorFlow.</li>
						<li>Tech enthusiasts who are passionate about AI and want to gain real-world practical experience with TensorFlow.</li>
					</ul>

					<h4>Course Prerequisites:</h4>
					<p>Basic knowledge of programming is recommended. Some experience in Machine Learning is also preferable. However, these topics will be extensively covered during early course lectures; therefore, the course has no prerequisites, and is open to anyone with basic programming knowledge. Students who enrol in this course will master data science fundamentals and directly apply these skills to solve real world challenging business problems.</p>

					<div className="highlight-block">
						<p>Gmail account needed to the access course notebook through Google Colab. You can create your free <a href="https://drive.google.com/drive/folders/1Plf1Szl8kybr8W3n__64xZOkeUrlxRHS" target="_blank" rel="noopener">Google account here</a>.</p>
					</div>

					<div className="academic-program-header">
						<h2>Academic Program Overview</h2>
					</div>

					<div className="overview-container">
						{overviews.map((overview) =>
							<div key={overview._id} className={`overview-item ${overview._id == active ? "active" : ""}`} onClick={() => setActive(overview._id)}>
								<div className="header">
									{active === overview._id ? <IconMinus /> : <IconPlus />}
									<p><strong>{overview.title}</strong></p>
									<div className="connection-dot hidden-xs"></div>
								</div>

								{active === overview._id && (
									<div className="description">
										<p>{overview.description}</p>
									</div>
								)}

								<div className="connection-line hidden-xs"></div>
							</div>
						)}
					</div>
				</div>

				<div className="right-content">
					<div className="sidebar-container instructors">
						<div className="outline"></div>

						<div className="instructor-item">
							<LazyImage src="/landing/hadelin-picture.jpg" alt="Hadelin de Ponteves Picture"/>
							<div className="information">
								<p><strong>Hadelin de Ponteves</strong></p>
								<p>Host & Main Instructor</p>
							</div>
						</div>

						<div className="separation-container">
							<div className="text">
								<p>with the support of</p>
							</div>
							<div className="line"></div>
						</div>

						<div className="instructor-item">
							<LazyImage src="/landing/kirill-picture.jpg" alt="Kirill Eremenko Picture"/>
							<div className="information">
								<p><strong>Kirill Eremenko</strong></p>
								<p>Data Scientist</p>
							</div>
						</div>
						<div className="instructor-item">
							<LazyImage src="/landing/luka-picture.jpg" alt="Luka Anicin Picture"/>
							<div className="information">
								<p><strong>Luka Anicin</strong></p>
								<p>AI Expert</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const TermsModal = ({ isOpen, onClose }) => {
	return (
		<Modal classes="terms-modal" isOpen={isOpen} onClose={onClose}>
			<h4>Terms & Conditions of Exam Guarantee</h4>
			<p>Ligcert Ventures Pty Ltd, U.K provides the following guarantee for the TensorFlow Developer Professional Certificate Course:</p>
			<p>If you take your TensorFlow Developer Certificate exam within 30 days of enrolling and completing this course 100% and you sit the exam and receive a score above zero, but below the minimum score required to pass the exam, then Ligcert Ventures Pty Ltd, U.K will pay for your second exam attempt provided the following conditions are met: you paid at least $1 for this course and it was not refunded, AND before sitting the exam, you diligently watched and followed along with all of the tutorials in the course (completed all case studies and have all codes under your Google Colab account), AND you completed all practical activities including but not limited to challenges within the sections, quizzes, homework exercises and all provided practice exams.</p>
			<p>Ligcert Ventures Pty Ltd may request evidence of fulfilling the above conditions, thereby it's important that you save your work when taking the course and doing the practical assignments.</p>
		</Modal>
	);
};

const HomepageTestimonials = () => {
	const testimonials = [
		{
			author: "Priya Khanna",
			position: "AI Product Manager at Amazon Alexa, Boston",
			message: "Thank you for making amazing videos on Machine Learning and NLP that have helped me boost my career. I wanted you to know that your videos helped me crack my interviews at Amazon Alexa Machine Learning team where I just started to work as AI Product Manager.",
		}, {
			author: "Ali Abdel Aal ",
			position: "Artificial Intelligence Engineer at Toptal",
			message: "Thanks a lot Hadelin, I landed a job at Toptal as an Artificial Intelligence Engineer and your course was a big step to getting me into this."
		}, {
			author: "Calin Timbus",
			position: "Machine Learning Engineer at Porsche Engineering",
			message: "Thank you, the courses you provide are excellent. I wanted to tell you I got a job in AI/ML at Porsche Engineering. The springboard for ML and AI was your courses."
		}, {
			author: "Alok Kumar",
			position: "Data Analyst",
			message: "A big THANK YOU for everything I learnt from your online courses. I kinda owe my current job to you. Thank you for being there. God bless you."
		}, {
			author: "Diego Cue",
			position: "Data Scientist",
			message: "The teaching method is amazing. First it starts by explaining the concepts so that you intuitively understand what you’re about to do. I started his course because I needed it for my work, I ended learning far more. The skills transmitted in the courses help me perform tasks that I never imagined."
		}, {
			author: "Sai Siddartha Maram",
			position: "Computer Science Major",
			message: "After taking your ML, Computer Vision and Blockchain course I have come up with a product to prevent Rape which is a worldwide issue and we have stood the countrywide first place in a Hackathon."
		}, {
			author: "Filipe Diniz",
			position: "Tech Enthusiast",
			message: "The Blockchain course really opened my eyes to a new world of possibilities! I cannot wait to apply this technology to my real world problems in data-centric engineering. I recommend it to anyone who needs a comprehensive introduction to the power of Blockchain."
		}, {
			author: "Piyush Tamaskar",
			position: "Senior Developper at HSBC",
			message: "The course was designed so effectively that a person like me with no prior experience or background in Data science can now understand the concepts in no time. I have upgraded my skills in Machine Learning and that has boosted my career."
		}, {
			author: "Shashi Kant Prasad",
			position: "Senior Analyst",
			message: "The way the content is organized is really awesome. It covers everything we need to build a successful career in ML. I couldn’t stop myself to sit several hours to watch the tutorials and implement at my end. Thanks a ton to the instructors for creating such wonderful interactive sessions."
		}, {
			author: "Sagar Pande",
			position: "Graduate Researcher in Machine Learning",
			message: "Machine Learning A-Z is an amazing course. It covers most of the basics and provides a good start in the field of Machine Learning. Thank you for developing such an incredible course."
		}, {
			author: "Hasik Shetty",
			position: "Mechanical Engineer",
			message: "Hadelin’s courses helped me change my career from core mechanical to AI. His courses focus more on the intuition and hence make learning Machine Learning an easy job. His knowledge in this field is huge and I highly recommend his courses to anyone shifting their career into AI. Hats off to his content."
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
