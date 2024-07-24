/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { HEADING_HEIGHT, MAX_CONTENT_VIEWPORT_HEIGHT } from '../../_ui/Layout';
import InteractiveCssCubes from '../../_ui/interactive-animation/interactive-css-cubes.component';

interface ILoadingProps {
  height?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  maxHeight?: string;
}

const Loading: React.FC<ILoadingProps> = ({ height, maxHeight }) => {
  const styles = {
    container: css`
      position: relative;
      height: ${(height && height.xl) ??
      `calc(${MAX_CONTENT_VIEWPORT_HEIGHT} - ${HEADING_HEIGHT})`};
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow-y: hidden;
      max-height: ${maxHeight ?? ''};
      @media (max-width: 1200px) {
        height: ${(height && height.lg) ??
        `calc(${MAX_CONTENT_VIEWPORT_HEIGHT} - ${HEADING_HEIGHT})`};
      }
      @media (max-width: 900px) {
        height: ${(height && height.md) ??
        `calc(${MAX_CONTENT_VIEWPORT_HEIGHT} - ${HEADING_HEIGHT})`};
      }
      @media (max-width: 600px) {
        height: ${(height && height.sm) ??
        `calc(${MAX_CONTENT_VIEWPORT_HEIGHT} - ${HEADING_HEIGHT})`};
      }
      @media (max-width: 425px) {
        height: ${(height && height.xs) ??
        `calc(${MAX_CONTENT_VIEWPORT_HEIGHT} - ${HEADING_HEIGHT})`};
      }
    `,
  };

  return (
    <div css={styles.container}>
      <InteractiveCssCubes animated />
    </div>
  );
};

export default Loading;
