import { css } from '@emotion/react';
import React from 'react';
import {
  HORIZONTAL_BAR_HEIGHT,
  INNER_BAR_WIDTH,
  INNER_BAR_WIDTH_LG,
  INNER_BAR_WIDTH_SM,
  Z_INDEX_FIXED_BARS,
} from '@/styles/shared';
import { twMerge } from 'tailwind-merge';

interface IContentBoxProps {
  padded?: boolean;
  verticalContent?: React.ReactNode;
  mainContent: React.ReactNode;
  noBorderBottom?: boolean;
  sticky?: boolean;
}

const ContentBox: React.FC<IContentBoxProps> = ({
  padded,
  verticalContent,
  mainContent,
  noBorderBottom,
  sticky,
}) => {
  return (
    <div className={
      twMerge(
        sticky ? "sticky z-10" : "relative",
        noBorderBottom ? '' : 'border-b-2 border-b-primary',
        'w-full h-fit flex'
      )
    }
    style={{
        top: sticky ? HORIZONTAL_BAR_HEIGHT : ''
      }}
    >
      <div
        className="flex justify-end border-r-2 border-primary"
        style={{
          width: INNER_BAR_WIDTH,
          minWidth: INNER_BAR_WIDTH,
        }}
      >
        {verticalContent ?? ''}
      </div>

      <div
        className={twMerge(
          padded ? 'p-2' : 'p-0'
        )}
        style={{
          width: `calc(100% - ${INNER_BAR_WIDTH})`
        }}
      >
        {mainContent}
      </div>
    </div>
  );
};

export default ContentBox;
