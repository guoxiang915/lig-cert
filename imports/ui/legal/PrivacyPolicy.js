import React, { useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { SEO } from "/imports/ui/components/SEO";
import "/imports/ui/stylesheets/navbar.css";
import "/imports/ui/stylesheets/footer.css";
import "/imports/ui/legal/styles.css";

export default PrivacyPolicy = () => {
	const history = useHistory();

	useEffect(() => { window.prerenderReady = true; }, []);

	return (
		<Fragment>
			<SEO
				title="Privacy Policy"
				description="This Privacy Policy explains our data processing practices and your options regarding the ways in which your personal data is used."
				path="privacy-policy"
				contentType="website"
			/>

			<section className="section legal-header">
				<div className="main-wrapper">
					<nav>
						<div className="logo-label">
							<img src="/logo.svg" alt="TF Certification Logo" onClick={() => history.push("/")} />
						</div>

						<ul className="actions hidden-xs">
							<li onClick={() => history.push("/")}><a>Home</a></li>
							<li onClick={() => history.push("/blog")}><a>Blog</a></li>
						</ul>
					</nav>

					<div className="information">
						<h1>Privacy Policy (AU)</h1>
						<p>This Privacy Policy was last modified on May 22nd, 2018. If you have objections to the Privacy Policy, you should immediately discontinue use of the Website and Learning Platform offered by us.</p>
					</div>
				</div>

				<img src="/connection-pattern.svg" alt="Connection Pattern" className="image-pattern connection-pattern"/>
				<img src="/landing/courses-bottom-pattern.svg" alt="Header Bottom Pattern" className="image-pattern bottom-pattern"/>
			</section>

			<section className="section legal-content">
				<div className="main-wrapper">
					<p>We at SuperDataScience are committed to protecting your privacy. This Privacy Policy explains our data processing practices and your options regarding the ways in which your personal data is used and is provided by SuperDataScience to third parties among other key issues related to protecting our Users’ privacy. Specifically, this Privacy Policy has been established to provide our Users a transparent understanding of how we handle our Users’ personal information, and provides, among other key details:</p>
					<ul>
						<li>The type of personal information we collect and hold;</li>
						<li>How we collect and hold personal information;</li>
						<li>The purposes for which we collect, hold, use and disclose personal information;</li>
						<li>How an individual may access personal information about the individual that we hold and how to seek the correction of such information;</li>
						<li>How an individual may complain about a breach of the Australian Privacy Principles and how we will deal with such a complaint;</li>
						<li>Whether we are likely to disclose personal information to overseas recipients; and,</li>
						<li>if so, the countries in which such recipients are likely to be located if it is practicable to specify those countries in the policy.</li>
					</ul>
					<p>We provide this Privacy Policy free of charge to all Users and in an appropriate, electronic form. If you have requests concerning your personal information or would like a copy of this Privacy Policy for your own records, please contact us at support@superdatascience.com.</p>

					<h5>1. Definitions</h5>
					<p>References to <strong>"APPs"</strong> means the Australian Privacy Principles which apply to APP Entities under the Privacy Act.</p>
					<p>References to <strong>"APP Entities"</strong> means the entities so described in the Privacy Act.</p>
					<p>References to <strong>"Data Protection Laws"</strong> means the Privacy Act; and EU Data Protection Directive 95/46/EC and the Directive on Privacy of Electronic Communications 2002/58/EC and any national data protection or data privacy laws or regulations enacted under them which may be applicable to the provision of the Services under this Agreement (including without limitation the Data Protection Act 1998 and the Privacy and Electronic Communications (EC Directive) Regulations 2003) or, with effect from May 25, 2018, the EU General Data Protection Regulation (Regulation 2016/670) (the <strong>"GDPR"</strong>) and any law or regulation from time to time that replaces, modifies, implements or applies any of them.</p>
					<p>References to <strong>"Data Controller"</strong> has the meaning given to that term in the Data Protection Laws, and includes the term "controller" as defined in the GDPR.</p>
					<p>References to <strong>"Data Processor"</strong> has the meaning given to that term in the Data Protection Laws, and includes the term "controller" as defined in the GDPR.</p>
					<p>References to <strong>"Data Subject"</strong> means the identified or identifiable person to whom the Personal Information relates.</p>
					<p>References to the <strong>"Learning Platform"</strong> mean the educational platform related to data science and available through the Web site.</p>
					<p>References to a <strong>"Member"</strong> mean those registered Users of our Learning Platform.</p>
					<p>References to <strong>"Notifiable Data Breach"</strong> means a data breach in respect of Personal Information which is notifiable to the Office of the Australian Information Commissioner under the Privacy Act, where a data breach is likely to result in serious harm to any individuals whose Personal Information is involved in the breach.</p>
					<p>References to <strong>"Personal Information"</strong> or <strong>"Personal Data"</strong> means information or an opinion, whether true or not, and whether recorded in a material form or not about an identified individual, or an individual who is reasonably identifiable, and which may include your full name, address, credit/debit card number and billing address, user name and password, and email.</p>
					<p>References to the <strong>"Privacy Act"</strong> means the Australian Privacy Act 1988 (Cwth) and laws or regulations enacted under it with respect to the collection and use of Personal Information, and any law or regulation from time to time that replaces it.</p>
					<p>References to this <strong>"Policy"</strong> mean this Privacy Policy as set forth herein.</p>
					<p>References to <strong>"us," "we," "our,"</strong> and/or <strong>"SuperDataScience,"</strong> mean SuperDataScience Pty Ltd, and its parents, subsidiaries, and assigns.</p>
					<p>References to the <strong>"Website"</strong> mean the Web site bearing the URL www.superdatascience.com.</p>

					<p>References to <strong>"Sensitive Information"</strong> has the meaning contained in the Privacy Act, which includes information in respect of:</p>
					<ul>
						<li>health (including predictive genetic information)</li>
						<li>racial or ethnic origin</li>
						<li>political opinions</li>
						<li>membership of a political association, professional or trade association or trade union</li>
						<li>religious beliefs or affiliations</li>
						<li>philosophical beliefs</li>
						<li>sexual orientation or practices</li>
						<li>criminal record</li>
						<li>biometric information that is to be used for certain purposes</li>
						<li>biometric templates.</li>
					</ul>
					<p>References to <strong>"you,"</strong> and/or <strong>"User"</strong> mean a general user of the Website and/or the Learning Platform, whether as a registered member, email list subscriber, subscriber to our private Facebook group, or general Web site user.</p>

					<h5>2. Compliance and Agreement to be Bound</h5>
					<p>The following Privacy Policy governs SuperDataScience’s collection and use of its Users’ private information. By accessing the Website or the Learning Platform you represent that you have read and understood the Privacy Policy and that you agree to be bound by thereby.</p>
					<p>This Privacy Policy may be additionally subject to our Website Terms and Conditions and any other agreement entered into between us. This Privacy Policy is provided pursuant to the APPs described in the Privacy Act.</p>
					<p>The parties acknowledge that in relation to the processing of Personal Information or Personal Data in connection with the provision of the Services under this Agreement, you shall be the Data Controller for the purposes of the Data Protection Laws and SuperDataScience the Data Processor.</p>
					<p>We and you will both comply with our obligations under the Data Protection Laws, including the Privacy Act, and to the extent each is an APP Entity, comply with the Notifiable Data Breach provisions in the event of a data breach affecting Personal Information of the other party. SuperDataScience shall, unless prevented by law, promptly inform you upon receiving any notice or communication from any Data Subject, supervisory or government body, including the United Kingdom Information Commissioner’s Office, or any other regulatory authority under GDPR which relates to the processing of Personal Information or Personal Data under this Privacy Policy.</p>
					<p>SuperDataScience warrants that it shall implement and maintain appropriate administrative, technical, physical and organizational measures to protect Personal Information against personal data breaches, and any applicable Notifiable Data Breach, having regard to the state of technological development and the cost of implementing such measures, to ensure a level of security appropriate to:</p>
					<ul>
						<li>the nature, scope, context and purposes of processing of Personal Information required under this Privacy Policy; and</li>
						<li>the likelihood and severity of harm to the interests of Data Subjects that may be expected to result from any such personal data breach and any applicable Notifiable Data Breach.</li>
					</ul>
					<p>SuperDataScience shall, at your expense and taking into account the nature of the processing, assist you by providing appropriate technical and organizational measures, insofar as this is possible, in the fulfilment of your obligations under Data Protection Laws and in particular to respond to requests for exercising the rights of Data Subjects, and any applicable Notifiable Data Breach. In the event of a claim, each party will pay all fines for which it is liable as imposed by a regulatory authority.</p>
					<p>You agree to furnish us without demand, with any privacy policy which you may have in effect from time to time.</p>

					<h5>3. Modifications and Changes to Privacy Policy</h5>
					<p>We may modify, add to, suspend or delete the Privacy Policy, in whole or in part, at our sole discretion at any time, with such modifications, additions or deletions being effective thirty (30) days following their posting to the Website and emailing of a notice to our registered Members. Your continued use and/or access of the Website or Learning Platform after modification, addition or deletion of the Privacy Policy shall be deemed to constitute acceptance by you of the modification, addition or deletion.</p>

					<h5>4. No Collection of Sensitive Information</h5>
					<p>We do not collect any Sensitive Information. We ask that no User reveal such information in an Interactive Area as defined in our Website Terms and Conditions.</p>

					<h5>5. The Information We Collect</h5>
					<p>We collect both Personal Information and information which does not constitute Personal Information from our Users by lawful and fair means within the requirements of the legislation.</p>
					<p>We only collect such Personal Information as is reasonably necessary for one or more of our functions or activities. In the event such Personal Information is provided by someone other than the User whom it identifies, we will notify the User as is reasonable in the circumstances and otherwise ensure that the User is aware of any such matters. For legal and practical reasons, SuperDataScience may not be able to provide its services or access to the Learning Platform without the provision of such Personal Information by our Users to us.</p>
					<p>We also collect information which does not constitute Personal Information , such as your IP address, browser/software used to access the Website or the Learning Platform, the Web sites you visit before/after visiting the Website or Learning Platform, type of device used to access the Website or the Learning Platform, and the date and time of your visit to the Website or Learning Platform.</p>

					<h5>6. Unsolicited Personal Information</h5>
					<p>In the event unsolicited Personal Information regarding a User is provided to or otherwise received by us and where the same was not solicited by us or otherwise not information we may have solicited under this Privacy Policy or is not contained in a public record, we will destroy any such information as soon as reasonably possible, but only if it is lawful and reasonable to do so, or otherwise deo-identify such information as per APP 4.</p>

					<h5>7. Anonymity and Pseudonymity</h5>
					<p>Given the nature of the services provided by SuperDataScience and our obligations under the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 it is impracticable for our Members to remain unidentified or use pseudonyms as detailed in APP 2.1. General enquiries about products and services can be handled anonymously if requested, however failure to provide the personal information required may mean that we cannot provide the services requested or we may be forced to withdraw our services.</p>

					<h5>8. Use of Your Information</h5>
					<p>We may use your Personal Information only for the particular purpose for which it was collected and will not use the information for a secondary purpose unless the User has consented to the use or disclosure of the information or as set forth more fully in Section 11. Specifically, we may use your Personal Information to personalize your User experience; to improve customer service: to process transactions; to administer a contest, promotion, survey or other feature; to contact registered Users via email in order to send them information and updates pertaining to their orders or subscriptions; to respond to inquiries, to send company news, updates and other related information; and to comply with regulatory or legal requirements.</p>

					<h5>9. Direct Marketing & Newsletters, How to Opt-Out</h5>
					<p>If we receive or otherwise hold Personal Information about an individual, we will not use or disclose the information for the purpose of direct marketing as per the rules and regulations of APP 7.1.</p>
					<p>Notwithstanding the forgoing, Users who provide us their email addresses are automatically added to our newsletter and other mailings. Members who register for our services, if they have not opted-in to our newsletter prior to the time of registration, are automatically added. All Users may opt out to receiving marketing information and our newsletter via the unsubscribe link contained at the bottom of certain emails or by emailing us as support@superdatascience.com. Users should note that opting-out does not prevent us from contacting you regarding your account or any transactions.</p>
					<p>Email marketing campaigns published by us may contain tracking facilities within the actual email. Subscriber activity is tracked and stored in a database for future analysis and evaluation. Such tracked activity may include but shall not be limited to: the opening of emails, forwarding of emails, the clicking of links within the email content, times, dates and frequency of activity.</p>
					<p>This information is used to refine future email campaigns and supply the User with more relevant content based around their activity.</p>
					<p>This principle does not apply to the extent that a solicitation act preempts the APP regulations, including but not limited to the Do Not Call Register Act 2006, the Spam Act 2003; or any other Act of the Commonwealth, or a Norfolk Island enactment, prescribed by the regulations or any other federal, state, provincial or local rule or regulation which may apply, including but not limited to the U.S. CAN-SPAM Act of 2003, the E.U. Directive on Privacy and Electronic Communications, and the U.K. Privacy and Electronic Communications (EC Directive) Regulations of 2003.</p>

					<h5>10. Do Not Track (DNT) Disclosure</h5>
					<p>Please note that while you may have the opportunity to opt-out of targeted advertising as discussed in the “How to Opt-Out” section above, and you may be able to control the use of cookies through your Web browser as described in the “Use of Cookies” section below, some Web browsers may also give you the ability to enable a “do not track” setting. This setting sends a special signal to the Web sites you encounter while Web browsing. This “do not track” signal is different from disabling certain forms of tracking by declining cookies in your browser settings, as browsers with the “do not track” setting enabled still have the ability to accept cookies. We do not respond to Web browser “do not track” signals at this time. If we do so in the future, we will describe how we do so in this Privacy Policy. For more information about “do not track,” visit <a href="www.allaboutdnt.org" target="_blank" rel="noopener">www.allaboutdnt.org</a>.</p>

					<h5>11. Disclosures of your Information</h5>
					<p>Your Personal Information may be used by us for the purposes provided for in this Privacy Policy or as consented to by you. We may disclose your Personal Information to the extent you would reasonably expect us to use or disclose the information for the purpose of providing our services, the Web site and/or the Learning Platform to you; if the use or disclosure of the information is required or authorized by or under the law or a court/tribunal order; if a permitted general situation exists in relation to the use or disclosure of the information; if we reasonably believe that the use or disclosure of the information is reasonably necessary for one or more enforcement related activities conducted by, or on behalf of, an enforcement body.</p>
					<p>We may also disclose your Personal Information to external parties who provide services to SuperDataScience including (but not limited to): our payment processor in order to facilitate transactions; organizations that assist us with fund registry, archival, research, mail and delivery, auditing, recruitment, payroll, superannuation, insurance, management consulting, financial and legal advisory, banking, security and technology services in their capacity as service providers to SuperDataScience; or if we, or our assets, are acquired by a third party, in which case personal data held on the Web site will be part of the transferred assets.</p>
					<p>By accessing the Website or otherwise utilizing the Learning Platform, you consent to your Personal Information being shared with such third-parties and are encouraged to review the privacy policies of such third-parties as they may differ from the SuperDataScience Privacy Policy.</p>

					<h5>12. Legal Disclaimer</h5>
					<p>In addition to the forgoing disclosures contained in Section 11, we reserve the right to disclose your Personal Information as required by law and when believe it is necessary to share information in order to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person, violations of our terms or policies or another agreement into which we have entered with you, or as otherwise required by law. If a disclosure is made pursuant to this Section, we will provide the affected User written notice of the use or disclosure.</p>

					<h5>13. Related Bodies Corporate</h5>
					<p>In the event SuperDataScience is or becomes a body corporate and collects Personal Information from a related body corporate, we may disclose Personal Information to a related body corporate for the primary purpose for which the related body corporate collected the information. This principle shall not apply to the use or disclosure by us of Personal Information for the purpose of direct marketing or government related identifiers.</p>

					<h5>14. Other Web Sites</h5>
					<p>Our Website and Learning Platform may contain links to other Web sites or software, which are outside our control and are not covered by this Privacy Policy. If you access other Web sites and/or software using the links provided, the operators of these Web sites and/or software may collect information from you, which will be used by them in accordance with their own privacy protection procedures, which may differ from ours.</p>

					<h5>15. Cookies & Activity Tracking</h5>
					<p>To enhance your online experience, we may use “cookies” or similar technologies, such as Web beacons, activity tracking, app performance tracking, UTM codes, and personalized advertising. Cookies are text files placed in your computer's browser to store your preferences. Cookies do not contain Personal Information; however, once you choose to furnish a Web site or mobile software application with Personal Information, this information may be linked to the data stored in the cookie.</p>
					<p>We use cookies to understand Web site, Learning Platform and Internet usage and to improve or customize the content, offerings or advertisements on our Web site and Learning Platform. For example, we may use cookies to enable us to detect and report security issues affecting our Web site and Users; personalize your experience at our Website or Learning Platform (e.g., to recognize you by name when you return); save your password in password-protected areas; and enable you to use shopping carts on our site (if available.) We also may use cookies to help us offer you products, programs, or services that may be of interest to you and to deliver relevant advertising.</p>
					<p>We, our third party service providers, advertisers or our partners also may use cookies to manage and measure the performance of advertisements displayed on or delivered by us and/or other networks or sites. This also helps us, our service providers and partners provide more relevant advertising.</p>
					<p>We, our third party service providers, advertisers and/or our partners may also use “Web beacons,” activity trackers, or clear .gifs,  or similar technologies, which are small pieces of code placed on a Web page, to monitor the behavior and collect data about the visitors viewing a Web page. For example, web beacons may be used to count the users who visit a Web page or to deliver a cookie to the browser of a visitor viewing that page.</p>
					<p>You can change your privacy preferences regarding the use of cookies and similar technologies through your browser. You may set your browser to accept all cookies, block certain cookies, require your consent before a cookie is placed in your browser, or block all cookies. Blocking all cookies will affect your online experience and may prevent you from enjoying the full features offered by us. Please consult the “Help” section of your browser for more information or follow the links below.</p>
					<ul>
						<li>Internet Explorer <a href="http://support.microsoft.com/kb/278835" target="_blank" rel="noopener">http://support.microsoft.com/kb/278835</a> (or <a href="http://www.microsoft.com/windowsphone/en-us/howto/wp7/web/changing-privacy-and-other-browser-settings.aspx" target="_blank" rel="noopener">http://www.microsoft.com/windowsphone/en-us/howto/wp7/web/changing-privacy-and-other-browser-settings.aspx</a> for mobile versions)</li>
						<li>Chrome: <a href="http://support.google.com/chrome/bin/answer.py?hl=en-GB&answer=95647" target="_blank" rel="noopener">http://support.google.com/chrome/bin/answer.py?hl=en-GB&answer=95647</a></li>
						<li>Safari: <a href="http://docs.info.apple.com/article.html?path=Safari/5.0/en/9277.html" target="_blank" rel="noopener">http://docs.info.apple.com/article.html?path=Safari/5.0/en/9277.html</a> (or <a href="http://support.apple.com/kb/HT1677" target="_blank" rel="noopener">http://support.apple.com/kb/HT1677</a> for mobile versions)</li>
						<li>Firefox: <a href="http://support.mozilla.org/en-US/kb/ Enabling%20and%20disabling%20cookies" target="_blank" rel="noopener">http://support.mozilla.org/en-US/kb/ Enabling%20and%20disabling%20cookies</a></li>
						<li>Blackberries: <a href="http://docs.blackberry.com/en/smartphone_users/deliverables/ 32004/Turn_off_cookies_in_the_browser_60_1072866_11.jsp" target="_blank" rel="noopener">http://docs.blackberry.com/en/smartphone_users/deliverables/ 32004/Turn_off_cookies_in_the_browser_60_1072866_11.jsp</a></li>
						<li>Android: <a href="http://support.google.com/mobile/bin/answer.py?hl=en&answer=169022" target="_blank" rel="noopener">http://support.google.com/mobile/bin/answer.py?hl=en&answer=169022</a></li>
						<li>Opera: <a href="http://www.opera.com/browser/tutorials/security/privacy/" target="_blank" rel="noopener">http://www.opera.com/browser/tutorials/security/privacy/</a></li>
					</ul>

					<h5>16. Access to Your Information</h5>
					<p>If you access the Web site or Learning Platform and volunteer Personal Information, you may request access to your Personal Information by sending us an email at support@superdatascience.com. We will endeavor to respond in writing to such requests as is reasonable under the circumstances and within thirty (30) calendar days and give access to the information in the manner requested by the individual, if it is reasonable and practicable to do so. In certain circumstances, we may not be required by law to provide you with access to your Personal Information as well as circumstances where giving access would pose serious threat to life, health or safety of any individual or public, where the request is frivolous or vexatious, where giving access would be unlawful or where denying access is required by law. If access is denied, then we will give you written reasons for that decision and details available to complain about the refusal. An access fee may be charged where permitted by law.</p>

					<h5>17. Access to Your Information and Right to Audit</h5>
					<p>If you access the Web site or Learning Platform and volunteer Personal Information, you may request modification of your Personal Information by sending us an email at support@superdatascience.com. We will endeavor to respond in writing to such requests as is reasonable under the circumstances and within thirty (30) calendar days and make such modification to the information in the manner requested by the individual, if it is reasonable and practicable to do so. If we refuse or are unable to correct the Personal Information as requested we will give a written notice that sets out the reasons for the refusal (except to the extent that it would be unreasonable to do so) and the mechanisms available to complain about the refusal. You should be aware that it is not always possible to completely remove or modify information in our databases.</p>
					<p>In order to monitor compliance with this Privacy Policy and subject to this Privacy Policy, SuperDataScience shall:</p>
					<ul>
						<li>allow its data processing facilities, procedures and documentation which relate to the processing of Personal Data to be inspected (on reasonable written notice) by you and/or your auditors; and</li>
						<li>Any such inspection or where applicable, shall be on the strict condition that you or your auditor is not a competitor ours, and that you or your auditor representatives sign a non-disclosure agreement in a form specified by us, and agree to comply with all applicable policies put in place by us to ensure the security of processing.</li>
					</ul>
					<p>You shall reimburse us for the time expended during any such audit. Before the commencement of any such audit, we shall mutually agree upon the scope, timing and duration of the audit in addition to the reimbursement rate for which you shall be solely responsible.</p>

					<h5>18. Privacy Protection for Children Using the Internet</h5>
					<p>Protecting children's privacy is important to us. For that reason, we do not collect or maintain information of those persons we actually know are under the age of thirteen (13) nor is any part of the Web site or the Learning Platform targeted to attract anyone under the age of thirteen (13). We request that all users of the Web site and the Learning Platform who are under the age of thirteen (13) not disclose or provide any Personal Information. If we discover that a child under thirteen (13) has provided us with Personal Information, we will delete that child's Personal Information from our records.</p>

					<h5>19. Notice to Minors</h5>
					<p>In addition to protecting the privacy of children under age (13) we are committed to protect the privacy of minors. Though neither the Web site nor the Learning Platform is not targeted to minors nor is it intended to be used by minors, if, for any reason a minor has shared Personal Information via our Web site or Learning Platform said minor may request and obtain removal of such information by contacting us at support@superdatascience.com. Although we offer deletion capability for our Web site and Learning Platform, you should be aware that the removal of content may not ensure complete or comprehensive removal of that content or information posted through the Web site.</p>

					<h5>20. Quality of Personal Information</h5>
					<p>We take reasonable steps in the circumstances to ensure that the Personal Information that we collect is accurate, up-to-date and complete. We also take reasonable steps in the circumstances to ensure that the Personal Information we use or disclose is, having regard to the purpose of the use or disclosure, accurate, up-to-date, complete and relevant.</p>

					<h5>21. Data Security</h5>
					<p>We take reasonable steps to maintain the security of the Personal Information that we collect against misuse, interference and loss as well as unauthorized access, modification and disclosure, including utilizing SSL technologies and management-only access; however, no data transmission over the Internet can be guaranteed to be completely secure. Thus, we cannot ensure or warrant the security of any information that you transmit to us, so you do so at your own risk. Please note that non-encrypted communication using email is not secure. Thus, we cannot guarantee data security in email communication and, therefore, recommend using physical mail for confidential information.</p>
					<p>In the event we hold Personal Information that we no longer need for any purpose for which the information may be used or disclosed by us pursuant to this Privacy Policy; the information is not contained in a public record; and we are not required by or under an Australian Federal or state law, or a court/tribunal order, to retain the information we will take such steps as are reasonable in the circumstances to destroy the information or to ensure that the information is de-identified.</p>
					<p>We shall ensure that only such of our employees and contractors who may be required by it to assist it in meeting its obligations under this Privacy Policy shall have access to Personal Information.</p>
					<p>We shall promptly notify you of any actual or suspected personal data breach, and any Notifiable Data Breach having regard to the likelihood and severity of harm to the interests of you or the Data Subject(s) that may result.</p>

					<h5>22. International Transfer</h5>
					<p>We operate globally so it is necessary to transfer your Personal Information internationally, outside of Australia or an external Territory, to entities and persons who are not the disclosing parties of such information. In particular, your information will likely be transferred to and processed in the United States where our server is located. Please be assured that we will take reasonable steps in all the circumstances to ensure that your privacy is protected and an overseas recipient does not breach the APPs, other than APP1; however, the data protection and other laws of other countries may not be as comprehensive as those in Australia. Therefore, by accessing our Website or the Learning Platform you confirm that having considered the cross-border transfer of your Personal Information to the overseas recipients described in this Privacy Policy you expressly consent to your Personal Information being collected, used and the cross-border transfer of your Personal Information out of Australia as set forth in this Privacy Policy.</p>

					<h5>23. Adoption, use or disclosure of government related identifiers</h5>
					<p>SuperDataScience will not use or disclose an identifier that has been assigned to an individual by a Government Agency such as a Tax File Number, Social Security Number, or Medicare Number unless required by law. Personal Information on Expiry of Agreement</p>
					<p>On expiry or termination of your Agreement with us; in respect of the Personal Information processed pursuant to that Agreement, we shall, cease to use such Personal Information and will promptly arrange for its deletion, except where we may be required to retain Customer records (that could contain certain Personal Information) for the purposes of producing final invoices or for legal and regulatory compliance, in which case, we shall comply with (a) the applicable provisions in such relevant Agreement, and (b) Data Protection Laws regarding the deletion and retention of Personal Information.</p>

					<h5>24. SuperDataScience’s Liability</h5>
					<ul>
						<li>IN THE EVENT THAT SUPERDATASCIENCE BREACHES ITS OBLIGATIONS AS A DATA PROCESSOR UNDER THE GDPR, AND AS A SOLE AND DIRECT CONSEQUENCE OF SUCH BREACH, OR ITS OBLIGATIONS AS AN APP ENTITY TO THE EXTENT APPLICABLE, WHERE YOU ARE FINED BY A REGULATORY AUTHORITY, THEN SUPERDATASCIENCE SHALL BE LIABLE TO YOU FOR SUCH FINES, EXCEPT TO THE EXTENT WHERE SUCH BREACH WAS ATTRIBUTABLE TO YOUR VIOLATION OF ITS OBLIGATIONS AS A DATA CONTROLLER UNDER THE GDPR, OR APP ENTITY AS APPLICABLE, OR WHERE SUCH BREACH WAS AS A DIRECT RESULT OF SUPERDATASCIENCE CARRYING OUT YOUR INSTRUCTIONS OR THOSE OF THE DATA SUBJECT.</li>
						<li>SUPERDATASCIENCE’s liability in this clause is subject to the conditions that you: (a) promptly give us notice of any such fines; (b) give us sole control of the defense of any such fines including the bringing of any appeal that may be available (provided that we may not settle any such fines that adversely affect you without your consent); and (c) you provide us with all reasonable assistance.</li>
					</ul>

					<h5>25. How to Contact Us</h5>
					<p>If you have any questions or concerns or claims in respect of our Privacy Policy or its implementation you may contact us by email at support@superdatascience.com or by postal mail to SuperDataScience Pty Ltd, an Australian limited company, with a principal place of business located at 15 Macleay Crescent, Pacific Paradise, QLD 4564.</p>
					<p>All notices under this Privacy Policy must be given by e-mail.</p>
					<p>For information about privacy generally, or if your concerns are not resolved to your satisfaction, you can contact the Office of the Australian Information Commissioner (OAIC) on 1300 363 992 or via www.oaic.gov.au or your local governing authorities.</p>
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
