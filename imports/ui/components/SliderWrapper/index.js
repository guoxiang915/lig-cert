import React, { useState, useEffect } from "react";
import { CarouselProvider, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "/imports/ui/components/SliderWrapper/styles.css";

export const SliderWrapper = ({ slides, autoPlay, autoPlayInterval, height, width, mobileSlides, desktopSlides, children }) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => { setIsMobile(window.innerWidth <= 767); }, []);

	return (
		<CarouselProvider
			isPlaying={autoPlay}
			interval={autoPlayInterval}
			totalSlides={slides.length}
			naturalSlideHeight={height}
			naturalSlideWidth={width}
			infinite
			visibleSlides={isMobile ? mobileSlides : desktopSlides}
			step={isMobile ? mobileSlides : desktopSlides}
			isIntrinsicHeight
		>
			<Slider>{slides}</Slider>
			{children}
		</CarouselProvider>
	);
};
