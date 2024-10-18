// Core: Import necessary libraries and types
import React, { useEffect, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

//Component
import FilmSlide from "../../../../components/FilmSlide";

//Config
import Config from "../../../../configuration";

//Types
import { HeaderSwiperProps } from "./lib/Type";


const HeaderSwiper: React.FC<HeaderSwiperProps> = ({ swipersData, onWatchNow, onWatchTrailer }) => {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Method: Handle intersection changes
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const element = entry.target as HTMLElement;

      // Check if the element is in the viewport
      if (entry.isIntersecting) {
        element.classList.add("animate-fallDown", "animate-scaleUp");
      } else {
        element.classList.remove("animate-fallDown", "animate-scaleUp");
      }
    });
  }, []);

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    // Observe each slide
    slideRefs.current.forEach(slide => {
      if (slide) {
        observer.observe(slide);
      }
    });

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  
  return (
    <Swiper
      loop
      autoplay={{ delay: 3000, disableOnInteraction: true }}
      className="w-full mb-0 p-0"
    >
      {swipersData[0].data.slice(0, 4).map((movie, index) => (
        <SwiperSlide key={index}>
          <div ref={el => (slideRefs.current[index] = el)}>
            <FilmSlide
              id={movie.id}
              title={movie.original_title}
              description={movie.overview}
              backgroundImage={
                "https://image.tmdb.org/t/p/original//" + movie.backdrop_path
              }
              posterImage={Config.imgPath + movie.poster_path}
              onWatchNow={() => onWatchNow(movie.id)} // Pass the navigation function
              onWatchTrailer={() => onWatchTrailer(movie.id)}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeaderSwiper;
