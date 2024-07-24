/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import InteractiveCssCubes from '../../_ui/interactive-animation/interactive-css-cubes.component';
import { HORIZONTAL_BAR_HEIGHT } from '../../_ui/Layout';
import ContentBox from '../../atoms/box/content-box.component';

/* Extra component that should be wrapped in ContentBox
   at the Bottom to allow ScrollTrigger to happen on the previous component */

interface IEndComponent {
  color?: string;
  cubeSize?: number;
}

const EndComponent: React.FC<IEndComponent> = ({ color, cubeSize }) => {
  const styles = {
    container: css`
      position: relative;
      height: ${cubeSize ? `${cubeSize}px` : HORIZONTAL_BAR_HEIGHT};
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow-y: hidden;
    `,
  };

  return (
    <ContentBox
      mainContent={
        <div css={styles.container}>
          <InteractiveCssCubes color={color} cubeSize={cubeSize} />
        </div>
      }
    />
  );
};

export default EndComponent;
