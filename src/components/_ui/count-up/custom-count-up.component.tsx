import React from 'react';
import CountUp from 'react-countup';
import { IFunction } from '@/types/shared';

interface ICustomCountUpProps {
  number: number;
  delay?: number;
  duration?: number;
  redraw?: boolean;
  onEnd?: IFunction;
}
const CustomCountUp: React.FC<ICustomCountUpProps> = ({
  number,
  delay,
  duration,
  redraw,
  onEnd,
}) => {
  return (
      <CountUp
        start={0}
        end={number}
        duration={duration ?? 1}
        delay={delay ?? 0}
        enableScrollSpy
        useEasing={false}
        onEnd={onEnd}
        redraw={redraw}
        className="body1 text-primary"
      />
  );
};

export default CustomCountUp;
