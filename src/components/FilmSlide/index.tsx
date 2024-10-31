import React, { useEffect, useRef, useState } from 'react';
import { FilmSlideProps } from './lib/Type';
import { Images } from '../../assets/images';

const FilmSlide: React.FC<FilmSlideProps> = ({
    title,
    description,
    backgroundImage,
    posterImage,
    onWatchNow,
    onWatchTrailer,
}) => {
    const slideRef = useRef<HTMLDivElement | null>(null);

    // State: Handle image loading error for poster image
    const [posterSrc, setPosterSrc] = useState(posterImage || Images.default_image);
    const [bgImageSrc, setBgImageSrc] = useState(backgroundImage || Images.default_image);

    // Handle image error for poster image
    const handlePosterError = () => {
        setPosterSrc(Images.noImageVertical); // Fallback to noImage if there's an error
    };

    // Handle image error for background image
    const handleBgImageError = () => {
        setBgImageSrc(Images.noImage); // Fallback to noImage if there's an error
    };

    useEffect(() => {
        const slideElement = slideRef.current;

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (slideElement) {
                        slideElement.querySelectorAll('.animated').forEach((el) => {
                            el.classList.remove('hidden');
                            el.classList.add('animate-bounceIn');
                        });
                    }
                } else {
                    if (slideElement) {
                        slideElement.querySelectorAll('.animated').forEach((el) => {
                            el.classList.remove('animate-bounceIn');
                            el.classList.add('hidden');
                        });
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5, // Trigger when 50% of the element is visible
        });

        if (slideElement) {
            observer.observe(slideElement);
        }

        // Cleanup on unmount
        return () => {
            if (slideElement) {
                observer.unobserve(slideElement);
            }
        };
    }, []);

    return (
        <div className="swiper-slide" ref={slideRef} style={{ width: '100%' }}>
            <div
                className="animate-parallax relative h-100 md:h-[36rem] lg:h-[52rem] px-4 md:px-12 object-cover py-12 md:py-32 flex justify-center bg-center bg-no-repeat before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-black/60 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-28 after:bg-gradient-to-t after:from-black-main after:to-transparent"
                style={{
                    backgroundImage: `url(${bgImageSrc})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'crisp-edges',
                }}
            >
                {/* Hidden image to handle background image error */}
                <img src={bgImageSrc} alt="Background" onError={handleBgImageError} style={{ display: 'none' }} />

                <div className="container mx-auto z-10 h-fit flex items-center justify-between">
                    <div className="w-full lg:w-2/3 flex flex-col items-start">
                        <h2 className="font-bold text-4xl md:text-6xl lg:text-8xl text-white animated hidden text-left">
                            {title}
                        </h2>
                        <p className="font-medium text-white text-xs md:text-xl my-12 animated hidden text-left">
                            {description}
                        </p>
                        <div className="flex text-white animated hidden">
                            <button className="btn-lg btn-primary mr-4" onClick={onWatchNow}>
                                Watch now
                            </button>
                            <button className="btn-lg btn-default" onClick={onWatchTrailer}>
                                Watch trailer
                            </button>
                        </div>
                    </div>

                    <div className="hidden px-4 lg:block lg:w-1/3 ">
                        <img
                            className="w-96 rounded-3xl animated hidden poster"
                            src={posterSrc}
                            alt="Poster"
                            style={{ objectFit: 'cover' }}
                            loading="lazy"
                            onError={handlePosterError} // Handle poster image error
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { FilmSlide };
