import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import clsx from "clsx";

const images = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",  // Beach waves
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",  // Mountain peak
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",  // Forest sunlight
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",  // Lake & cabin
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",  // Hot air balloons (Cappadocia)
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",  // Santorini rooftops
    "https://images.unsplash.com/photo-1552089123-1e062b17004f",     // Tropical waterfall
  ];
  
const ImageTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index: number) => {
    if (containerRef.current) {
      const slide = containerRef.current.children[index] as HTMLElement;
      if (slide) {
        slide.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        setActiveIndex(index);
      }
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Scroll when activeIndex changes
  useEffect(() => {
    goToSlide(activeIndex);
  }, [activeIndex]);

  return (
    <div className="relative w-full">
      {/* Carousel Images */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-hidden px-6 py-4 scroll-smooth snap-x snap-mandatory"
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-full md:w-[80%] lg:w-[60%] snap-center rounded-2xl shadow-lg overflow-hidden border border-gray-300 bg-white"
          >
            <img
              src={src}
              alt={`location-${idx}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Bullet Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, idx) => (
          <Button
            key={idx}
            onClick={() => goToSlide(idx)}
            className="min-w-0 p-0"
          >
            <span
              className={clsx(
                "block w-3 h-3 rounded-full transition-all duration-300",
                activeIndex === idx
                  ? "bg-sky-600 w-4 h-4"
                  : "bg-gray-400 hover:bg-sky-400"
              )}
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ImageTransition;
