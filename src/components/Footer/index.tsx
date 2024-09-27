import React from 'react';
import { Link } from 'react-router-dom';
import { Images } from '../../assets/images';

const Footer: React.FC = () => {
  return (
    <div
      className="h-100 lg:h-120 px-8 py-12 md:p-16 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${Images.footerImg})` }} 
    >
      <div className="max-w-4xl h-full mx-auto flex flex-col justify-around">
        <Link className="flex items-center justify-center  hover:cursor-pointer group mb-10" to="/">
          <img
            src={Images.logo} 
            alt="Logo"
            className="mr-2 md:mr-4 w-8 md:w-12"
          />
          <h1 className="text-white font-semibold text-2xl md:text-4xl group-hover:text-red-500 group-hover:transition duration-300">
            theMovies
          </h1>
        </Link>
        <div className="flex text-white font-semibold text-base md:text-2xl items-start justify-between flex-wrap -mx-2 mt-8 mb-10">
          <Link className="footer-item" to="/">Home</Link>
          <Link className="footer-item" to="/">Live</Link>
          <Link className="footer-item" to="/">You must watch</Link>
          <Link className="footer-item" to="/">Contact us</Link>
          <Link className="footer-item" to="/">FAQ</Link>
          <Link className="footer-item" to="/">Recent releases</Link>
          <Link className="footer-item" to="/">Terms of services</Link>
          <Link className="footer-item" to="/">Premium</Link>
          <Link className="footer-item" to="/">Top IMDB</Link>
          <Link className="footer-item" to="/">About us</Link>
          <Link className="footer-item" to="/">Privacy policy</Link>
        </div>
        
      </div>
    </div>
  );
};

export default Footer;
