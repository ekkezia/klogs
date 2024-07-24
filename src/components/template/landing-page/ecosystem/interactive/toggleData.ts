import theme from '../../../../../styles/theme';

export const TOGGLE_CONTAINER_PADDING = 8;
export const TOGGLE_CONTAINER_WIDTH = 80;
export const TOGGLE_CONTAINER_HEIGHT = 240;
export const TOGGLE_CONTAINER_WIDTH_SM = 40;
export const TOGGLE_CONTAINER_HEIGHT_SM = 160;
export const ELLIPSE_RADIUS =
  TOGGLE_CONTAINER_WIDTH - TOGGLE_CONTAINER_PADDING * 2;
export const ELLIPSE_RADIUS_SM =
  TOGGLE_CONTAINER_WIDTH_SM - TOGGLE_CONTAINER_PADDING * 2;

export const GLOBE_RADIUS = 420;
export const GLOBE_RADIUS_LG = 430;
export const GLOBE_RADIUS_MD = 360;
export const GLOBE_RADIUS_SM = 300;
export const GLOBE_RADIUS_XS = 270;

export const TOGGLE = [
  {
    label: 'Mainnet',
    textColor: theme?.palette?.PCLab?.brand?.orange,
    background: '#803B99',
    position: `${
      0 * (TOGGLE_CONTAINER_HEIGHT / 3) +
      ELLIPSE_RADIUS / 2 +
      TOGGLE_CONTAINER_PADDING
    }px`,
    positionSmall: `${
      0 * (TOGGLE_CONTAINER_HEIGHT_SM / 3) +
      ELLIPSE_RADIUS_SM / 2 +
      TOGGLE_CONTAINER_PADDING
    }px`,
    rotation: 0,
    pLogoFilter:
      'invert(41%) sepia(37%) saturate(2855%) hue-rotate(354deg) brightness(101%) contrast(99%)',
    pToggleBackground: '#FF9A23',
  },
  {
    label: 'Enterprise',
    textColor: theme?.palette?.PCLab?.brand?.green,
    background: '#005F65',
    position: `${1 * (TOGGLE_CONTAINER_HEIGHT / 2)}px`,
    positionSmall: `${1 * (TOGGLE_CONTAINER_HEIGHT_SM / 2)}px`,
    rotation: 180,
    pLogoFilter:
      'invert(48%) sepia(3%) saturate(15%) hue-rotate(12deg) brightness(99%) contrast(89%)',
    pToggleBackground: theme?.palette?.PCLab?.background?.secondary,
  },
  {
    label: 'Inter-ParallelChain Protocol',
    textColor: theme?.palette?.PCLab?.primary?.lighter,
    background: '#A5A5A5',
    position: `${
      2 * (TOGGLE_CONTAINER_HEIGHT / 2) -
      ELLIPSE_RADIUS / 2 -
      TOGGLE_CONTAINER_PADDING
    }px`,
    positionSmall: `${
      2 * (TOGGLE_CONTAINER_HEIGHT_SM / 2) -
      ELLIPSE_RADIUS_SM / 2 -
      TOGGLE_CONTAINER_PADDING / 2 // TODO REFACTOR THIS TO TOGGLE_CONTAINER_PADDING_SM
    }px`,
    rotation: 270,
    pLogoFilter:
      'invert(41%) sepia(37%) saturate(2855%) hue-rotate(354deg) brightness(101%) contrast(99%)',
    pToggleBackground: theme?.palette?.PCLab?.background?.primary,
  },
];
