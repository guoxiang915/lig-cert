import React, { useEffect } from "react";
import { useScript } from "/imports/ui/components/hooks/useScript.js";
import "/imports/ui/components/VideoPlayer/styles.css";

export const VideoPlayer = ({ playerId, mediaId, custom }) => {
	const videoContainer = `${playerId}-video-player`;

	const _setup = () => {
		jwplayer(videoContainer).setup({
			playlist: `https://cdn.jwplayer.com/v2/media/${mediaId}`,
			playbackRateControls: true,
			playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
		});

		if (custom) custom(jwplayer(videoContainer)); // Adds specific custom functionality to player

		jwplayer(videoContainer).on("buffer", () => { // Re arrange buttons
			const volumeButton = document.querySelector(".jw-icon-volume");
			const buttonSpacer = document.querySelector(".jw-spacer");
			buttonSpacer.insertAdjacentElement("afterend", volumeButton);
		});
	};

	useEffect(() => {
		useScript(`jwplayer-${mediaId}`, "https://cdn.jwplayer.com/libraries/E37GvLkJ.js", _setup);

		return () => jwplayer(videoContainer).remove();
	}, [mediaId]);

	return (
		<div id={videoContainer} />
	);
};
