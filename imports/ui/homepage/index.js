import React, { useState, Fragment } from "react";
import { Meteor } from "meteor/meteor";
import { useAccount } from "/imports/ui/components/hooks/useAccount";
import { hasRights } from "/imports/ui/components/Functions";
import AuthModal from "/imports/ui/authentication/AuthModal";
import { VideoPlayer } from "/imports/ui/components/VideoPlayer";
import { LazyImage } from "/imports/ui/components/LazyImage";
import { IconPlus, IconMinus, IconAward, IconLinkedin, IconUdemy } from "/imports/ui/components/Icons";
import "/imports/ui/stylesheets/navbar.css";
import "/imports/ui/homepage/styles.css";

export default Homepage = () => {
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [authComponent, setAuthComponent] = useState("");

	const { user } = useAccount();

	const toggleAuthModal = (event, activeModal, component) => {
		event.preventDefault();
		if (component) setAuthComponent(component);
		setShowAuthModal(activeModal);
	};

	return (
		<Fragment>
			<section className="section homepage-header">
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

					<div className="information-container">
						<div className="left-content">
							<h1>Get TensorFlow <br/> Certified Now</h1>
							<p>Today, no platform dominates the BI and analytics space like market leader Tableau. Passing the official. Gain the industry-wide recognition.</p>
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

			<section className="section homepage-advantages">
				<LazyImage src="/landing/advantages-top-pattern.svg" alt="Advantages Top Pattern" classes="image-pattern top-pattern"/>

				<div className="main-wrapper">
					<div className="left-content">
						<h1>Open Doors with Tableau Certification</h1>
						<p>Today, no platform <strong>dominates the BI and analytics</strong> space like market leader Tableau. Becoming Tableau Certified is your chance to get noticed by leaders like Amazon, Cisco, Deloitte and more.</p>
						<a className="button primary-dark" onClick={(event) => toggleAuthModal(event, true, "Signup")}>Get Started</a>
					</div>

					<div className="right-content">
						<div className="column">
							<div className="advantage-item">
								<LazyImage src="/landing/advantages-icon-1.svg" alt="Advantages Icon 1"/>
								<h5>The Right Skills</h5>
								<p>Learn the right skills that will be tested according to the official list of measured skills for each exam</p>
							</div>

							<div className="advantage-item">
								<LazyImage src="/landing/advantages-icon-2.svg" alt="Advantages Icon 2"/>
								<h5>Test Yourself</h5>
								<p>Prepare with two complete practice tests that simulate official certification exam questions</p>
							</div>
						</div>

						<div className="column">
							<div className="advantage-item">
								<LazyImage src="/landing/advantages-icon-3.svg" alt="Advantages Icon 3"/>
								<h5>Our Guarantee</h5>
								<p>Gain peace of mind with our ‘Pass or We Pay' for your 2nd exam attempt guarantee* if you don’t pass on your first try</p>
							</div>

							<div className="advantage-item">
								<LazyImage src="/landing/advantages-icon-4.svg" alt="Advantages Icon 4"/>
								<h5>Learn from an Expert</h5>
								<p>Enroll with SuperDataScience CEO and best-selling Udemy instructor, Kirill Eremenko</p>
							</div>
						</div>
					</div>

					<LazyImage src="/tf-pattern.svg" alt="TF Pattern" classes="left-pattern hidden-xs"/>
				</div>

				<LazyImage src="/landing/advantages-bottom-pattern.svg" alt="Advantages Bottom Pattern" classes="image-pattern bottom-pattern"/>
			</section>

			<section className="section homepage-expertise">
				<div className="main-wrapper">
					<div className="instructor">
						<h1>Learn from an Industry Leader</h1>
						<p className="subtitle">Kirill Eremenko, a leader in the Udemy learning marketplace, and innovator in the global Data Science community, guides you to Tableau mastery.</p>

						<div className="instructor-container">
							<div className="left-content">
								<div className="image">
									<LazyImage src="/landing/kirill-picture.jpg" alt="Kirill Picture"/>
								</div>

								<div className="stats-item">
									<IconAward />
									<div className="description">
										<p><strong>Most Popular</strong></p>
										<p>Tableau Courses Online</p>
									</div>
								</div>

								<div className="stats-item">
									<IconAward />
									<div className="description">
										<p><strong>1.5M</strong></p>
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
								<h1>Meet Kirill Eremenko</h1>
								<p>As an ex-Deloitte Data Science consultant with a degree in applied Physics and Mathematics, Kirill has worked across a broad range of industries, including retail, finance, mining and energy.</p>
								<p>Kirill has taught over 1,000,000+ students online, and contributed to over 80 data science courses and thrives on delivering expert and practical Data Science learning that’s ready to take on the demands of the business world.</p>
								<div className="links">
									<a href="https://www.linkedin.com/in/keremenko" target="_blank" rel="noopener"><IconLinkedin /></a>
									<a href="https://www.udemy.com/user/kirilleremenko" target="_blank" rel="noopener"><IconUdemy /></a>
								</div>

								<div>
									{!user && <button className="button primary-dark" onClick={(event) => toggleAuthModal(event, true, "Signup")}>Get Started</button>}
									<a href="mailto: support@superdatascience.com" target="_blank" rel="noopener">Contact us for more details</a>
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
		</Fragment>
	);
};

const SkillsContainer = () => {
	const [active, setActive] = useState("skill-1");

	const skills = [
		{
			_id: "skill-1",
			title: "Get Tensor Flow Certified",
			description: "Validate your data analysis and visualization skills at a professional level, and gain instant recognition from current and future employers."
		}, {
			_id: "skill-2",
			title: "Learn How to Communicate Data",
			description: "Stand out from the crowded data science job market with the stamp of approval that hiring managers from leaders like Cisco, Amazon, Deloitte and more, are searching for."
		}, {
			_id: "skill-3",
			title: "Unlock Your Business Potential",
			description: "The average salary of a Tableau-certified BI Specialist can reach as high as $152,400—ranking it as one of the highest-paying certification categories in North America, according to Glassdoor data."
		}, {
			_id: "skill-4",
			title: "Earn More",
			description: "Gain the professional data storytelling skills to impress in the C-suite, uncover deeper insights and drive results that make a difference to your business’ bottom line."
		},
	];

	return (
		<section className="section homepage-skills">
			<div className="main-wrapper">
				<h1>Grow Your Skills &amp; Advance Your Career</h1>

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
