import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import HeroSlide from "./HeroSlide";
import PartnerSlide from "./PartnerSlide";
import SecuritySlide from "./SecuritySlide";

const slides = [
    HeroSlide,
    PartnerSlide,
    SecuritySlide
];

const HomeCarousel = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [outgoingSlide, setOutgoingSlide] = useState(null);
    const [direction, setDirection] = useState(1);

    const goToSlide = (nextSlide, nextDirection) => {
        
        if (nextSlide === activeSlide || outgoingSlide !== null) return;

        setDirection(nextDirection);
        setOutgoingSlide(activeSlide);
        setActiveSlide(nextSlide);
    };

    const goNext = () => {
        goToSlide((activeSlide + 1) % slides.length, 1);
    };

    const goPrevious = () => {
        goToSlide(
            (activeSlide - 1 + slides.length) % slides.length,
            -1
        );
    };

    useEffect(() => {
        const timer = setTimeout(goNext, 15000);

        return () => clearTimeout(timer);
    }, [activeSlide, outgoingSlide]);

    useEffect(() => {
        if (outgoingSlide === null) return;

        const timer = setTimeout(() => {
            setOutgoingSlide(null);
        }, 700);

        return () => clearTimeout(timer);
    }, [outgoingSlide]);

    return (
        <div className="w-full">
            <div className="relative min-h-170 overflow-hidden md:min-h-115">
                {slides.map((Slide, index) => {
                    const isActive = index === activeSlide;
                    const isOutgoing = index === outgoingSlide;

                    let position = "translate-x-full opacity-0";

                    if (isActive) {
                        position = "translate-x-0 opacity-100";
                    } else if (isOutgoing) {
                        position =
                            direction === 1
                                ? "-translate-x-full opacity-0"
                                : "translate-x-full opacity-0";
                    } else if (direction === -1) {
                        position = "-translate-x-full opacity-0";
                    }

                    return (
                        <div key={index}
                            className={`flex items-center justify-around absolute inset-0 w-full transition-[transform,opacity] duration-700 ease-in-out ${position}`}
                        >
                            <Slide />
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 flex items-center justify-center gap-5">
                <button className="rounded-full border border-white/10 p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
                    onClick={goPrevious}
                    aria-label="Previous slide"
                >
                    <FiChevronLeft size={20} />
                </button>

                <div className="flex items-center gap-2">
                    {slides.map((_, index) => (
                        <button key={index}
                            onClick={() =>
                                goToSlide(
                                    index,
                                    index > activeSlide ? 1 : -1
                                )
                            }
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={
                                index === activeSlide ? "true" : undefined
                            }
                            className={`h-2 rounded-full transition-all duration-300 ${index === activeSlide
                                ? "w-6 bg-violet-400"
                                : "w-2 bg-white/25 hover:bg-white/50"
                                }`}
                        />
                    ))}
                </div>

                <button className="rounded-full border border-white/10 p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
                    onClick={goNext}
                    aria-label="Next slide"
                >
                    <FiChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default HomeCarousel;