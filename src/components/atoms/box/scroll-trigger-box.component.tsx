/** @jsxImportSource @emotion/react */
// @ts-nocheck
import { Box } from '@mui/material';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

import React, { useEffect, useRef } from 'react';

type IFunction = (...args: any[]) => any;

interface ScrollTriggerBoxProps {
  index?: number | string;
  handleTrigger: IFunction;
  children: React.ReactNode;
}

const ScrollTriggerBox: React.FC<ScrollTriggerBoxProps> = ({
  index,
  handleTrigger,
  children,
}) => {
  gsap.registerPlugin(ScrollTrigger);

  // Scroll Trigger
  const containerRef = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      end: 'bottom bottom',
      onEnter: () => handleTrigger(index),
      onEnterBack: () => handleTrigger(index),
    });

    return () => {
      st.kill();
    };
  }, []);

  return <Box ref={containerRef}>{children}</Box>;
};

export default ScrollTriggerBox;
