/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from '@emotion/react';
import React from 'react';
import { Box } from '@mui/material';
import {
  GLOBE_RADIUS,
  GLOBE_RADIUS_LG,
  GLOBE_RADIUS_MD,
  GLOBE_RADIUS_SM,
  GLOBE_RADIUS_XS,
  TOGGLE,
} from './toggleData';
import Pivot from './pivot.component';
import Image from 'next/image';
import { rotateZ, down, up } from '../../../../../styles/animation';
import { IFunction } from '../../../../../../types/shared';
import useBreakpoints from '../../../../../hooks/useBreakpoints';

interface IEcosystemToggle {
  activeToggle: number;
  isHovered: boolean;
  onHovered: IFunction;
  onChangeToggle: IFunction;
}

function getMode(mode: string) {
  switch (mode) {
    case 'Mainnet':
      return {
        base: {
          opacity: 1,
        },
        map: {
          opacity: 1,
        },
        dots: {
          opacity: 0,
        },
        connector: {
          opacity: 0,
        },
        stars: {
          opacity: 1,
        },
      };
    case 'Enterprise':
      return {
        base: {
          opacity: 1,
        },
        map: {
          opacity: 0.15,
        },
        dots: {
          opacity: 1,
        },
        connector: {
          opacity: 1,
        },
        stars: {
          opacity: 1,
          animation: css`
            animation: ${up} 2s ease 1;
          `,
        },
      };
    case 'Inter-ParallelChain Protocol':
      return {
        base: {
          opacity: 1,
          animation: css`
            animation: ${rotateZ} 100s linear infinite;
          `,
        },
        map: {
          opacity: 1,
          animation: css`
            animation: ${rotateZ} 100s linear infinite;
          `,
        },
        dots: {
          opacity: 1,
          animation: css`
            animation: ${rotateZ} 100s linear infinite;
          `,
        },
        connector: {
          opacity: 1,
          animation: css`
            animation: ${rotateZ} 100s linear infinite;
          `,
        },
        stars: {
          opacity: 1,
          animation: css`
            animation: ${down} 2s ease 1;
          `,
        },
      };
  }
}

const EcosystemGlobe: React.FC<IEcosystemToggle> = ({
  activeToggle,
  isHovered,
  onHovered,
  onChangeToggle,
}) => {
  const styles = {
    globeContainer: css`
      position: relative;
      width: ${GLOBE_RADIUS}px;
      height: ${GLOBE_RADIUS}px;
      aspect-ratio: 1/1;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 1200px) {
        width: ${GLOBE_RADIUS_LG}px;
        height: ${GLOBE_RADIUS_LG}px;
      }
      @media (max-width: 900px) {
        width: ${GLOBE_RADIUS_MD}px;
        height: ${GLOBE_RADIUS_MD}px;
      }
      @media (max-width: 600px) {
        width: ${GLOBE_RADIUS_SM}px;
        height: ${GLOBE_RADIUS_SM}px;
      }
      @media (max-width: 375px) {
        width: ${GLOBE_RADIUS_XS}px;
        height: ${GLOBE_RADIUS_XS}px;
      }
    `,
    rotateOnMode: css`
      transform: rotateZ(${TOGGLE[activeToggle].rotation}deg);
      transform-origin: center;
      transition: all ease 800ms;
      -webkit-perspective: 1000;
      -webkit-backface-visibility: hidden;
    `,
    rotateOnHover: css`
      transform: rotateZ(${isHovered ? `10deg` : '0deg'});
      transform-origin: center;
      transition: all ease 800ms;
      -webkit-perspective: 1000;
      -webkit-backface-visibility: hidden;
    `,
    ellipseContainer: css`
      transform: translateY(${TOGGLE[0]?.position});
      transition: all 800ms;
      -webkit-perspective: 1000;
      -webkit-backface-visibility: hidden;
    `,
  };

  const { isSmallScreen, isMediumScreen, isLargeScreen } = useBreakpoints();

  return (
    <Box
      css={styles.globeContainer}
      onMouseEnter={onHovered}
      onMouseLeave={onHovered}
    >
      <Box
        position="absolute"
        zIndex={5}
        style={{
          // TODO: this is an URGENT WORKAROUND / MAGIC NUMBER to quickly solve the svg not being aligned center, pls fix
          transform: 'translateY(4px)',
        }}
      >
        {/* <Globe
          src="pivot"
          zIndex={0}
          // animationCss={getMode(TOGGLE[activeToggle].label)?.base.animation}
        /> */}
        <Pivot
          activeToggle={activeToggle}
          isHovered={isHovered}
          radius={
            isSmallScreen
              ? GLOBE_RADIUS_SM
              : isMediumScreen
              ? GLOBE_RADIUS_MD
              : isLargeScreen
              ? GLOBE_RADIUS_LG
              : GLOBE_RADIUS
          }
        />
      </Box>

      <Globe src="base" zIndex={1} />
      <Globe
        src="globe"
        zIndex={2}
        opacity={getMode(TOGGLE[activeToggle].label)?.base.opacity}
        animationCss={getMode(TOGGLE[activeToggle].label)?.base.animation}
      />
      <Globe
        src="map"
        zIndex={3}
        opacity={getMode(TOGGLE[activeToggle].label)?.map.opacity}
        animationCss={getMode(TOGGLE[activeToggle].label)?.map.animation}
      />
      <Globe
        src="network"
        zIndex={3}
        opacity={getMode(TOGGLE[activeToggle].label)?.connector.opacity}
        animationCss={getMode(TOGGLE[activeToggle].label)?.connector.animation}
      />
      <Globe
        src="stars"
        zIndex={4}
        opacity={getMode(TOGGLE[activeToggle].label)?.stars.opacity}
        animationCss={getMode(TOGGLE[activeToggle].label)?.stars.animation}
      />
    </Box>
  );
};

export default EcosystemGlobe;

interface IGlobe {
  src: string;
  zIndex: number;
  opacity?: number;
  transform?: string;
  animationCss?: SerializedStyles;
  delay?: number;
}

const Globe: React.FC<IGlobe> = ({
  src,
  zIndex,
  opacity,
  transform,
  animationCss,
}) => {
  return (
    <Image
      src={`/images/landing-page/ecosystem/toggle/${src}.svg`}
      alt={src}
      layout="fill"
      objectFit="contain"
      className="globe"
      priority
      blurDataURL="data:image.svg"
      style={{
        position: 'absolute',
        zIndex: zIndex,
        opacity: opacity ?? 1,
        transform: transform ?? '',
        transition: 'all 800ms',
        WebkitPerspective: 1000,
        WebkitBackfaceVisibility: 'hidden',
      }}
      css={animationCss ?? ''}
    />
  );
};
