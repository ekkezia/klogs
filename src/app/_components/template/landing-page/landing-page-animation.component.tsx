'use client'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { RefObject, useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import InteractiveCssCubes from '../../_ui/interactive-animation/interactive-css-cubes.component';
import {
  Z_INDEX_ABOVE,
  Z_INDEX_BASE,
  Z_INDEX_FIXED_BARS,
} from '../../_ui/Layout';
import useScrollPosition from '@/hooks/useScrollPosition';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';

const LandingPageAnimation: React.FC = () => {
  const theme = useTheme();
  const styles = {
    container: css`
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: ${1 * Z_INDEX_ABOVE + Z_INDEX_FIXED_BARS};
    `,
    interactiveCubesContainer: css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: ${theme?.palette?.PCLab?.background?.primary};
      transform: translateY(0px);
      transition: all 1s;
      z-index: ${2 * Z_INDEX_ABOVE + Z_INDEX_FIXED_BARS};
      pointer-events: auto;
    `,
    textContainer: css`
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      opacity: 1;
      transform: translateY(0px);
      transition: opacity 1s, transform 300ms;
    `,
  };

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
        interactiveCubesContainerRef.current.style.zIndex = `${
          1 * Z_INDEX_ABOVE + Z_INDEX_FIXED_BARS
        }`;
      }
    } else {
      if (interactiveCubesContainerRef.current) {
        interactiveCubesContainerRef.current.style.zIndex = `${
          1 * Z_INDEX_ABOVE + Z_INDEX_BASE
        }`;
      }
    }
  }, [scrollPosition, windowDimensions.y]);

  return (
    <Box
      css={styles.interactiveCubesContainer}
      ref={interactiveCubesContainerRef}
    >
      <InteractiveCssCubes
        color={theme?.palette?.PCLab?.primary?.lighter}
        // animated={scrollPosition <= 0}
      />
    </Box>
  );
};

export default LandingPageAnimation;
