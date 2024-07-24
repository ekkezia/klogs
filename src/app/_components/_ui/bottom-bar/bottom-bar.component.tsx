/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  HORIZONTAL_BAR_HEIGHT,
  MAXWIDTH,
  INNER_BAR_WIDTH,
  OUTER_BAR_WIDTH,
  INNER_BAR_WIDTH_SM,
  OUTER_BAR_WIDTH_LG,
  INNER_BAR_WIDTH_LG,
  Z_INDEX_FIXED_BARS,
} from '@/app/shared-layout-vars';
import Footer from '../../organism/footer/footer.component';

const BottomBar: React.FC = () => {
  const theme = useTheme();

  const styles = {
    container: css`
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: ${Z_INDEX_FIXED_BARS};
      width: 100vw;
      height: ${HORIZONTAL_BAR_HEIGHT};
      display: flex;
      justify-content: center;
      border-top: 1px solid ${theme.palette?.PCLab?.tertiary?.default};
    `,
    innerContainer: css`
      width: 100%;
      max-width: ${MAXWIDTH};
      height: ${HORIZONTAL_BAR_HEIGHT};
      display: flex;
    `,
    backdropFilter: css`
      backdrop-filter: blur(4px);
      background: ${theme.palette?.PCLab?.background?.transparent};
    `,
    logoContainer: css`
      width: 100%;
      height: 100%;
      max-height: ${HORIZONTAL_BAR_HEIGHT};
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    outerLeftBar: css`
      width: ${OUTER_BAR_WIDTH};
      min-width: ${OUTER_BAR_WIDTH};
      max-width: ${OUTER_BAR_WIDTH};
      height: 100%;
      border-right: 1px solid ${theme.palette?.PCLab?.tertiary?.default};
      display: block;
      @media (max-width: 1200px) {
        min-width: ${OUTER_BAR_WIDTH_LG};
        width: ${OUTER_BAR_WIDTH_LG};
      }
      @media (max-width: 600px) {
        display: none;
      }
    `,
    innerLeftBar: css`
      width: ${INNER_BAR_WIDTH};
      min-width: ${INNER_BAR_WIDTH};
      max-width: ${INNER_BAR_WIDTH};
      height: 100%;
      border-right: 1px solid ${theme.palette?.PCLab?.tertiary?.default};
      @media (max-width: 1200px) {
        min-width: ${INNER_BAR_WIDTH_LG};
        width: ${INNER_BAR_WIDTH_LG};
      }
      @media (max-width: 600px) {
        min-width: ${INNER_BAR_WIDTH_SM};
        width: ${INNER_BAR_WIDTH_SM};
      }
    `,
    innerRightBar: css`
      width: ${INNER_BAR_WIDTH};
      min-width: ${INNER_BAR_WIDTH};
      max-width: ${INNER_BAR_WIDTH};
      height: 100%;
      border-left: 1px solid ${theme.palette?.PCLab?.tertiary?.default};
      @media (max-width: 1200px) {
        min-width: ${INNER_BAR_WIDTH_LG};
        width: ${INNER_BAR_WIDTH_LG};
      }
      @media (max-width: 600px) {
        min-width: ${INNER_BAR_WIDTH_SM};
        width: ${INNER_BAR_WIDTH_SM};
      }
      @media (max-width: 425px) {
        display: none;
      }
    `,
    outerRightBar: css`
      width: ${OUTER_BAR_WIDTH};
      min-width: ${OUTER_BAR_WIDTH};
      max-width: ${OUTER_BAR_WIDTH};
      height: 100%;
      border-left: 1px solid ${theme.palette?.PCLab?.tertiary?.default};
      display: block;
      @media (max-width: 1200px) {
        min-width: ${OUTER_BAR_WIDTH_LG};
        width: ${OUTER_BAR_WIDTH_LG};
      }
      @media (max-width: 600px) {
        display: none;
      }
    `,
    contentBar: css`
      width: 100%;
    `,
  };

  return (
    <div css={styles.container}>
      <div css={styles.innerContainer}>
        <div
          css={css`
            ${styles.outerLeftBar};
          `}
        />

        <div
          css={css`
            ${styles.innerLeftBar};
            ${styles.backdropFilter};
          `}
        />

        <div
          css={css`
            ${styles.contentBar};
            ${styles.backdropFilter};
          `}
        >
          <Footer />
        </div>

        <div
          css={css`
            ${styles.innerRightBar};
          `}
        >
          {/* {navbar} */}
        </div>

        <div
          css={css`
            ${styles.outerRightBar};
          `}
        />
      </div>
    </div>
  );
};

export default BottomBar;
