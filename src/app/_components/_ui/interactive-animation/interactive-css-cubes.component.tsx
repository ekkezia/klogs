/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material';
import { useWindowDimensions } from '../../../../hooks/useWindowDimensions';
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
  cubeSize,
}) => {
  const theme = useTheme();
  const styles = {
    container: css`
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    `,
    cube: css`
      width: ${cubeSize ?? CUBE_SIZE}px;
      height: ${cubeSize ?? CUBE_SIZE}px;
      border: 0.5px solid ${theme?.palette?.PCLab?.tertiary?.default};
      transition: all 1s;
      cursor: pointer;
      background-color: ${theme?.palette?.PCLab?.background?.primary};
      &:hover {
        background-color: ${color ?? theme?.palette?.PCLab?.primary?.default};
        transition: all 1s;
      }
    `,
  };

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
          background: color ?? theme?.palette?.PCLab?.primary?.lighter,
          duration: 0.1,
          stagger: 0.1,
        });
        tl.to('.cube', {
          background: theme?.palette?.PCLab?.background?.primary,
          duration: 0.01,
          stagger: 0.1,
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [numberOfCubes]);

  return (
    <div css={styles.container} ref={containerRef}>
      {[...Array(numberOfCubes.x * numberOfCubes.y)].map((_, index) => {
        return <div css={styles.cube} key={index} className="cube" />;
      })}
    </div>
  );
};

export default InteractiveCssCubes;
