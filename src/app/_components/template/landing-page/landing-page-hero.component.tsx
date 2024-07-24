/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { RefObject, useEffect, useRef } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import {
  INNER_BAR_WIDTH,
  INNER_BAR_WIDTH_LG,
  MAX_CONTENT_VIEWPORT_HEIGHT,
  MAX_CONTENT_WRITE_WIDTH,
  MAX_CONTENT_WRITE_WIDTH_LG,
  MAX_CONTENT_WRITE_WIDTH_SM,
  OUTER_BAR_WIDTH,
  OUTER_BAR_WIDTH_LG,
  OUTER_BAR_WIDTH_SM,
  Z_INDEX_ABOVE,
  Z_INDEX_BASE,
  Z_INDEX_FIXED_BARS,
} from '../../_ui/Layout';
import CustomCountUp from '../../_ui/count-up/custom-count-up.component';
import Image from 'next/image';
import { HERO_TOP, HERO_TOP_SM } from '@/app';
import useScrollPosition from '@/hooks/useScrollPosition';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import useBoolean from '@/hooks/useBoolean';
import { breathe } from '@/app/animations';

export const ANIMATION_DURATION = 3;

const LandingPageHero: React.FC = () => {
  const theme = useTheme();
  const styles = {
    countUp: css`
      display: flex;
      align-items: center;
    `,
    titleContainer: css`
      position: relative;
      transform: translateX(${theme.spacing(2)});
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 600px) {
        transform: translateX(${theme.spacing(4)});
      }
    `,
    imageContainer: css`
      position: relative;
      width: 70px;
      height: 70px;
      @media (max-width: 900px) {
        width: 60px;
        height: 60px;
      }
    `,
    textContainer: css`
      width: ${MAX_CONTENT_WRITE_WIDTH};
      height: ${MAX_CONTENT_VIEWPORT_HEIGHT};
      position: absolute;
      top: ${HERO_TOP};
      left: calc(${OUTER_BAR_WIDTH} + ${INNER_BAR_WIDTH});
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      opacity: 1;
      transform: translateY(0px);
      transition: opacity 1s, transform 300ms;
      z-index: ${Z_INDEX_ABOVE * 1 + Z_INDEX_FIXED_BARS};
      // pointer-events: none;
      @media (max-width: 1200px) {
        width: ${MAX_CONTENT_WRITE_WIDTH_LG};
        left: calc(${OUTER_BAR_WIDTH_LG} + ${INNER_BAR_WIDTH_LG});
      }
      @media (max-width: 600px) {
        top: ${HERO_TOP_SM};
        width: ${MAX_CONTENT_WRITE_WIDTH_SM};
        left: calc(${OUTER_BAR_WIDTH_SM});
      }
    `,
    scrollText: css`
      display: flex;
      justify-content: center;
      width: 100%;
      color: ${theme?.palette?.PCLab?.products?.parallelWallet?.default};
      z-index: ${Z_INDEX_ABOVE * 1 + Z_INDEX_FIXED_BARS};
      position: absolute;
      bottom: ${HERO_TOP};
      transition: all 1s;
      opacity: 1;
      animation: ${breathe} 4s ease infinite;
    `,
    infinity: css`
      font-size: 81px !important;
      opacity: 1;
      // transform: rotate(-90deg);
    `,
  };

  const textContainerRef = useRef() as RefObject<HTMLDivElement>;
  const scrollTextRef = useRef() as RefObject<HTMLDivElement>;
  const countUpRef = useRef() as RefObject<HTMLDivElement>;

  const { scrollPosition } = useScrollPosition();

  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    // Pointer Events
    if (scrollPosition > 0) {
      if (textContainerRef.current) {
        textContainerRef.current.style.pointerEvents = 'auto';
        textContainerRef.current.style.opacity = '0';
      }
    } else {
      setCountUpIsNotFinished(); // redraw count up
      if (textContainerRef.current) {
        textContainerRef.current.style.pointerEvents = 'none';
        textContainerRef.current.style.opacity = '1';
      }
    }
    // Display
    if (scrollPosition <= windowDimensions.y / 4) {
      if (textContainerRef.current) {
        textContainerRef.current.style.zIndex = `${
          1 * Z_INDEX_ABOVE + Z_INDEX_FIXED_BARS
        }`;
      }
      if (scrollTextRef.current) scrollTextRef.current.style.opacity = '1';
    } else {
      if (textContainerRef.current) {
        textContainerRef.current.style.zIndex = `${Z_INDEX_BASE}`;
      }
    }
  }, [scrollPosition, windowDimensions.y]);

  const {
    setTrue: setCountUpIsFinished,
    setFalse: setCountUpIsNotFinished,
    value: countUpIsFinished,
  } = useBoolean(false);

  const handleCountUpIsFinished = () => {
    setTimeout(() => {
      setCountUpIsFinished();
    }, (ANIMATION_DURATION / 10) * 1000);
  };

  return (
    <main>
      <div css={styles.textContainer} ref={textContainerRef}>
        {/* <Box css={styles.imageContainer}>
          <Image
            src={'/images/logo/parallelchain-logo-black.png'}
            layout="fill"
            objectFit="contain"
            alt="ParallelChain Logo"
            priority
          />
        </Box> */}
        <Box display="flex" css={styles.titleContainer}>
          <Typography
            variant="h1"
            textAlign="left"
            marginRight={theme.spacing(2)}
          >
            Web
          </Typography>

          {!countUpIsFinished ? (
            <div css={styles.countUp} ref={countUpRef}>
              <CustomCountUp
                number={10}
                delay={0}
                duration={ANIMATION_DURATION}
                redraw={scrollPosition <= 0}
                onEnd={handleCountUpIsFinished}
              />
            </div>
          ) : (
            <Box css={styles.imageContainer}>
              <Image
                src={`/images/landing-page/animation/infinity.svg`}
                layout="fill"
                objectFit="contain"
                alt="infinity"
                placeholder="blur"
                blurDataURL={`data:image.png`}
                priority
              />
            </Box>
          )}
        </Box>
        <div css={styles.scrollText} ref={scrollTextRef}>
          <Typography variant="body1">Scroll to discover</Typography>
        </div>
      </div>
    </main>
  );
};

export default LandingPageHero;
