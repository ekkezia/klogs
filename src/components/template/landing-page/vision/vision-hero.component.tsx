/** @jsxImportSource @emotion/react */
import React, { RefObject, useEffect, useRef } from 'react';
import { Typography, useTheme } from '@mui/material';
import DOMPurify from 'isomorphic-dompurify';
import { VISION_DATA } from './visionData';
import {
  Z_INDEX_ABOVE,
  Z_INDEX_BASE,
  Z_INDEX_FIXED_BARS,
} from '../../../_ui/Layout';
import { useWindowDimensions } from '../../../../hooks/useWindowDimensions';
import useScrollPosition from '../../../../hooks/useScrollPosition';

const VisionHero: React.FC = () => {
  const theme = useTheme();
  const { scrollPosition } = useScrollPosition();

  const windowDimensions = useWindowDimensions();

  const ref = useRef() as RefObject<HTMLDivElement>;

  useEffect(() => {
    // zIndex
    if (scrollPosition <= 0) {
      if (ref.current) {
        ref.current.style.zIndex = `${1 * Z_INDEX_ABOVE + Z_INDEX_FIXED_BARS}`;
      }
    } else {
      if (ref.current) {
        ref.current.style.zIndex = `${Z_INDEX_BASE}`;
      }
    }
  }, [scrollPosition, windowDimensions.y]);

  return (
    <>
      <Typography
        variant="h5"
        // lineHeight={2}
        color={theme?.palette?.PCLab?.text?.primary}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(VISION_DATA.tagline),
        }}
        marginBottom={{ xs: 2 }}
        position="relative"
        zIndex={Z_INDEX_ABOVE + Z_INDEX_FIXED_BARS}
        ref={ref}
        paddingRight={{ xs: 3, sm: 0 }}
      />
    </>
  );
};

export default VisionHero;
