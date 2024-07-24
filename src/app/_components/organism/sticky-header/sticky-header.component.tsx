/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box } from '@mui/material';
import BackButton from '../../atoms/buttons/back-button.component';
import { IFunction } from '../../../../types/shared';
import ContentBox from '../../atoms/box/content-box.component';
import {
  HORIZONTAL_BAR_HEIGHT,
  Z_INDEX_ABOVE,
  Z_INDEX_BASE,
  Z_INDEX_FIXED_BARS,
} from '../../_ui/Layout';

export const STICKY_HEADER_HEIGHT_XS = '40px';
export const STICKY_HEADER_HEIGHT_MD = '120px';

interface IStickyHeaderProps {
  height?: {
    xs?: string;
    md?: string;
  };
  children: React.ReactNode;
  withoutBackButton?: boolean;
  onCloseModal?: IFunction;
}

const StickyHeader: React.FC<IStickyHeaderProps> = ({
  height,
  children,
  withoutBackButton,
  onCloseModal,
}) => {
  return (
    <Box
      position="sticky"
      top={HORIZONTAL_BAR_HEIGHT}
      zIndex={Z_INDEX_ABOVE + Z_INDEX_BASE}
    >
      <ContentBox
        verticalContent={
          <Box height="100%" zIndex={Z_INDEX_FIXED_BARS}>
            {!withoutBackButton && onCloseModal && (
              <BackButton variant="secondary" action={onCloseModal} />
            )}
          </Box>
        }
        mainContent={
          <Box
            display="flex"
            alignItems="center"
            height={{
              xs: height?.xs ?? STICKY_HEADER_HEIGHT_XS,
              md: height?.md ?? STICKY_HEADER_HEIGHT_MD,
            }}
          >
            {children}
          </Box>
        }
      />
    </Box>
  );
};

export default StickyHeader;
