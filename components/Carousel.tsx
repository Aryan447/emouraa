'use client';

import { useState, useEffect, useCallback, ReactNode } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export default function Carousel({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className = '',
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images.length, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images.length, isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;
    
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, goToNext, images.length]);

  if (images.length === 0) {
    return (
      <div className={`relative aspect-[4/5] md:aspect-[16/9] bg-gray-100 ${className}`}>
        <div className="flex items-center justify-center h-full text-gray-400">
          No images available
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden group ${className}`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(autoPlay)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      {autoPlay && images.length > 1 && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/20">
          <motion.div
            className="h-full bg-white/80"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
            key={currentIndex}
          />
        </div>
      )}

      {showArrows && images.length > 1 && (
        <>
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ opacity: isAutoPlaying ? 0 : 1, x: 0 }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 rounded-full"
            onClick={goToPrev}
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ opacity: isAutoPlaying ? 0 : 1, x: 0 }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 rounded-full"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </>
      )}

      {showDots && images.length > 1 && (
        <div className="absolute bottom-4 md:left-1/2 md:-translate-x-1/2 md:bottom-6 left-4 flex gap-2">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 md:w-8 bg-white'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}