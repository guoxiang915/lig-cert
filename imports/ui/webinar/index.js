import React, { useEffect, useRef, Fragment } from "react";
import { Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import { useHistory } from "react-router-dom";
import { useScript } from "/imports/ui/components/hooks/useScript";
import { SEO } from "/imports/ui/components/SEO";
import { LazyImage } from "/imports/ui/components/LazyImage";
import { SliderWrapper } from "/imports/ui/components/SliderWrapper";
import { IconAward, IconLinkedin, IconFacebook, IconTwitter, IconInstagram, IconYoutube, IconUdemy, IconWebsite, IconLongLeftArrow, IconLongRightArrow, IconBlockquote } from "/imports/ui/components/Icons";
import "/imports/ui/stylesheets/navbar.css";
import "/imports/ui/stylesheets/footer.css";
import "/imports/ui/webinar/styles.css";

export default Webinar = () => {
	const history = useHistory();
	const signupRef = useRef();

	useEffect(() => {
		window.prerenderReady = true;
		Intercom("boot", { app_id: "ort0cycf" });

		useScript("webinarjam", "https://event.webinarjam.com/register/x4r61sm/embed-button");

		return () => Intercom("shutdown");
	}, []);

	return (
		<Fragment>
			<SEO
				title='Get your TensorFlow skills to the next level'
				description='Consciusness engineering is a four part method to allow you to rapidly transform in all areas of your life - work, career, health, love, self-mastery. Once you learn this, you grow like youve never grown before.'
				path='webinar'
				contentType="website"
			/>

			<section className="section webinar-header">
				<div className="main-wrapper">
					<nav>
						<div className="logo-label">
							<img src="/logo.svg" alt="TF Certification Logo" onClick={() => history.push("/")} />
						</div>

						<ul className="actions hidden-xs">
							<div className="buttons">
								<li><button className="button primary-dark" onClick={() => signupRef.current.scrollIntoView({ behavior: "smooth" })}>Reserve My Spot</button></li>
							</div>
						</ul>
					</nav>

					<div className="webinar information-container">
						<h1>Get your TensorFlow skills to the next level</h1>
						<p>Consciusness engineering is a four part method to allow you to rapidly transform in all areas of your life - work, career, health, love, self-mastery. Once you learn this, you grow like you've never grown before.</p>

						<div className="signup-container" ref={signupRef}>
							<button type="button" data-webinarhash="x4r61sm" className="button">Reserve My Spot Now</button>

							<span>By clicking the button above, you are creating an account with tfcertification.com and agree to our <a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a> and <a href="/terms-conditions" target="_blank" rel="noopener">Terms & Conditions</a>, including receiving emails.</span>
						</div>
					</div>
				</div>

				<img src="/connection-pattern.svg" className="image-pattern connection-pattern" />
				<img src="/landing/header-bottom-pattern-gray.svg" className="image-pattern bottom-pattern" />
			</section>

			<section className="section webinar-learn">
				<div className="main-wrapper">
					<h1>What Will You Learn</h1>

					<div className="learn-container">
						<div className="learn-item">
							<LazyImage src="/landing/advantages-icon-1.svg" alt="Advantages Icon 1" />
							<div>
								<h5>Earn a Career Credential</h5>
								<p>Build the skills to get job-ready with our complete AWS Machine Learning Specialty exam guide</p>
							</div>
						</div>
						<div className="learn-item">
							<LazyImage src="/landing/advantages-icon-3.svg" alt="Advantages Icon 3" />
							<div>
								<h5>Earn a Career Credential</h5>
								<p>Build the skills to get job-ready with our complete AWS Machine Learning Specialty exam guide</p>
							</div>
						</div>
						<div className="learn-item">
							<LazyImage src="/landing/advantages-icon-3.svg" alt="Advantages Icon 3" />
							<div>
								<h5>Study with Hands-On Projects</h5>
								<p>Best-selling Udemy instructor Dr Ryan Ahmed delivers another powerful course that dives</p>
							</div>
						</div>
						<div className="learn-item">
							<LazyImage src="/landing/advantages-icon-3.svg" alt="Advantages Icon 3" />
							<div>
								<h5>Earn a Career Credential</h5>
								<p>Build the skills to get job-ready with our complete AWS Machine Learning Specialty exam guide</p>
							</div>
						</div>
						<div className="learn-item">
							<LazyImage src="/landing/advantages-icon-3.svg" alt="Advantages Icon 3" />
							<div>
								<h5>Study with Hands-On Projects</h5>
								<p>Best-selling Udemy instructor Dr Ryan Ahmed delivers another powerful course that dives</p>
							</div>
						</div>
						<div className="learn-item">
							<LazyImage src="/landing/advantages-icon-3.svg" alt="Advantages Icon 3" />
							<div>
								<h5>Earn a Career Credential</h5>
								<p>Build the skills to get job-ready with our complete AWS Machine Learning Specialty exam guide</p>
							</div>
						</div>
					</div>

					<LazyImage src="/tf-pattern.svg" alt="TF Pattern" classes="left-pattern hidden-xs"/>
				</div>

				<div className="actions">
					<button className="button primary-dark" onClick={() => signupRef.current.scrollIntoView({ behavior: "smooth" })}>Reserve My Spot</button>
				</div>

				<img src="/landing/advantages-bottom-pattern.svg" className="image-pattern bottom-pattern" />
			</section>

			<section className="section webinar webinar-audience" >
				<div className="main-wrapper">
					<h1>Who Should Attend This Webinar</h1>

					<div className="audience-container">
						<div className="audience-item">
							<LazyImage src="/landing/feature-icon.svg" alt="Features Icon" classes="image-desktop" />
							<img src="/landing/feature-icon-hover.svg" alt="Features Icon" className="image-hover" />
							<h5>Beginners</h5>
							<p>Learn  from the industry leaders <br /> 1,063,718 students <br /> 50,000 five-star reviews</p>
						</div>

						<div className="audience-item">
							<LazyImage src="/landing/feature-icon.svg" alt="Features Icon" classes="image-desktop" />
							<img src="/landing/feature-icon-hover.svg" alt="Features Icon" className="image-hover" />
							<h5>Advanced</h5>
							<p>Lifetime access to the course <br /> Receive 500+ slides of exclusive learning materials that stay with you forever</p>
						</div>

						<div className="audience-item">
							<LazyImage src="/landing/feature-icon.svg" alt="Features Icon" classes="image-desktop" />
							<img src="/landing/feature-icon-hover.svg" alt="Features Icon" className="image-hover" />
							<h5>Career Change</h5>
							<p>Receive 4-weeks intensive training <br /> Machine Learning <br /> Fundamentals Covered <br /> Available on Phones and TV</p>
						</div>

						<div className="audience-item">
							<LazyImage src="/landing/feature-icon.svg" alt="Features Icon" classes="image-desktop" />
							<img src="/landing/feature-icon-hover.svg" alt="Features Icon" className="image-hover" />
							<h5>Data Managers</h5>
							<p>15.5 hours on-demand video <br /> 24 articles <br /> 12 downloadable resources <br /> No prerequesites</p>
						</div>
					</div>

					<LazyImage src="/tf-pattern.svg" alt="TF Pattern" classes="right-pattern hidden-xs"/>
				</div>

				<div className="actions">
					<button className="button primary-dark" onClick={() => signupRef.current.scrollIntoView({ behavior: "smooth" })}>Reserve My Spot</button>
				</div>

				<img src="/landing/header-bottom-pattern-gray.svg" className="image-pattern bottom-pattern" />
			</section>

			<section className="section webinar-expertise">
				<div className="main-wrapper">
					<div className="instructor">
						<h1>Learn from an AI Expert</h1>
						<p className="subtitle">Hadelin de Ponteves, one of the world’s youngest leading providers of professional online education, top Udemy instructor, innovator in the global Data Science community, academic writer and High-Tech entrepreneur, guides you to the world of TensorFlow adventures.</p>

						<div className="instructor-container">
							<div className="left-content">
								<div className="image">
									<LazyImage src="/landing/hadelin-picture.jpg" alt="Hadelin Picture" />
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
									<button className="button primary-dark" onClick={() => signupRef.current.scrollIntoView({ behavior: "smooth" })}>Reserve My Spot</button>
								</div>
							</div>
						</div>

						<LazyImage src="/tf-pattern.svg" alt="TF Pattern" classes="right-pattern hidden-xs" />
					</div>
					<div className="insurance">
						<LazyImage src="/landing/insurance-pattern.svg" classes="image-pattern center-pattern" />
					</div>
				</div>

				<img src="/landing/advantages-bottom-pattern.svg" className="image-pattern bottom-pattern"/>
			</section>

			
			<Testimonials />

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

const Testimonials = () => {
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

	const slides = testimonials.map((testimonial, index) => (
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
		<section className="section webinar-testimonials">
			<div className="main-wrapper">
				<h1>Words From Satisfied Students</h1>

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
							<ButtonBack className="button-left"><IconLongLeftArrow /></ButtonBack>
							<ButtonNext className="button-right"><IconLongRightArrow /></ButtonNext>
						</div>
					</SliderWrapper>
				</div>
			</div>
		</section>
	);
};
