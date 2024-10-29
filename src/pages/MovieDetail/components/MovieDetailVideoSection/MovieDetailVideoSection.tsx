import React from "react";
import { Video } from "../../../../types";

/**
 * Component: Displays section with related videos.
 */
const MovieDetailVideoSection: React.FC<{ videos: Video[] }> = ({ videos }) => {
  if (videos.length === 0) {
    return (
      <div className="relative px-4 md:px-8 lg:px-16 w-full text-left z-0">
        <div className="w-full relative py-20 text-center flex flex-col gap-20">
          <h3 className="text-white text-base md:text-2xl font-semibold mb-4 self-start">
            Videos
          </h3>
          <span className="text-2xl font-bold text-white opacity-50">
            There are no videos related to this movie.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-4 md:px-8 lg:px-16 w-full text-left z-0">
      <div className="h-10"></div>
      {videos.slice(0, 5).map((item) => (
        <div key={item.id} className="mb-16">
          <h3 className="text-white text-base md:text-2xl font-semibold mb-4">
            {item.name}
          </h3>
          <iframe
            src={`https://www.youtube.com/embed/${item.key}`}
            title={item.name}
            width="100%"
            height="800px"
            loading="lazy"
            allowFullScreen={true}
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default MovieDetailVideoSection;
