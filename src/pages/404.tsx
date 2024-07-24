/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import {
  HORIZONTAL_BAR_HEIGHT,
  INNER_BAR_WIDTH,
  INNER_BAR_WIDTH_LG,
  MAX_CONTENT_VIEWPORT_HEIGHT,
  MAX_CONTENT_WRITE_WIDTH,
  MAX_CONTENT_WRITE_WIDTH_LG,
  OUTER_BAR_WIDTH,
  OUTER_BAR_WIDTH_LG,
  Z_INDEX_ABOVE,
  Z_INDEX_BASE,
} from '../components/_ui/Layout';
import InteractiveCssCubes from '../components/_ui/interactive-animation/interactive-css-cubes.component';
import CustomHead from '../components/organism/custom-head/custom-head.component';

const Error: React.FC = () => {
  const theme = useTheme();
  const styles = {
    container: css`
      overflow-y: hidden;
      position: absolute;
      top: ${HORIZONTAL_BAR_HEIGHT};
      left: calc(${OUTER_BAR_WIDTH} + ${INNER_BAR_WIDTH});
      width: ${MAX_CONTENT_WRITE_WIDTH};
      min-height: ${MAX_CONTENT_VIEWPORT_HEIGHT};
      display: flex;
      justify-content: center;
      align-items: center;
      @media (max-width: 1200px) {
        left: calc(${OUTER_BAR_WIDTH_LG} + ${INNER_BAR_WIDTH_LG});
        width: ${MAX_CONTENT_WRITE_WIDTH_LG};
        min-height: ${MAX_CONTENT_VIEWPORT_HEIGHT};
      }
      @media (max-width: 600px) {
        left: 0;
        width: 100vw;
        min-height: ${MAX_CONTENT_VIEWPORT_HEIGHT};
      }
    `,
    textContainer: css`
      width: 100%;
      height: ${MAX_CONTENT_VIEWPORT_HEIGHT};
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      opacity: 1;
      transform: translateY(0px);
      transition: opacity 1s, transform 300ms;
      z-index: ${1 * Z_INDEX_ABOVE + Z_INDEX_BASE};
      pointer-events: none;
      padding: ${theme.spacing(2)};
    `,
  };

  return (
    <div css={styles.container}>
      <CustomHead title="Page Not Found | ParallelChain Lab" />
      <InteractiveCssCubes color={theme?.palette?.PCLab?.tertiary?.default} />
      <Box css={styles.textContainer}>
        <Typography
          variant="h3"
          color={theme?.palette?.PCLab?.neutral?.grey}
          textAlign="center"
          textTransform="uppercase"
        >
          Oops!
        </Typography>
        <Typography
          variant="h5"
          color={theme?.palette?.PCLab?.neutral?.grey}
          textAlign="center"
          textTransform="uppercase"
        >
          The page took a detour.
        </Typography>
        <Typography
          variant="h5"
          color={theme?.palette?.PCLab?.neutral?.grey}
          textAlign="center"
          textTransform="uppercase"
        >
          Explore relevant contents via the navbar ↗
        </Typography>
      </Box>
    </div>
  );
};

export default Error;
