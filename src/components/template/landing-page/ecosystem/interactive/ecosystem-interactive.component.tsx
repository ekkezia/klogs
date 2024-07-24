/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import EcosystemToggle from './ecosystem-interactive-toggle.component';
import EcosystemGlobe from './ecosystem-interactive-globe.component';
import useBoolean from '../../../../../hooks/useBoolean';
import useScrollPosition from '../../../../../hooks/useScrollPosition';
import { HORIZONTAL_BAR_HEIGHT } from '../../../../_ui/Layout';
import { TOGGLE } from './toggleData';

const EcosystemInteractive: React.FC = () => {
  const theme = useTheme();
  const styles = {
    container: css`
      padding: ${theme.spacing(2)};
      height: 300vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      // background: linear-gradient(
      //   180deg,
      //   #fafafa 40%,
      //   #19867f1a 50%,
      //   #1030811a 60%,
      //   #fafafa 100%
      // );
      @media (max-width: 900px) {
        align-items: flex-start;
      }
      // on height >900, it WILL NOT be sticky on scroll and just fit-content
      @media (min-height: 900px) {
        height: fit-content;
      }
    `,
    fixedContainer: css`
      position: sticky;
      top: calc(${HORIZONTAL_BAR_HEIGHT} * 1.5);
      padding-bottom: ${theme.spacing(4)};
      width: 100%;
      // on height >900, it WILL NOT be sticky on scroll and just fit-content
      @media (min-height: 900px) {
        top: 0;
        position: relative;
        // padding-top: ${theme.spacing(16)};
        // padding-bottom: ${theme.spacing(16)};
      }
    `,
    textColor: css`
      background: linear-gradient(
        90deg,
        ${theme?.palette?.PCLab?.primary?.default} 0%,
        ${theme?.palette?.PCLab?.neutral?.black} 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
    `,
  };

  const [activeToggle, setActiveToggle] = useState(0);
  const { value: isHovered, toggle: toggleHovered } = useBoolean(false);

  const containerRef = useRef() as RefObject<HTMLDivElement>;

  const { scrollPosition } = useScrollPosition();

  // TODO: refactor to hooks at utils
  // const [componentHeight, setComponentHeight] = useState(
  //   containerRef?.current?.clientHeight ?? 0,
  // );
  useEffect(() => {
    // only start scrolling when user hits the component top
    if (
      containerRef?.current &&
      scrollPosition > containerRef?.current?.offsetTop
    ) {
      if (
        scrollPosition >=
          containerRef?.current?.offsetTop +
            (containerRef?.current?.clientHeight / TOGGLE.length) * 0 &&
        scrollPosition <
          containerRef?.current?.offsetTop +
            (containerRef?.current?.clientHeight / TOGGLE.length) * 1 -
            containerRef?.current?.clientHeight / 12
      ) {
        //TODO
        setActiveToggle(0);
      }
      if (
        scrollPosition >=
          containerRef?.current?.offsetTop +
            (containerRef?.current?.clientHeight / TOGGLE.length) * 1 -
            containerRef?.current?.clientHeight / 12 && // buffer
        scrollPosition <
          containerRef?.current?.offsetTop +
            (containerRef?.current?.clientHeight / TOGGLE.length) * 2 -
            containerRef?.current?.clientHeight / 12
      ) {
        setActiveToggle(1);
      }
      if (
        scrollPosition >=
        containerRef?.current?.offsetTop +
          (containerRef?.current?.clientHeight / TOGGLE.length) * 2 -
          containerRef?.current?.clientHeight / 12 // buffer
      ) {
        setActiveToggle(2);
      }
    }
  }, [scrollPosition]);

  return (
    <Box css={styles.container} ref={containerRef}>
      <Box css={styles.fixedContainer}>
        <Box width="100%">
          <Typography
            variant="h3"
            css={styles.textColor}
            fontWeight={500}
            marginBottom={{ xs: 2 }}
          >
            Scalable and Infinite
          </Typography>
        </Box>
        <Grid
          container
          display="flex"
          alignItems="center"
          flexDirection={{ xs: 'column-reverse', md: 'row' }}
        >
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={{ xs: 2 }}
          >
            <EcosystemToggle
              activeToggle={activeToggle}
              onChangeToggle={setActiveToggle}
              onHovered={toggleHovered}
            />
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <EcosystemGlobe
              activeToggle={activeToggle}
              isHovered={isHovered}
              onHovered={toggleHovered}
              onChangeToggle={setActiveToggle}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EcosystemInteractive;
