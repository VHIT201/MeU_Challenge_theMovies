//Core
import React from "react";

//Type
import { FilmDetails, Credits } from "../../../../types";

// Internal
import Config from "../../../../configuration";

//Images
import { Images } from "../../../../assets/images";

/**
 * Component: Displays MovieDetailBanner section with movie details and cast information.
 */
const MovieDetailBanner: React.FC<{
  filmDetails: FilmDetails;
  credits: Credits | null;
}> = ({ filmDetails, credits }) => (
  <div
    className="relative w-full px-4 md:px-8 lg:px-16 py-12 md:pt-32 md:pb-20 bg-center bg-no-repeat bg-cover z-0"
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${filmDetails.backdrop_path})`,
    }}
  >
    <div className="flex items-start -mx-4 max-h-fit">
      <div className="hidden md:block w-64 lg:w-96 px-4">
        <img
          src={`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`}
          alt={filmDetails.title}
          className="w-full rounded-3xl"
        />
      </div>
      <div className="px-4 flex-1 flex flex-col items-start justify-between -my-2 lg:-my-4">
        <h2 className="py-2 lg:py-4 font-bold text-white text-3xl md:text-5xl lg:text-7xl">
          {filmDetails.title}
        </h2>
        <div className="py-4 flex flex-wrap items-center -mx-1">
          {filmDetails.genres.map((genre) => (
            <div className="px-1 mb-4" key={genre.id}>
              <span className="bg-black-main px-4 py-1 border-2 border-white rounded-full text-white text-xs lg:text-sm">
                {genre.name}
              </span>
            </div>
          ))}
        </div>
        <p className="py-2 lg:py-4 text-white text-xs md:text-sm lg:text-base text-left">
          {filmDetails.overview}
        </p>
        <div className="py-2 lg:py-4 text-left">
          <h3 className="text-white text-xl font-medium">Casts</h3>
          <div className="flex flex-wrap -mx-2 mt-1">
            {credits?.cast.slice(0, 5).map((item) => (
              <div className="w-28 px-2 mb-1" key={item.id}>
                <img
                  src={
                    item.profile_path
                      ? Config.imgPath + item.profile_path
                      : Images.default_image
                  }
                  className="rounded-xl"
                  alt={item.name}
                />
                <span className="text-white text-xs md:text-sm font-sm">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MovieDetailBanner;
