/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { Z_INDEX_MODAL } from '../Layout';

interface ICustomMouseProps {
  color?: string;
}

interface IMouseEvent {
  clientX: number;
  clientY: number;
}

const CustomMouse: React.FC<ICustomMouseProps> = ({ color }) => {
  const theme = useTheme();
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });
  // Interactive Mouse
  useEffect(() => {
    const handleWindowMouseMove = (event: IMouseEvent) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  const styles = {
    container: css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: ${Z_INDEX_MODAL};
      background: transparent;
      pointer-events: none;
    `,
    mouse: css`
      position: fixed;
      background-color: ${color ?? theme?.palette?.PCLab?.primary?.lighter};
      transition: all 100ms;
      pointer-events: none;
    `,
    vertical: css`
      width: 0.5px;
      height: 100vh;
      left: ${mouse.x}px;
    `,
    horizontal: css`
      width: 100vw;
      height: 0.5px;
      top: ${mouse.y}px;
    `,
  };

  return (
    <div css={styles.container}>
      {/* vertical line */}
      <div
        css={css`
          ${styles.mouse};
          ${styles.vertical};
        `}
      />
      {/* horizontal line */}
      <div
        css={css`
          ${styles.mouse};
          ${styles.horizontal};
        `}
      />
    </div>
  );
};

export default CustomMouse;
