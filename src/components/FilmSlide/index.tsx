// components/FilmSlide.tsx
import React from 'react';
import Config from '../../configuration';
interface FilmSlideProps {
  title: string;
  description: string;
  backgroundImage: string;
  posterImage: string;
  watchLink: string;
}

const FilmSlide: React.FC<FilmSlideProps> = ({ title, description, backgroundImage, posterImage, watchLink }) => {
  return (
    <div className="swiper-slide" style={{ width: '100%' }}>
      <div
        className="relative h-100 md:h-[36rem] lg:h-[52rem] px-4 md:px-12 py-12 md:py-32 flex justify-center bg-center bg-no-repeat before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-black/60 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-28 after:bg-gradient-to-t after:from-black-main after:to-transparent"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover', 
        }}
      >
        <div className="max-w-screen-2xl z-10 h-fit flex items-center justify-between">
          <div className="w-full lg:w-2/3 px-4 flex flex-col items-start">
            <h2 className="font-bold text-4xl md:text-6xl lg:text-8xl text-white">
              {title}
            </h2>
            <p className="font-medium text-white text-xs md:text-xl my-12 text-left">
              {description}
            </p>
            <div className="flex text-white">
              <a className="btn-lg btn-primary mr-4" href={watchLink}>Watch now</a>
              <button className="btn-lg btn-default">Watch trailer</button>
            </div>
          </div>
          <div className="hidden px-4 lg:block lg:w-1/3">
            <img 
              className="w-96 rounded-3xl animate-scale" 
              src={posterImage} 
              alt="Poster" 
              style={{ objectFit: 'cover' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmSlide;
