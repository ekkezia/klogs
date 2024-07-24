/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Z_INDEX_ABOVE, Z_INDEX_BASE } from '../../../../_ui/Layout';
import { IFunction } from '../../../../../../types/shared';
import {
  ELLIPSE_RADIUS,
  TOGGLE_CONTAINER_PADDING,
  TOGGLE,
  TOGGLE_CONTAINER_HEIGHT,
  TOGGLE_CONTAINER_WIDTH,
  TOGGLE_CONTAINER_WIDTH_SM,
  TOGGLE_CONTAINER_HEIGHT_SM,
  ELLIPSE_RADIUS_SM,
} from './toggleData';
import Image from 'next/image';

interface IPToggle {
  activeToggle: number;
  onChangeToggle: IFunction;
  onHovered: IFunction;
}

// PToggle is the P button in the toggle
const PToggle: React.FC<IPToggle> = ({
  activeToggle,
  onChangeToggle,
  onHovered,
}) => {
  const styles = {
    toggle: css`
      position: relative;
      width: ${TOGGLE_CONTAINER_WIDTH}px;
      height: ${TOGGLE_CONTAINER_HEIGHT}px;
      border-radius: 200px;
      mask-image: url('/images/landing-page/ecosystem/toggle/switch-mask.svg');
      @media (max-width: 900px) {
        width: ${TOGGLE_CONTAINER_WIDTH_SM}px;
        height: ${TOGGLE_CONTAINER_HEIGHT_SM}px;
        mask-image: url('/images/landing-page/ecosystem/toggle/switch-mask-small.svg');
      }
    `,
    ellipseContainer: css`
      -webkit-transform: translate3d(0, ${TOGGLE[activeToggle]?.position}, 0);
      -webkit-transform: translateY(${TOGGLE[activeToggle]?.position});
      -webkit-transition: all 800ms;
      -webkit-perspective: 1000;
      -webkit-backface-visibility: hidden;
      @media (max-width: 900px) {
        -webkit-transform: translate3d(
          0,
          ${TOGGLE[activeToggle]?.positionSmall},
          0
        );
        -webkit-transform: translateY(${TOGGLE[activeToggle]?.positionSmall});
      }
    `,
    ellipseP: css`
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: absolute;
      border-radius: 50%;
      width: ${ELLIPSE_RADIUS}px;
      height: ${ELLIPSE_RADIUS}px;
      background: ${TOGGLE[activeToggle]?.pToggleBackground};
      z-index: ${Z_INDEX_ABOVE * 3 + Z_INDEX_BASE};
      box-shadow: 0px 4px 10px 2px rgba(255, 255, 255, 0.56) inset,
        0px 11px 8px 0px rgba(0, 0, 0, 0.25),
        0px -6px 4px 0px rgba(0, 0, 0, 0.2) inset;
      @media (max-width: 900px) {
        width: ${ELLIPSE_RADIUS_SM}px;
        height: ${ELLIPSE_RADIUS_SM}px;
      }
    `,
    ellipse1: css`
      position: absolute;
      background: ${TOGGLE[activeToggle]?.background};
      border-radius: 50%;
      width: ${ELLIPSE_RADIUS + 25}px;
      height: ${ELLIPSE_RADIUS + 25}px;
      z-index: ${Z_INDEX_ABOVE * 2 + Z_INDEX_BASE};
      box-shadow: 0px 4px 10px 2px rgba(255, 255, 255, 0.56) inset,
        0px 11px 8px 0px rgba(0, 0, 0, 0.25),
        0px -6px 4px 0px rgba(0, 0, 0, 0.2) inset;
      @media (max-width: 900px) {
        width: ${ELLIPSE_RADIUS_SM + 10}px;
        height: ${ELLIPSE_RADIUS_SM + 10}px;
      }
    `,
    ellipse2: css`
      position: absolute;
      background: ${TOGGLE[activeToggle]?.background};
      // filter: brightness(0.5%);
      border-radius: 50%;
      width: ${ELLIPSE_RADIUS + 60}px;
      height: ${ELLIPSE_RADIUS + 60}px;
      z-index: ${Z_INDEX_ABOVE * 1 + Z_INDEX_BASE};
      box-shadow: 0px 4px 10px 2px rgba(255, 255, 255, 0.56) inset,
        0px 11px 8px 0px rgba(0, 0, 0, 0.25),
        0px -6px 4px 0px rgba(0, 0, 0, 0.2) inset;
      @media (max-width: 900px) {
        width: ${ELLIPSE_RADIUS_SM + 20}px;
        height: ${ELLIPSE_RADIUS_SM + 20}px;
      }
    `,
    // buildings
    topToggleImage: css`
      position: absolute;
      transform: translateY(-${ELLIPSE_RADIUS}px);
      @media (max-width: 900px) {
        transform: translateY(-${ELLIPSE_RADIUS_SM}px);
      }
    `,
    // network
    bottomToggleImage: css`
      position: absolute;
      transform: translateY(${ELLIPSE_RADIUS * 2}px);
      @media (max-width: 900px) {
        transform: translateY(${ELLIPSE_RADIUS_SM * 2}px);
      }
    `,
  };

  return (
    <Box css={styles.toggle}>
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        css={styles.ellipseContainer}
      >
        <Box
          css={styles.ellipseP}
          onClick={() => onChangeToggle((i: number) => (i + 1) % 3)}
          onMouseEnter={onHovered}
          onMouseLeave={onHovered}
        >
          <Image
            src="/images/logo/p-logo-mono.svg"
            alt="ParallelChain Logo"
            width={ELLIPSE_RADIUS - TOGGLE_CONTAINER_PADDING}
            height={ELLIPSE_RADIUS - TOGGLE_CONTAINER_PADDING}
            priority
            blurDataURL="data:image.svg"
            style={{
              filter: TOGGLE[activeToggle]?.pLogoFilter,
            }}
          />
        </Box>
        <Box css={styles.ellipse1}></Box>
        <Box css={styles.ellipse2}></Box>
        <Box css={styles.topToggleImage}>
          <Image
            src="/images/landing-page/ecosystem/toggle/toggle-background-1.png"
            alt="ParallelChain Logo"
            width={100}
            height={100}
            priority
            blurDataURL="data:image.png"
          />
        </Box>
        <Box css={styles.bottomToggleImage}>
          <Image
            src="/images/landing-page/ecosystem/toggle/toggle-background-2.png"
            alt="ParallelChain Logo"
            width={260}
            height={416}
            priority
            blurDataURL="data:image.png"
          />
        </Box>
      </Box>
    </Box>
  );
};

interface IEcosystemToggle {
  activeToggle: number;
  onChangeToggle: IFunction;
  onHovered: IFunction;
}

const EcosystemToggle: React.FC<IEcosystemToggle> = ({
  activeToggle,
  onChangeToggle,
  onHovered,
}) => {
  const theme = useTheme();
  const styles = {
    toggleContainer: css`
      width: ${TOGGLE_CONTAINER_WIDTH}px;
      height: ${TOGGLE_CONTAINER_HEIGHT}px;
      border-radius: 200px;
      background-color: ${TOGGLE[activeToggle]?.background};
      transition: all 300ms;
      @media (max-width: 900px) {
        width: ${TOGGLE_CONTAINER_WIDTH_SM}px;
        height: ${TOGGLE_CONTAINER_HEIGHT_SM}px;
      }
    `,
    toggleTextContainer: css`
      height: ${TOGGLE_CONTAINER_HEIGHT}px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: ${TOGGLE_CONTAINER_PADDING * 2}px 0;
      @media (max-width: 900px) {
        height: ${TOGGLE_CONTAINER_HEIGHT_SM}px;
        padding: ${TOGGLE_CONTAINER_PADDING}px 0;
      }
    `,
    text: css`
      font-weight: 700;
      line-height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
    `,
    mainnetTextColor: css`
      background: linear-gradient(
        0deg,
        ${theme?.palette?.PCLab?.neutral?.black} 0%,
        ${TOGGLE[activeToggle].label === 'Mainnet'
            ? TOGGLE[activeToggle].textColor
            : theme?.palette?.PCLab?.neutral?.grey}
          50%,
        ${theme?.palette?.PCLab?.neutral?.black} 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      &:hover {
        background: linear-gradient(
          0deg,
          ${theme?.palette?.PCLab?.neutral?.black} 0%,
          ${TOGGLE[0].textColor} 50%,
          ${theme?.palette?.PCLab?.neutral?.black} 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
      }
    `,
    enterpriseTextColor: css`
      background: linear-gradient(
        0deg,
        ${theme?.palette?.PCLab?.neutral?.black} 0%,
        ${TOGGLE[activeToggle].label === 'Enterprise'
            ? TOGGLE[activeToggle].textColor
            : theme?.palette?.PCLab?.neutral?.grey}
          50%,
        ${theme?.palette?.PCLab?.neutral?.black} 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      cursor: pointer;
      &:hover {
        background: linear-gradient(
          0deg,
          ${theme?.palette?.PCLab?.neutral?.black} 0%,
          ${TOGGLE[1].textColor} 50%,
          ${theme?.palette?.PCLab?.neutral?.black} 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
      }
    `,
    ippTextColor: css`
      background: linear-gradient(
        0deg,
        ${theme?.palette?.PCLab?.neutral?.black} 0%,
        ${TOGGLE[activeToggle].label === 'Inter-ParallelChain Protocol'
            ? TOGGLE[activeToggle].textColor
            : theme?.palette?.PCLab?.neutral?.grey}
          50%,
        ${theme?.palette?.PCLab?.neutral?.black} 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      &:hover {
        background: linear-gradient(
          0deg,
          ${theme?.palette?.PCLab?.neutral?.black} 0%,
          ${TOGGLE[2].textColor} 50%,
          ${theme?.palette?.PCLab?.neutral?.black} 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
      }
    `,
  };

  return (
    <Box
      width="fit-content"
      display="flex"
      gap={{ xs: 1, md: 2 }}
      // css={styles.toggleContainerHeight}
    >
      <Box css={styles.toggleContainer}>
        <PToggle
          activeToggle={activeToggle}
          onChangeToggle={onChangeToggle}
          onHovered={onHovered}
        />
      </Box>
      <Box css={styles.toggleTextContainer}>
        <Typography
          variant="h5"
          css={css`
            ${styles.text} ${styles.mainnetTextColor}
          `}
          onClick={() => onChangeToggle(0)}
        >
          Mainnet
        </Typography>
        <Typography
          variant="h5"
          css={css`
            ${styles.text} ${styles.enterpriseTextColor}
          `}
          onClick={() => onChangeToggle(1)}
        >
          Enterprise
        </Typography>
        <Typography
          variant="h5"
          css={css`
            ${styles.text} ${styles.ippTextColor}
          `}
          onClick={() => onChangeToggle(2)}
        >
          Inter-ParallelChain
          <br />
          Protocol
        </Typography>
      </Box>
    </Box>
  );
};

export default EcosystemToggle;
