'use client'

import React, { RefObject, useEffect, useRef } from 'react';
import InteractiveCssCubes from '../../_ui/interactive-animation/interactive-css-cubes.component';
import useScrollPosition from '../../../hooks/useScrollPosition';
import { useWindowDimensions } from '../../../hooks/useWindowDimensions';

const LandingPageAnimation: React.FC = () => {
  const interactiveCubesContainerRef = useRef() as RefObject<HTMLDivElement>;

  const { scrollPosition } = useScrollPosition();

  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    // Transform
    if (scrollPosition > 0) {
      if (interactiveCubesContainerRef.current)
        interactiveCubesContainerRef.current.style.transform = `translateY(-${
          windowDimensions.y * 1.1
        }px)`;
    } else {
      if (interactiveCubesContainerRef.current)
        interactiveCubesContainerRef.current.style.transform =
          'translateY(0px)';
    }
    // zIndex
    if (scrollPosition <= windowDimensions.y / 2) {
      if (interactiveCubesContainerRef.current) {
        interactiveCubesContainerRef.current.style.zIndex = '9';
      }
    } else {
      if (interactiveCubesContainerRef.current) {
        interactiveCubesContainerRef.current.style.zIndex = '1';
      }
    }
  }, [scrollPosition, windowDimensions.y]);

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen max-w-screen flex justify-center items-center z-[9] duration-1000"
      ref={interactiveCubesContainerRef}
    >
      <InteractiveCssCubes
        // animated={scrollPosition <= 0}
      />
    </div>
  );
};

export default LandingPageAnimation;
