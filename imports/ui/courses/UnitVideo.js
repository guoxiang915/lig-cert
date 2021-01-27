
import React, { useState, Fragment } from "react";
import { VideoPlayer } from "/imports/ui/components/VideoPlayer";
import { UnitHeader } from "/imports/ui/courses/UnitHeader";

export const UnitVideo = ({ course, unit, nextState, toggleSidebar }) => {
	const [showHeader, setShowHeader] = useState(true);

	const customActions = (videoPlayer) => {
		// Add community button to player if course communityLink exists
		if (course.communityLink) videoPlayer.addButton("/player/community.svg", "Community", () => {
			window.open(course.communityLink);
		}, "community", "jw-icon-community");

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

		videoPlayer.on("complete", () => { nextState.action(); });

		videoPlayer.on("remove", () => { clearInterval(hideInterval); }); // Interval has to be clean within this function, otherwise its reference will exist
	};

	return (
		<Fragment>
			<UnitHeader unit={unit} classes="video" toggleSidebar={toggleSidebar} showHeader={showHeader} />
			<VideoPlayer playerId="unit" mediaId={unit.content.mediaId} custom={customActions} />
		</Fragment>
	);
};
