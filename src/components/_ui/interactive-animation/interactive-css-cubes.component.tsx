'use client'

import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from '../../../hooks/useWindowDimensions';
import { gsap } from 'gsap';

const CUBE_SIZE = 48;

interface IInteractiveCssCubesProps {
  color?: string;
  animated?: boolean;
  cubeSize?: number;
}

const InteractiveCssCubes: React.FC<IInteractiveCssCubesProps> = ({
  color,
  animated,
  cubeSize = CUBE_SIZE,
}) => {
  const [numberOfCubes, setNumberOfCubes] = useState({
    x: 0,
    y: 0,
  });

  const windowDimensions = useWindowDimensions();
  const containerRef = useRef() as RefObject<HTMLDivElement>;

  useEffect(() => {
    setNumberOfCubes({
      x: Math.floor(windowDimensions.x / CUBE_SIZE),
      y: Math.floor(windowDimensions.y / CUBE_SIZE),
    });
  }, [windowDimensions]);

  useEffect(() => {
    if (animated) {
      const ctx = gsap.context(() => {
        var tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

        tl.to('.cube', {
          background: color ?? 'lightgrey',
          duration: 0.1,
          stagger: 0.1,
        });
        tl.to('.cube', {
          background: 'blue',
          duration: 0.01,
          stagger: 0.1,
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [numberOfCubes]);

  return (
    <div className="absolute top-0 left-0 flex flex-wrap justify-center items-center" ref={containerRef}>
      {[...Array(numberOfCubes.x * numberOfCubes.y)].map((_, index) => {
        return <div key={index} className="cube border border-t-[0.5] border-r-[0.5] border-b-[0.5] border-l-[0.5] border-primary duration-1000 cursor-pointer bg-white hover:bg-transparent" 
        style={{
          width: cubeSize,
          height: cubeSize
        }} 
        />;
      })}
    </div>
  );
};

export default InteractiveCssCubes;
