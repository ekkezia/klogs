/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import {
  HORIZONTAL_BAR_HEIGHT,
  MAXWIDTH,
  INNER_BAR_WIDTH,
  OUTER_BAR_WIDTH,
  OUTER_BAR_WIDTH_LG,
  OUTER_BAR_WIDTH_SM,
  INNER_BAR_WIDTH_LG,
  INNER_BAR_WIDTH_SM,
  Z_INDEX_MODAL,
} from '@/app/shared-layout-vars';
import ThemeSwitches from '../theme-switch/theme-switch.component';
import useBreakpoints from '../../../../hooks/useBreakpoints';
import { IconButton } from '@mui/material';
import { Close, Menu } from '@mui/icons-material';
import Link from 'next/link';
import MouseSwitch from '../theme-switch/mouse-switch.component';
import { IFunction } from '@/types/shared-types';
import useScrollPosition from '../../../../hooks/useScrollPosition';
import { usePathname } from 'next/navigation';
interface ITopbarProps {
  isOpen: boolean;
  toggle: IFunction;
}
const TopBar: React.FC<ITopbarProps> = ({ isOpen, toggle }) => {
  const theme = useTheme();
  const { isLargeScreen } = useBreakpoints();
  const { scrollPosition } = useScrollPosition();

  const pathname = usePathname()

  const isNotLandingSection =
    pathname !== '/' ? true : scrollPosition !== 0 ? true : false;

  const styles = {
    container: css`
      position: fixed;
      top: 0;
      left: 0;
      z-index: ${Z_INDEX_MODAL};
      width: 100vw;
      height: ${HORIZONTAL_BAR_HEIGHT};
      display: flex;
      justify-content: center;
      border-bottom: ${isNotLandingSection ? '1px' : '0px'} solid
        ${theme.palette?.PCLab?.tertiary?.default};
      background: ${!isNotLandingSection &&
      theme.palette?.PCLab?.background?.transparent};
    `,
    innerContainer: css`
      width: 100%;
      max-width: ${MAXWIDTH};
      height: ${HORIZONTAL_BAR_HEIGHT};
      max-height: ${HORIZONTAL_BAR_HEIGHT};
      display: flex;
    `,
    backdropFilter: css`
      backdrop-filter: blur(4px);
      background: ${theme.palette?.PCLab?.background?.transparent};
    `,
    logoContainer: css`
      position: relative;
      width: 100%;
      height: calc(${HORIZONTAL_BAR_HEIGHT} - 1px);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    `,
    bar: css`
      width: ${OUTER_BAR_WIDTH};
      min-width: ${OUTER_BAR_WIDTH};
      max-width: ${OUTER_BAR_WIDTH};
      height: 100%;
    `,
    outerLeftBar: css`
      width: ${OUTER_BAR_WIDTH};
      min-width: ${OUTER_BAR_WIDTH};
      max-width: ${OUTER_BAR_WIDTH};
      height: 100%;
      border-right: ${isNotLandingSection &&
      `1px solid ${theme.palette?.PCLab?.tertiary?.default}`};
      @media (max-width: 1200px) {
        min-width: ${OUTER_BAR_WIDTH_LG};
        width: ${OUTER_BAR_WIDTH_LG};
      }
      @media (max-width: 600px) {
        display: none;
        min-width: ${OUTER_BAR_WIDTH_SM};
        width: ${OUTER_BAR_WIDTH_SM};
      }
    `,
    innerLeftBar: css`
      width: ${INNER_BAR_WIDTH};
      min-width: ${INNER_BAR_WIDTH};
      max-width: ${INNER_BAR_WIDTH};
      height: calc(${HORIZONTAL_BAR_HEIGHT} - 1px);
      border-right: ${isNotLandingSection &&
      `1px solid ${theme.palette?.PCLab?.tertiary?.default}`};
      padding: ${theme.spacing(0)} ${theme.spacing(2)};
      @media (max-width: 1200px) {
        padding: ${theme.spacing(0)};
        min-width: ${INNER_BAR_WIDTH_LG};
        width: ${INNER_BAR_WIDTH_LG};
      }
      @media (max-width: 600px) {
        min-width: ${INNER_BAR_WIDTH_SM};
        width: ${INNER_BAR_WIDTH_SM};
      }
    `,
    innerRightBar: css`
      width: ${INNER_BAR_WIDTH};
      min-width: ${INNER_BAR_WIDTH};
      max-width: ${INNER_BAR_WIDTH};
      height: calc(100% - 1px);
      border-left: ${isNotLandingSection &&
      `1px solid ${theme.palette?.PCLab?.tertiary?.default}`};
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${theme?.palette?.PCLab?.background?.primary};
      // collapsed at 1200px (LG)
      @media (max-width: 1200px) {
        min-width: ${INNER_BAR_WIDTH_LG};
        width: ${INNER_BAR_WIDTH_LG};
        cursor: pointer;
        &:hover {
          background: ${theme?.palette?.PCLab?.tertiary?.default};
        }
      }
      @media (max-width: 600px) {
        min-width: ${INNER_BAR_WIDTH_SM};
        width: ${INNER_BAR_WIDTH_SM};
      }
    `,
    outerRightBar: css`
      width: ${OUTER_BAR_WIDTH};
      min-width: ${OUTER_BAR_WIDTH};
      max-width: ${OUTER_BAR_WIDTH};
      height: 100%;
      border-left: ${isNotLandingSection &&
      `1px solid ${theme.palette?.PCLab?.tertiary?.default}`};
      display: block;
      @media (max-width: 1200px) {
        min-width: ${OUTER_BAR_WIDTH_LG};
        width: ${OUTER_BAR_WIDTH_LG};
      }
      @media (max-width: 600px) {
        display: none;
        min-width: ${OUTER_BAR_WIDTH_SM};
        width: ${OUTER_BAR_WIDTH_SM};
      }
    `,
    contentBar: css`
      width: 100%;
      max-height: calc(${HORIZONTAL_BAR_HEIGHT} - 1px);
    `,
  };

  return (
    <div
      css={css`
        ${styles.container};
      `}
    >
      <div css={styles.innerContainer}>
        <div
          css={css`
            ${styles.outerLeftBar};
          `}
        />

        <div
          css={css`
            ${styles.innerLeftBar};
            ${styles.backdropFilter};
          `}
        >
          {!isLargeScreen && (
            <Link href="/">
              <div
                css={css`
                  ${styles.logoContainer};
                `}
              >
                <Image
                  src="/images/logo/parallelchain-logo-black.png"
                  layout="fill"
                  objectFit="contain"
                  alt="ParallelChain Logo"
                  priority
                />
              </div>
            </Link>
          )}
        </div>

        <div
          css={css`
            ${styles.contentBar};
            ${styles.backdropFilter};
          `}
        >
          {/* {content} */}
          {isLargeScreen && (
            <Link href="/">
              <div
                css={css`
                  ${styles.logoContainer};
                `}
              >
                <Image
                  src="/images/logo/parallelchain-logo-black.png"
                  layout="fill"
                  objectFit="contain"
                  alt="ParallelChain Logo"
                  priority
                />
              </div>
            </Link>
          )}
        </div>

        <div
          css={css`
            ${styles.innerRightBar};
          `}
          onClick={toggle}
        >
          {!isLargeScreen && isNotLandingSection ? (
            <>
              <ThemeSwitches />
              <MouseSwitch />
            </>
          ) : (
            isNotLandingSection && (
              <IconButton style={{ padding: 0 }}>
                {isOpen ? (
                  <Close
                    style={{
                      color: theme?.palette?.PCLab?.primary?.default,
                    }}
                  />
                ) : (
                  <Menu
                    style={{
                      color: theme?.palette?.PCLab?.primary?.default,
                    }}
                  />
                )}
              </IconButton>
            )
          )}
        </div>

        <div
          css={css`
            ${styles.outerRightBar};
          `}
        />
      </div>
    </div>
  );
};

export default TopBar;
