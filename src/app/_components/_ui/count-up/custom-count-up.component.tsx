'use client'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useTheme } from '@mui/material';
import CountUp from 'react-countup';
import { IFunction } from '@/types/shared-types';

interface ICustomCountUpProps {
  number: number;
  color?: string;
  delay?: number;
  duration?: number;
  redraw?: boolean;
  onEnd?: IFunction;
}
const CustomCountUp: React.FC<ICustomCountUpProps> = ({
  number,
  color,
  delay,
  duration,
  redraw,
  onEnd,
}) => {
  const theme = useTheme();
  const styles = {
    countUpNumber: css`
      font-size: 72px;
      font-weight: 700;
      color: ${color ?? theme?.palette?.PCLab?.primary?.default};
      @media (max-width: 900px) {
        font-size: 48px;
      }
    `,
    countUpIsFinished: css`
      color: ${color ?? theme?.palette?.PCLab?.primary?.default};
    `,
    countUpIsNotFinished: css`
      color: ${theme?.palette?.PCLab?.tertiary?.default};
    `,
  };
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   if (window.onload) {
  //     setIsLoaded(true);
  //   }
  // }, []);

  return (
    <>
      {/* {isLoaded && ( */}
      <CountUp
        start={0}
        end={number}
        duration={duration ?? 2}
        delay={delay ?? 0}
        enableScrollSpy
        useEasing={false}
        onEnd={onEnd}
        redraw={redraw}
        css={css`
          ${styles.countUpNumber};
        `}
      />
      {/* )} */}
    </>
  );
};

export default CustomCountUp;
