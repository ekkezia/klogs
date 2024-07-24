import React from 'react';
import InteractiveCssCubes from '../../_ui/interactive-animation/interactive-css-cubes.component';
import { HEADING_HEIGHT, MAX_CONTENT_VIEWPORT_HEIGHT } from '@/styles/shared';

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

  return (
    <div className="relative w-full flex justify-center items-center overflow-y-hidden"
    style={{
      height: `calc(${MAX_CONTENT_VIEWPORT_HEIGHT} - ${HEADING_HEIGHT})`,
      maxHeight: maxHeight
    }}
    >
      <InteractiveCssCubes animated />
    </div>
  );
};

export default Loading;
