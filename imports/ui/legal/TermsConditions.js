import React, { useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { SEO } from "/imports/ui/components/SEO";
import "/imports/ui/stylesheets/navbar.css";
import "/imports/ui/stylesheets/footer.css";
import "/imports/ui/legal/styles.css";

export default TermsConditions = () => {
	const history = useHistory();

	useEffect(() => { window.prerenderReady = true; }, []);

	return (
		<Fragment>
			<SEO
				title="Terms & Conditions"
				description="The following Terms and Conditions, together with the relevant information set out on the Web site and the Learning Platform, including any features and services available."
				path="terms-conditions"
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
						<h1>Terms & Conditions</h1>
						<p>These Terms and Conditions were last modified on April 19, 2017.</p>
					</div>
				</div>

				<img src="/connection-pattern.svg" className="image-pattern connection-pattern"/>
				<img src="/landing/courses-bottom-pattern.svg" className="image-pattern bottom-pattern"/>
			</section>

			<section className="section legal-content">
				<div className="main-wrapper">
					<h2>Section I: Definitions, Agreement to be bound</h2>
					<h5>1.1. Definitions</h5>
					<p>References to “Dispute” mean any claim, conflict, controversy, or disagreement between the Parties arising out of, or related in any way to, these Terms (or any Terms, supplement or amendment contemplated by these Terms,) including, without limitation, any action in tort, contract or otherwise, at equity or at law, or any alleged breach, including, without limitation, any matter with respect to the meaning, effect, validity, performance, termination, interpretation or enforcement of these Terms or any terms contemplated by the Terms.</p>
					<p>References to the "Learning Platform" mean the educational platform containing videos, trainings, tools, and tips related to Tableau® trainings and certifications made available through the Web site.</p>
					<p>References to a “Material Breach” mean any breach of these Terms upon the occurrence of which a reasonable person in the position of the non-breaching Party would wish to immediately terminate these Terms because of that breach.</p>
					<p>References to a “Student” mean those registered and authorized enterprise Users of our Learning Platform.</p>
					<p>References to the “Terms” and/or “Agreement,” mean this, these Terms and Conditions, as set forth herein.</p>
					<p>References to “us,” “we,” “our,” and/or “TFCertification.com,” mean TF Certification, a product of Ligcert Ventures Ltd and its parents, subsidiaries, and assigns.</p>
					<p>References to the “Web site” mean the Web site bearing the URL www.tfcertification.com.</p>
					<p>References to “you,” and/or “User” mean a general user of the Web site and/or the Learning Platform, whether as a registered Student, authorized enterprise user, email list subscriber, subscriber to our private Facebook group, or general Web site user.</p>

					<h5>1.2. Agreement to be Bound.</h5>
					<p>The following Terms and Conditions, together with the relevant information set out on the Web site and the Learning Platform, including any features and services available, such as RSS feeds, podcasts, video and photographs, publications, and other materials, are subject to the Terms and Conditions set forth below. Please read them carefully as any of use of the Web site and/or the Learning Platform constitutes an agreement, without acceptance, to be bound thereby by the User. By using the Web site or the Learning Platform, and, upon registration therefor, by clicking that you agree to these Terms, you represent that you are at least eighteen (18) years old, have read and understand the Terms and Conditions, and that you agree to be bound by these Terms and Conditions as set forth below.</p>
					<p>These Terms and Conditions are subject to the Privacy Policy, which also govern your use of the Web site and the Learning Platform.</p>

					<h2>Section II: General Provisions</h2>
					<h5>2.1. Success Not Guaranteed; No Promise of Profit.</h5>
					<p>Students agree and acknowledge that, due to the nature of the industry in which Students seek training, success and improvement in employment, profit or business growth is not guaranteed. Rather, success is dependent on Student’s own commitment to the learning the content provided, time and effort expended in relation to the training, educational background, prior work history, and ability to understand and implement lessons. In no event shall the provision of training be construed by a Student as a promise of profit, sales, revenues, or increased wealth or assets. To the extent any third-party income, sales or growth figures are mentioned, provided as a case study, or otherwise presented to Student, such information is anecdotal and passed on to TF Certification concerning the results achieved by the individual sharing the information. TF Certification has performed no independent verification of the statements made by those individuals. Such information, if provided, is provided for exemplar purposes only. In short, past performance and testimonials are not to be construed as an indication, promise, or projection of possible future employability or success. Student shall not assume that he or she has the potential to make such income or growth figures itself as a result of his or her participating in the Learning Platform.</p>

					<h5>2.2. Reliance on Training at Student's Own Risk.</h5>
					<p>The training made available via the Learning Platform is intended as a self-help, motivation, personal-improvement, and informational tool. It is not intended to be a replacement for a mathematics, finance or business education, such as that received by a university, CPA, or MBA program. Training should not be relied upon or used as the sole basis for making decisions regarding business, finances, law, real estate, insurance, or any other specialized area without consulting primary, more accurate, more complete or more timely sources of information. Student is responsible for his or her own due diligence.</p>

					<h5>2.3. Accuracy, Completeness and Timeliness of Information.</h5>
					<p>We are not responsible if information made available on the Web site the Learning Platform is not accurate, complete or current. You acknowledge that the Web site and the Learning Platform are provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. You acknowledge further that any reliance on the Web site or the Learning Platform is at your own risk.</p>

					<h5>2.4. Errors in Web site or the Learning Platform.</h5>
					<p>We do not warrant that any errors in the Web site and/or the Learning Platform will be corrected.</p>

					<h5>2.5. Modifications and Changes to Terms and Conditions.</h5>
					<p>We may modify, add to, suspend or delete these Terms and Conditions or other agreements, in whole or in part, in our sole discretion at any time, with such modifications, additions or deletions being immediately effective upon their posting to the Web site and the Learning Platform. We may additionally attempt to notify you of such changes by contacting you at the email you provided upon registration of an Account or subscription to our newsletter. Your use of the Web site and/or the Learning Platform after modification, addition or deletion of these Terms and Conditions shall be deemed to constitute acceptance by you of the modification, addition or deletion.</p>

					<h5>2.6. Modifications and Changes to the Web Site or the Learning Platform.</h5>
					<p>We may modify, add to, suspend, or delete any aspect of the Web site and/or the Learning Platform offered by us, in whole or in part, at our sole discretion at any time, with such modifications, additions or deletions being immediately effective. Such modifications, additions or deletions may include but are not limited to content offered, hours of availability, and equipment needed for access or use.</p>

					<h5>2.7. Access to Web site and the Learning Platform.</h5>
					<p>Though we try to make the Web site and the Learning Platform available twenty-four (24) hours a day, seven (7) days a week, except for planned down-time for maintenance, we do not warrant that the Web site or the Learning Platform will be at all times available.</p>
					<p>We do not warrant that your computer, tablet, and/or smartphone will be able to access and/or support the Web site or the Learning Platform.</p>

					<h5>2.8. Right of Refusal, Limitation, Discontinuation, and Termination.</h5>
					<p>We reserve the right to refuse to provide access to the Web site and/or the Learning Platform for any reason at any time in our sole and exclusive discretion. We may, in our sole and exclusive discretion, limit or cancel a Student Account for any reason whatsoever, including but not limited to a breach or violation by the Student of any of the terms or provisions of the Terms and Conditions or any published TF Certification policy or procedure; a discredit of TF Certification by a User; misrepresentation of TF Certification by making claims contrary to TF Certification literature; ethical or legal violations that may cause TF Certification to suffer damages; or any other reason whatsoever, in the sole discretion of Art of TF Certification.</p>
					<p>In the event that we make a change to or cancel an Account, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time your Account was created, or, in the event of an authorized enterprise user, by contacting your corporate offices; however, the failure to do so shall not result in any liability, including liability for lost data deleted as a result of the Account termination. In the event we terminate your Account, you shall no longer be eligible to be a TF Certification Student at any time in the future, unless permission is granted to you, in writing, by us, in our sole and exclusive discretion.</p>
					<p>In addition, although the Web site and the Learning Platform are intended to be accessible worldwide, the Web site may not be available to all persons in all geographic locations or jurisdictions. TF Certification reserves the right to limit the availability of the Web site and/or the Learning Platform to any person, geographic area or jurisdiction it so desires, in our sole discretion, and to limit the quantities of any such product or service that it provides. Any offer for any product or service made via the Web site or the Learning Platform is void where prohibited by law.</p>

					<h5>2.9. Prohibited Uses of Web site and the Learning Platform.</h5>
					<p>In addition to the other restrictions on use set forth herein, you agree and acknowledge that you shall not use the Web site or the Learning Platform: (a) for any unlawful purpose; (b) to solicit Users to perform or participate in any unlawful acts or to engage in acts that are unrelated to the purpose(s) of the Web site and/or the Learning Platform; (c) to violate any international, governmental, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Web site or the Learning Platform; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Web site or the Learning Platform. We reserve the right to terminate your use of the Web site and/or the Learning Platform for violating any of the prohibited uses or for any other reason in our sole and exclusive decision.</p>
					<p><strong>No Affiliation with Tableau®.</strong></p>
					<p>Tensorflow is an open source framework created by Google. TF Certification is in no way affiliated with Google, LLC.</p>

					<h2>Section III: Use</h2>
					<h5>3.1. Online Accounts, Generally.</h5>
					<p>Users wishing to register as Students shall be given the opportunity to do so via an online registration form or, in the event of authorized enterprise users, via instructions provided to you by your enterprise’s representative to create a Student account, (your “Account,”) that will allow you to receive information from us and/or to participate in certain features of the Learning Platform. We may, from time to time, manually assist Students with creating such Accounts. We will use the information you provide in accordance with our Privacy Policy. By registering with us, you represent and warrant that all information you provide on the registration form is current, complete and accurate to the best of your knowledge. You agree to maintain and promptly update your registration information so that it remains current, complete and accurate. During the registration process, you will be required to choose a password. You acknowledge and agree that we may rely on this password to identify you. You are responsible for all use of your Account, regardless of whether you authorized such access or use, and for ensuring that all use of your Account complies fully with the provisions of these Terms and Conditions. Students agree further and acknowledge that any Account profile they create may be edited, removed, modified, published, transmitted, and displayed by us, and they waive any rights they may have in having the material altered or changed in a manner not agreeable to them. Students shall not create more than one (1) Account and shall not share an Account with any other User.</p>

					<h5>3.2. Transfer Prohibited.</h5>
					<p>You agree you shall not sell, trade or transfer that Account to any other person or entity except as provided for herein.</p>

					<h5>3.3. Account Types.</h5>
					<p>Use of the Web site is generally free, however, Students and enterprises wishing to access the premium features of the Learning Platform shall be required to pay a Course Fee as set forth on the Web site at all times, including at the time of purchase, and which may be subject to change in our sole and exclusive discretion, without notice.</p>

					<h5>3.4. Right to Monitor.</h5>
					<p>We shall have the right to monitor your Account in our sole and exclusive discretion.</p>

					<h5>3.5. Account Security.</h5>
					<p>For security purposes, we strongly advise you to keep your Account ID and password confidential and to change your Password if you think it may have been compromised. You are entirely responsible for maintaining the secrecy of this information. In addition, we recommend that you quit your entire browser application when you have completed your time on the Learning Platform. This is particularly important when you are using the Learning Platform at a public location, such as an Internet café, library, or workplace or on a public device. You agree to immediately notify TF Certification in the event of any security breach or unauthorized use of your Account ID, password, or any or all of your registration information. So that you can take advantage of the latest security technology, we recommend that you use the most recent version of your browser.</p>

					<h5>3.6. Termination.</h5>
					<p>You may terminate your Student Account at any time by writing to us at support@tfcertification.com. In no event shall a refund be due or owing should a Student elect to terminate his or her Studentship unless as provided for herein.</p>

					<h5>3.7. Meetups and Student Verification.</h5>
					<p>From time to time, Students may choose to meetup with other Students, in person, to further discuss their interest in data science. In doing so, Students agree and acknowledge that user authentication on the Internet is difficult, and TF Certification cannot, does not, and will not verify that each Student is who he or she claims to be. You assume all the risks inherent in the use of the Web site and the Learning Platform should you choose to meet up or communicate with other Students, including, but not limited to, the risks of bodily harm, property damage, harassment, fraud, the risk of dealing with strangers or persons underage and any other risks associated with meeting or communicating with someone who is unknown to you. You are solely and uniquely responsible for conducting your own due diligence on other Students and exercising common sense. In no event should a meet-up take place in a private space. TF Certification shall not be held liable for any losses, damages or claims associated with a meetup between Students.</p>

					<h2>Section IV: Subscription Fees for Individual, Non-Enterprise Members</h2>
					<p>Enterprises should refer to our Enterprise Terms and Conditions for enterprise-specific fee information.</p>
					<h5>4.1. Course Fees.</h5>
					<p>Individual, non-enterprise Students wishing to purchase our premium services must pay a Course Fee in the amount set forth on the Web site at the time of purchase. All Course Fees are expressed in U.S. Dollars ($USD.)</p>

					<h5>4.2. Form of Payment.</h5>
					<p>Payment shall be made automatically via our payment processor, Stripe, by automatic debit of the major credit or debit card provided by Student upon Account registration or as later updated by Student. Payment through PayPal or other payment methods may be available upon request, where permission for the same is granted in our sole and exclusive discretion.</p>

					<h5>4.3. Pass or Pay Guarantee.</h5>
					<p>TF Certification believes in its Learning Platform, and, therefore, is pleased to offer a limited guarantee to each of its Students. Per this guarantee, TF Certification will pay the examination fees for any Student who satisfactorily completed a Course, in full, and who does not pass the applicable Tensorflow certification course within thirty (30) calendar days of Course completion, to take a second examination within an additional thirty (30) calendar days of Student receiving notice of non-passing. Contact us at support@tfcertification.com to claim a pass or play guarantee.</p>

					<h5>4.4. Refunds.</h5>
					<p>Due to the electronic nature of the services that we provide, in no event other than material breach of these Terms by TF Certification, shall a refund be granted, in whole or in part, for any reason or no reason whatsoever, including but not limited to Student’s discontinuation, failure to complete, or non-use of a Course.</p>

					<h2>Section V: Interactive Areas; Submission</h2>
					<h5>5.1. Account Guidelines.</h5>
					<p>The Web site, Learning Platform, and our private Facebook group, together with other private and/or Student-only mediums may contain the ability to communicate with other Students, share via social media, participate in any comments sections and discussion forums, social media outlets, sales channels, and/or other interactive features, (collectively "Interactive Areas,”) in which Users may communicate. By participating in Interactive Areas, you agree and acknowledge that you:</p>
					<p>Shall not upload, distribute or otherwise publish to the Interactive Area any libelous, defamatory, obscene, pornographic, abusive, or otherwise illegal material; and</p>
					<p>Shall not threaten or verbally abuse other Users, use defamatory language, or deliberately disrupt discussions with repetitive messages, meaningless messages or "spam"; and</p>
					<p>Shall not to use language that abuses or discriminates on the basis of race, religion, nationality, gender, sexual preference, age, region, disability, etc. Hate speech of any kind is grounds for immediate and permanent suspension of access to the Interactive Area and Student Account, if applicable; and</p>
					<p>Shall not personally attack another Users. Personal attacks are a direct violation of these Terms and Conditions and are grounds for immediate and permanent suspension of access the Interactive Area and Student Account, if applicable; and</p>
					<p>Shall not use the Interactive Areas to distribute or otherwise publish any material containing any solicitation of funds, advertising or solicitation for goods or services except as envisioned by the express purpose of the Interactive Area; and</p>
					<p>Shall not upload, post or otherwise transmit any content that violates any local, state, provincial, territorial, national or international law or engage in activity that would constitute a criminal offense or give rise to a civil liability; and</p>
					<p>Shall not post unauthorized commercial communications (such as spam); and</p>
					<p>Shall not upload, post or otherwise transmit any content that advocates or provides instruction on illegal activity or discuss illegal activities with the intent to commit them; and</p>
					<p>Shall not upload, post or otherwise transmit content that does not generally pertain to the designated topic or theme of any Interactive Area; and</p>
					<p>Shall not impersonate any person or entity, including, but not limited to, any of our employees, contractors, or vendors, or falsely state or otherwise misrepresent your affiliation with any person or entity; and</p>
					<p>Shall not interfere with any other Users’ right to privacy, including by harvesting or collecting personally-identifiable information about other Users or distributing private information about another Users or any third party; and</p>
					<p>Shall not engage in unlawful multi-level marketing, such as a pyramid scheme; and</p>
					<p>Shall not upload, post or otherwise transmit any “chain letters”; and</p>
					<p>Shall not upload, post or otherwise transmit any content, software or other materials which contain a virus, malicious code or other harmful, damaging, interfering, injuring or disruptive component; and</p>
					<p>Shall not post false or misleading indications of origin or statements of fact; and</p>
					<p>Shall not upload, post or otherwise transmit any content, software or other materials which restrict or inhibit any other User from using and enjoying any Interactive Area; and</p>
					<p>Shall not interfere with or disrupt any Interactive Area or the servers or networks connected to the same, or disobey any requirements, procedures, policies or regulations of networks connected to any Interactive Area; and</p>
					<p>Shall not violate, plagiarize or infringe the rights of third parties including, without limitation, copyright, trademark, patent, right of privacy, moral rights, right of publicity or any other proprietary right; and</p>
					<p>Shall not facilitate or encourage any violations of these Terms and Conditions or our policies.</p>

					<h5>5.2. Rights in Submissions.</h5>
					<p>Should you submit, display, publish or otherwise post any content to an Interactive Area, (a “Submission,”) you agree to grant to us and our partners and affiliates a perpetual, irrevocable, transferable limited, non-exclusive, sub-licensable, worldwide, fully-paid, royalty-free license to use, modify, publish, edit, perform, publicly perform, publicly display, reproduce, and distribute such Submission in any and all forms, media, and technologies now known or hereinafter developed, alone or as part of other works, for hosting, indexing, caching, distributing, tagging, marketing, and for all other lawful purposes without the requirement to make payment to or seek permission from you or any third party. You acknowledge that Submissions are not confidential, and your communications may be read or intercepted by others. You acknowledge that by submitting Submissions to TF Certification, no confidential, fiduciary, contractually implied, or other relationship is created between you and TF Certification other than pursuant to this Agreement.</p>
					<p>You represent and warrant that you own or have a valid license to use any and all Submissions and otherwise have the right to grant the license set forth herein, and the displaying, publishing or posting of any Submissions does not and will not violate the privacy rights, publicity rights, copyrights, trademark rights, patents, contract rights or any other intellectual property rights or other rights of any person or entity.</p>

					<h5>5.3. No Responsibility for Submissions.</h5>
					<p>TF Certification is not liable for Submissions provided by any Users or third parties. Such Submissions do not represent the views of TF Certification, its subsidiaries, or its partners.</p>

					<h5>5.4. Student Communications.</h5>
					<p>TF Certification does not screen communications in advance and is not responsible for screening or monitoring material and content posted by Users to Interactive Areas. If a User notifies TF Certification of communications, which allegedly do not conform to these Terms, TF Certification may investigate the allegation to determine, in good faith and its sole discretion, whether to remove or to request the removal of the communication. TF Certification has no liability or responsibility to users for performance or nonperformance of such activities.</p>

					<h2>Section VI: Intellectual Property; Privacy</h2>
					<h5>6.1. Intellectual Property Rights Not Waived.</h5>
					<p>This is an Agreement for access to and use of the Web site and the Learning Platform, and you are not granted a license to any software or intellectual property by these Terms and Conditions aside from the limited right to use the Learning Platform. The Web site and the Learning Platform are protected by UK and, where applicable, international intellectual property laws. The Web site and the Learning Platform belong to us and are the property of us or our licensors (if any). We retain all ownership rights in the Web site and the Learning Platform.</p>
					<p>Furthermore, all material displayed or transmitted on this Web site and the Learning Platform, including but not limited to text, logos, icons, the HTML-based computer programs used to generate the Web site, datasets, blog posts, articles, photographs, images, illustrations, video clips, audio clips, and graphics, (“Materials,”) are owned by us and/or our licensors and are protected by UK and international copyright, trademarks, service marks, and other proprietary rights, laws and treaties.</p>
					<p>Except as provided, you may not copy, reproduce, publish, transmit, transfer, sell, rent, modify, create derivative works from, distribute, repost, perform, display, or in any way commercially exploit the Materials, nor may you infringe upon any of the copyrights or other intellectual property rights contained in the Materials. You may not remove or alter, nor cause to be removed or altered, any copyright, trademark, or other proprietary notices or visual marks and logos from the Materials. You may not register any domain names that may confuse or contain any portion of the TF Certification trade names or marks.</p>
					<p>You may make a single print copy of any Materials provided by us on the Web site for personal, non-commercial use only, provided that you do not remove nor cause to be removed any copyright, trademarks, or other proprietary notices or visual marks or logos from the Materials. You may not archive or retain any of the Materials accessed on the Web site or Learning Platform without our express written permission. All requests for archiving, republication or retention of any part of the Materials must be in writing to us and must clearly state the purpose and manner in which the Material will be used. Requests for permission to archive, retain, or republish any part of the Materials may be submitted to support@tfcertification.com.</p>
					<p>TF Certification makes no claims that the Materials are appropriate or may be downloaded outside the United Kingdom. Access to the Materials may not be legal by certain persons or in certain countries. If you access the Web site from outside the United Kingdom, you do so at your own risk and are responsible for compliance with the laws of your jurisdiction, including those relating to privacy.</p>
					<p>You acquire no rights or licenses whatsoever in the Materials other than the limited rights to use the Web site in accordance with these Terms and Conditions. Any of the Materials accessed or downloaded from this site must be accessed or downloaded in accordance with the Terms and Conditions specified in this Agreement. We reserve any rights not expressly granted under these Terms and Conditions.</p>
					<p>Any software that is made available for downloading from the Web site or the Learning Platform, ("Software,") or any affiliate and/or partner Web site is protected by UK copyright and may be protected by other rights. The use of such Software is governed by the terms of the software End-User License Agreement or designated "Legal Notice," as may be in force.</p>

					<h5>6.2. Feedback.</h5>
					<p>You may have the opportunity to provide reviews, testimonials, suggestions, ideas, and feedback, (collectively, “Feedback.”) Should you so provide such Feedback you grant us sole ownership of the same, which includes, without limitation, the right for us or any third party we designate, to use, copy, transmit, excerpt, publish, distribute, publicly display, publicly perform, create derivative works of, host, index, cache, tag, encode, modify and adapt (including without limitation the right to adapt to streaming, downloading, broadcast, mobile, digital, thumbnail, scanning or other technologies) in any form or media now known or hereinafter developed. All such Feedback shall be treated as non-confidential.</p>
					<p>In the event you provide a testimonial, you hereby assign, transfer and grant to TF Certification, its successors, assignees, licensees, sponsors, any television networks, and all other commercial exhibitors the exclusive, irrevocable right and license to utilize such testimonial and providing User’s name, photograph, likeness, and occupation, in advertising and promoting TF Certification and in all media for social media, advertising, trade, and any other lawful purposes. You understand that neither TF Certification nor any third party is under any obligation to exercise any of the foregoing rights, licenses and privileges. You waive any right to inspect or approve any materials related thereto or to claim any royalty therefor.</p>
					<p>If it is determined that you retain moral rights (including rights of attribution or integrity) in the content submitted by you, you hereby declare that (a) you do not require that any personally-identifying information be used in connection with the content, or any derivative works of or upgrades or updates thereto; (b) you have no objection to the publication, use, modification, deletion and exploitation of the content by us or our licensees, successors and assigns; (c) you forever waive and agree not to claim or assert any entitlement to any and all moral rights of an author in any of the content; and (d) you forever release us, and our licensees, successors and assigns, from any claims that you could otherwise assert against us by virtue of any such moral rights. You also permit any other User to access, view, store or reproduce the content for that User's personal use.</p>
					<p>Notwithstanding the foregoing, you acknowledge that your Feedback may contain concepts, ideas, materials, proposals, suggestions and the like relating to TF Certification or its initiatives, (your “Ideas.”) With respect to your Ideas you acknowledge that: (a) we receive numerous submissions from many parties and/or may have independently-developed and/or considered ideas similar to your Ideas, and that our review of your Ideas is not an admission of novelty, priority or originality; and (b) our use of you or Idea or any ideas similar to your Ideas, whether based on your Feedback or Submissions, provided to us by third parties, or independently-developed or considered by us, shall be without obligation to you or any claim by you of interest in any patents, trademarks, copyrights, moral rights, or trade secrets which may arise from such Idea or any ideas similar to your Ideas.</p>

					<h5>6.3. Confidential Information of Users.</h5>
					<p>Users may obtain personal information from another User as a result of their use of the Web site and/or the Learning Platform. Without obtaining prior permission from the User, this personal information shall only be used for the express purpose for which it is provided or for TF Certification-related communications and shall be held in strict confidence in accordance with our Privacy Policy. We have not granted you a license to use the information for unsolicited commercial messages. Without limiting the foregoing, without express consent from the User, you are not licensed to add any contact, Student or other User to your email or physical mail list. For more information, see our Privacy Policy.</p>

					<h2>Section VII: Third party Advertisements, Promotions, and Links</h2>
					<h5>7.1. Third Party Advertisements and Promotions.</h5>
					<p>We may, from time to time, run advertisements and promotions from third parties on the Web site and/or the Learning Platform. Your dealings or correspondence with, or participation in promotions of, advertisers other than us, and any terms, conditions, warranties or representations with such dealings, are solely between you and such third party. We are not responsible or liable for any loss or damage of any sort incurred as the result of any such dealings or as the result of the presence of third party advertisers on the Web site or the Learning Platform.</p>

					<h5>7.2. Use of Third Party Tools.</h5>
					<p>We may provide you with access to third party tools over which we do not monitor and/or have any control nor input.</p>
					<p>You acknowledge and agree that we provide access to such tools “as is” and “as available” without any warranties, representations or conditions of any kind. We shall have no liability whatsoever arising from or relating to your use of optional third party tools.</p>
					<p>Any use by you of optional tools offered through the Web site and/or the Learning Platform is entirely at your own risk and discretion, and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third party provider(s).</p>
					<p>We may also, in the future, offer new services and/or features through the Web site and/or the Learning Platform, including but not limited to the release of new tools. Such new features and/or services shall also be subject to these Terms and Conditions.</p>

					<h5>7.3. Third Party Links.</h5>
					<p>Certain content, products and services available via our Web site and the Learning Platform may include materials from third parties.</p>
					<p>Third party links on the Web site may direct you to third party Web sites and/or services that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy of any information contained on a third-party Web site or service, and we do not warrant and will not have any liability or responsibility for any third-party materials or Web sites and/or services, or for any other materials, products, or services of third parties.</p>
					<p>We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third party with whom you connect via the Web site and/or the Learning Platform. Please review carefully the third party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third party transactions should be directed to the third party.</p>

					<h2>Section VIII: Disclaimers; Limitations of liability; Indemnification</h2>
					<h5>8.1. Disclaimer of Warranty; Limitation of Liability.</h5>
					<p>(A) YOU AGREE THAT USE OF THE WEB SITE AND/OR THE LEARNING PLATFORM IS AT YOUR SOLE RISK. NEITHER US NOR OUR AFFILIATES NOR ANY RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, CONTRACTORS, PARENTS, SUBSIDIARIES, AGENTS, THIRD PARTY CONTENT PROVIDERS OR LICENSORS, WARRANT THAT THE USE OF THE WEB SITE OR THE SERVICE PROVIDER SHALL BE UNINTERRUPTED OR ERROR FREE; NOR DO WE MAKE ANY WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED FROM USE OF THE WEB SITE AND/OR THE LEARNING PLATFORM OR AS TO THE ACCURACY, RELIABILITY OR CONTENT OF ANY INFORMATION PROVIDED.</p>
					<p>(B) ANY DOWNLOADABLE SOFTWARE, PRODUCTS OR OTHER MATERIALS, WITHOUT LIMITATION, IS PROVIDED ON AN "AS IS" AND “AS AVAILABLE” BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF TITLE OR IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE AGAINST INFRINGEMENT, OTHER THAN THOSE WARRANTIES WHICH ARE IMPLIED BY AND INCAPABLE OF EXCLUSION, RESTRICTION OR MODIFICATION UNDER THE LAWS APPLICABLE TO THESE TERMS AND CONDITIONS.</p>
					<p>(C) ALTHOUGH ALL INFORMATION AND MATERIALS CARRIED ON THE WEB SITE AND THE LEARNING PLATFORM ARE BELIEVED TO BE RELIABLE, WE MAKE NO REPRESENTATIONS, NEITHER EXPRESSLY NOR IMPLIEDLY, AS TO THE ACCURACY, COMPLETENESS, TIMELINESS OR RELIABILITY OF THE WEB SITE AND/OR LEARING PLATFORM.</p>
					<p>(D) IN NO EVENT SHALL WE, OUR AFFILIATES NOR ANY RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, CONTRACTORS, PARENTS, SUBSIDIARIES, AGENTS, THIRD PARTY CONTENT PROVIDERS OR LICENSORS BE LIABLE TO YOU OR ANYONE ELSE FOR ANY LOSS OR DAMAGES WHATSOEVER, INCLUDING BUT NOT LIMITED TO ANY DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL, PUNITIVE, OR OTHER DAMAGES, INCLUDING BUT NOT LIMITED TO EXEMPLARY, RELIANCE, OR CONSEQUENTIAL DAMAGES, LOSS OF PROFITS, DAMAGES RESULTING FROM LOST DATA OR BUSINESS INTERRUPTION, PERSONAL INJURY OR DEATH, PROPERTY DAMAGE, EXEMPLARY REPUTATIONAL HARM, OR LOSS OF INFORMATION OR DATA, ARISING OUT OF OR RELATED TO THE USE OF OR INABILITY TO USE THE WEB SITE AND/OR THE LEARNING PLATFORM, AND/OR ANY INTERACTIONS WITH ANOTHER USER.</p>
					<p>(E) WE DISCLAIM ANY AND ALL LIABILITY OF ANY KIND FOR ANY UNAUTHORIZED ACCESS TO OR USE OF YOUR PERSONALLY-IDENTIFIABLE INFORMATION. BY UTILIZING THE WEB SITE AND/OR THE LEARNING PLATFORM YOU ACKNOWLEDGE AND AGREE TO OUR DISCLAIMER OF ANY SUCH LIABILITY. IF YOU DO NOT AGREE, YOU SHOULD NOT ACCESS OR OTHERWISE UTILIZE THE WEB SITE OR THE LEARNING PLATFORM.</p>
					<p>(F) TF CERTIFICATION'S LIABILITY, AND (AS APPLICABLE) THE LIABILITY OF OUR AFFILIATES AND ANY RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, CONTRACTORS, PARENTS, SUBSIDIARIES, AGENTS, THIRD PARTY CONTENT PROVIDERS AND LICENSORS TO YOU OR ANY THIRD PARTIES IN ANY CIRCUMSTANCE IS LIMITED TO THE GREATER OF (A) THE AMOUNT OF FEES YOU PAY TO TF CERTIFICATION IN THE TWELVE (12) MONTHS PRIOR TO THE ACTION GIVING RISE TO LIABILITY, OR (B) ONE HUNDRED U.S. DOLLARS ($100.00.)</p>
					<p>SOME JURISDICTIONS DO NOT ALLOW THE DISCLAIMER OF CERTAIN WARRANTIES OR LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO CERTAIN USERS.</p>
					<p>The above limitations shall survive these Terms and be for the benefit of us and our affiliates and respective directors, officers, employees, contractors, parents, subsidiaries, agents, Third party content providers and licensors.</p>

					<h5>8.2. Indemnification.</h5>
					<p>YOU AGREE TO DEFEND, INDEMNIFY AND HOLD US HARMLESS, AS WELL AS OUR AFFILIATES AND ANY RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, CONTRACTORS, PARENTS, SUBSIDIARIES, AGENTS, THIRD PARTY CONTENT PROVIDERS OR LICENSORS, FROM AND AGAINST ALL CLAIMS, SUITS, AND EXPENSES, INCLUDING ATTORNEYS' FEES, ARISING OUT OF OR RELATED TO (A) YOUR USE OF THE WEB SITE AND/OR THE LEARNING PLATFORM; (B) YOUR NONCOMPLIANCE WITH OR BREACH OF THIS AGREEMENT; (C) YOUR USE OF THIRD PARTY SERVICES, PRODUCTS, LINKS, ADVERTISEMENTS, AND/OR TOOLS; (D) YOUR VIOLATIONS OF ANY THIRD PARTY RIGHTS, INCLUDING THIRD PARTY INTELLECTUAL PROPERTY RIGHTS; OR (E) THE UNAUTHORIZED USE OF THE WEB SITE AND/OR THE LEARNING PLATFORM BY ANY OTHER PERSON USING YOUR INFORMATION. TF Certification shall provide notice to you promptly of any such claim, suit, or proceeding and may assist you, at your expense, in defending any such claim, suit or proceeding.</p>

					<h2>Section IX: Governing law; Arbitration</h2>
					<h5>9.1. Governing Law.</h5>
					<p>These Terms shall be governed and construed in accordance with the laws of the United Kingdom and Wales without regard to its conflicts of law provisions. You agree to submit to the personal jurisdiction of the courts located in London, England, and any cause of action that relates to or arises from these Terms, Web site and/or the Learning Platform must be filed therein unless subject to the binding arbitration provisions of Section 9.2, infra.</p>

					<h5>9.2. Arbitration.</h5>
					<p>The Parties agree that any dispute concerning, relating, or referring to these Terms, Web site, and/or the Learning Platform shall be resolved exclusively by binding arbitration in accordance with the substantive laws of the United Kingdom and Wales and shall be brought for arbitration in London, England, pursuant to the Rules of UNCITRAL. The arbitrator and not any local, federal, state, territorial, provincial or local court or agency shall have exclusive authority to resolve any dispute relating to the interpretation, applicability, enforceability, conscionability, or formation of this contract, including but not limited to any claim that all or any part of this contract is void or voidable. Nothing herein prevents either Party from seeking any interim injunction it deems necessary in order to preserve the status quo prior to the resolution of any dispute, in any jurisdiction. Either or both Parties may initiate the arbitration proceedings, and both shall share the expenses and fees of the arbitration equally.</p>

					<h2>Section X: Miscellaneous</h2>
					<h5>10.1. Customer Service.</h5>
					<p>Should you have any questions, comments or concerns regarding the Web site or Learning Platform, customer service may be contacted at any time via email at support@tfcertification.com. We strive to return all customer service inquires within forty-eight (48) business hours, between 8 a.m. and 5 p.m. GMT+1.</p>

					<h5>10.2. Affiliate Disclosure.</h5>
					<p>We may have an affiliate relationship with third parties and affiliates to whose products and/or services we link and promote. Because of this relationship we may earn a commission on products purchased by you from a third-party affiliate.</p>

					<h5>10.3. Authority.</h5>
					<p>Each Party represents and warrants to the other that it has full power and authority to enter into this Agreement and that it is binding upon such Party and enforceable in accordance with its Terms.</p>

					<h5>10.4. Waiver.</h5>
					<p>Any waiver of a right under these Terms and Conditions shall only be effective if agreed or declared in writing. No waiver of any term of this Agreement shall be deemed a further or continuing waiver of such term or any other term and shall not prevent a Party from exercising that right in the future. The rights and remedies herein provided are cumulative and not exclusive of any rights and remedies provided by law.</p>

					<h5>10.5. Force Majeure.</h5>
					<p>We shall not be bound to meet any obligation if prevented from doing so as a consequence of acts of god or force majeure, including but not limited to measures taken or imposed by any government or public authority or in case of any other event beyond our control, including but not limited to natural disasters (such as storm, hurricane, fire, flood, earthquake), war, civil unrest, terrorist activities, states of emergency, government sanctions, embargos, nationalizations, strikes and breakdowns of public utilities (such as of electricity or telecommunication services). We shall use all reasonable efforts to notify you of the circumstances causing the delay and to resume performance as soon as possible without undue delay.</p>

					<h5>10.6. Assignment.</h5>
					<p>We shall have the right to assign and/or transfer these Terms and Conditions and our rights and obligations hereunder to any third party after notifying you as provided for herein. You agree and acknowledge that you shall not assign or transfer your rights or sub-contract or delegate the performance of any of your obligations under these Terms and Conditions without our prior written consent in our sole and exclusive discretion or as provided for herein.</p>

					<h5>10.7. Rights of Third Parties.</h5>
					<p>These Terms do not give any right to any third party unless explicitly stated herein.</p>

					<h5>10.8. Relationship of the Parties.</h5>
					<p>The Parties are independent contractors under these Terms, and nothing herein shall be construed to create an employment agreement, partnership, joint venture, franchise relationship or agency relationship between them. Neither Party has authority to enter into Terms of any kind in the name of the other Party.</p>

					<h5>10.9. Severability.</h5>
					<p>If any of the sections of this Agreement shall be deemed invalid, void, or for any reason unenforceable, that section shall be deemed severable and shall not affect the validity and enforceability of any remaining section.</p>

					<h5>10.10. Notices.</h5>
					<p>Except as explicitly stated otherwise, any notices shall be given to TF Certification by postal mail to Ligcert Ventures Ltd, Hikenield House, East Anton Court, Andover, Hampshire SP10 5RG. Notice to a User shall be given to the email address you provide to us upon registration and/or subscription to our newsletter. Notice shall be deemed given twenty-four (24) hours after email is sent, unless the sending party is notified that the email address is invalid. Alternatively, we may give you notice by certified mail, postage prepaid and return receipt requested, to the address provided to us upon Account registration. In such case, notice shall be deemed given three (3) days after the date of mailing.</p>

					<h5>10.11. Entire Agreement.</h5>
					<p>This Agreement constitutes the entire Agreement between the Parties as to the subject matter hereof, and no other representations or promises of any kind shall be binding between the same.</p>
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
