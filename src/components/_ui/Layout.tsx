/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import TopBar from './top-bar/top-bar.component';
import BottomBar from './bottom-bar/bottom-bar.component';
import NavBar from '../organism/navbar/navbar.component';
import ROUTES from '../../routes';
import useBreakpoints from '../../hooks/useBreakpoints';
import Socials from '../organism/socials/socials.component';
import useBoolean from '../../hooks/useBoolean';
import { useRouter } from 'next/navigation';

export const INNER_BAR_WIDTH: string = '200px';
export const INNER_BAR_WIDTH_LG: string = '96px';
export const INNER_BAR_WIDTH_SM: string = '48px';
export const OUTER_BAR_WIDTH: string = '48px';
export const OUTER_BAR_WIDTH_SM: string = '32px';
export const OUTER_BAR_WIDTH_LG: string = '32px';
export const HORIZONTAL_BAR_HEIGHT: string = '48px';
export const MAXWIDTH: string = '1440px';
export const MAX_CONTENT_WIDTH: string = `calc(100% - (${OUTER_BAR_WIDTH} * 2) - (${INNER_BAR_WIDTH} * 1))`;
export const MAX_CONTENT_WRITE_WIDTH: string = `calc(100% - (${OUTER_BAR_WIDTH} * 2) - (${INNER_BAR_WIDTH} * 2))`;
export const MAX_CONTENT_WRITE_WIDTH_LG: string = `calc(100% - (${OUTER_BAR_WIDTH_LG} * 2) - (${INNER_BAR_WIDTH_LG} * 2))`;
export const MAX_CONTENT_WRITE_WIDTH_SM: string = `calc(100% - (${INNER_BAR_WIDTH_SM} * 1))`;
export const MAX_CONTENT_VIEWPORT_HEIGHT: string = `calc(100vh - (${HORIZONTAL_BAR_HEIGHT} * 2))`;
export const HEADING_HEIGHT = '100px';

export const Z_INDEX_BASE = 0;
export const Z_INDEX_ABOVE = 1;
export const Z_INDEX_BELOW = -1;
export const Z_INDEX_FIXED_BARS = 10;
export const Z_INDEX_MODAL = 999;

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const theme = useTheme();
  const styles = {
    container: css`
      margin: 0 auto;
      width: 100vw;
      min-height: 100vh;
      // height: calc(100vh + ${HORIZONTAL_BAR_HEIGHT});
      display: flex;
      justify-content: center;
      background: ${theme.palette?.PCLab?.background?.primary};
    `,
    innerContainer: css`
      position: relative;
      width: 100%;
      max-width: ${MAXWIDTH};
      height: 100%;
      display: flex;
    `,
    absolute: css`
      position: absolute;
    `,
    outerLeftBar: css`
      width: ${OUTER_BAR_WIDTH};
      min-width: ${OUTER_BAR_WIDTH};
      max-width: ${OUTER_BAR_WIDTH};
      min-height: 100vh;
      border-left: 1px solid ${theme.palette?.PCLab?.tertiary?.default};
      border-right: 1px solid ${theme.palette?.PCLab?.tertiary?.default};
      display: block;
      @media (max-width: 1200px) {
        min-width: ${OUTER_BAR_WIDTH_LG};
        width: ${OUTER_BAR_WIDTH_LG};
      }
      @media (max-width: 600px) {
        display: none;
      }
    `,
    innerLeftBar: css`
      position: absolute;
      top: 0;
      left: ${OUTER_BAR_WIDTH};
      width: ${INNER_BAR_WIDTH};
      min-width: ${INNER_BAR_WIDTH};
      max-width: ${INNER_BAR_WIDTH};
      min-height: 100%;
      border-right: 1px solid ${theme.palette?.PCLab?.tertiary?.default};
      display: flex;
      align-items: center;
      @media (max-width: 1200px) {
        left: ${OUTER_BAR_WIDTH_LG};
        min-width: ${INNER_BAR_WIDTH_LG};
        width: ${INNER_BAR_WIDTH_LG};
      }
      @media (max-width: 600px) {
        left: 0;
        min-width: ${INNER_BAR_WIDTH_SM};
        width: ${INNER_BAR_WIDTH_SM};
      }
      @media (max-width: 425px) {
        display: none;
      }
    `,
    innerRightBar: css`
      width: ${INNER_BAR_WIDTH};
      min-width: ${INNER_BAR_WIDTH};
      max-width: ${INNER_BAR_WIDTH};
      min-height: 100%;
      right: ${OUTER_BAR_WIDTH};
      border-left: 1px solid ${theme.palette?.PCLab?.tertiary?.default};
      display: flex;
      align-items: center;
      @media (max-width: 1200px) {
        min-width: ${INNER_BAR_WIDTH_LG};
        width: ${INNER_BAR_WIDTH_LG};
      }
      @media (max-width: 600px) {
        min-width: ${INNER_BAR_WIDTH_SM};
        width: ${INNER_BAR_WIDTH_SM};
      }
      @media (max-width: 425px) {
        display: none;
      }
    `,
    outerRightBar: css`
      width: ${OUTER_BAR_WIDTH};
      min-width: ${OUTER_BAR_WIDTH};
      max-width: ${OUTER_BAR_WIDTH};
      min-height: 100vh;
      right: 0;
      border-left: 1px solid ${theme.palette?.PCLab?.tertiary?.default};
      border-right: 1px solid ${theme.palette?.PCLab?.tertiary?.default};
      display: block;
      @media (max-width: 1200px) {
        min-width: ${OUTER_BAR_WIDTH_LG};
        width: ${OUTER_BAR_WIDTH_LG};
      }
      @media (max-width: 600px) {
        display: none;
      }
    `,
    contentBar: css`
      width: calc(100% - (${OUTER_BAR_WIDTH} * 2) - (${INNER_BAR_WIDTH} * 1));
      padding-top: ${HORIZONTAL_BAR_HEIGHT};
      padding-bottom: ${HORIZONTAL_BAR_HEIGHT};
      @media (max-width: 1200px) {
        width: calc(
          100% - (${OUTER_BAR_WIDTH_LG} * 2) - (${INNER_BAR_WIDTH_LG} * 1)
        );
      }
      @media (max-width: 600px) {
        width: calc(100% - 8px);
      }
      @media (max-width: 425px) {
        width: 100%;
      }
    `,
  };

  const { isExtraSmallScreen, isSmallScreen } = useBreakpoints();
  const router = useRouter();

  const {
    value: isOpen,
    setFalse: closeNavbar,
    toggle: toggleExpanded,
  } = useBoolean(false);
  const toggle = () => {
    toggleExpanded();
  };

  // Navbar-related Layout Configuration
  useEffect(() => {
    closeNavbar(); // close navbar on redirect to other route
  }, [router]);

  useEffect(() => {
    // disable scrolling on navbar expanded & on Tablet / sm screen
    const element = document.getElementById('body');
    if (isOpen && isSmallScreen) element?.classList.add('disableScrolling');
    else element?.classList.remove('disableScrolling');
  }, [isOpen]);

  return (
    <div css={styles.container}>
      <TopBar isOpen={isOpen} toggle={toggle} />

      {/* ON SM SCREEN: Display Navbar outside INNER RIGHT BAR because on sm device, INNER RIGHT is NOT displayed. */}
      {isSmallScreen && <NavBar navItems={ROUTES} isOpen={isOpen} />}

      <div css={styles.innerContainer}>
        <div
          css={css`
            ${styles.outerLeftBar};
          `}
        >
          {!isSmallScreen && <Socials />}
        </div>

        <div
          css={css`
            ${styles.innerLeftBar};
          `}
        />

        <div
          css={css`
            ${styles.contentBar};
          `}
        >
          {children}
        </div>

        <div
          css={css`
            ${styles.innerRightBar};
          `}
        >
          {/* Only display navbar INSIDE INNER RIGHT BAR when it is NOT xs screen */}
          {!isExtraSmallScreen && <NavBar navItems={ROUTES} isOpen={isOpen} />}
        </div>

        <div
          css={css`
            ${styles.outerRightBar};
          `}
        />
      </div>

      <BottomBar />
      {/* <CustomMouse color={theme?.palette?.PCLab?.primary?.lighter} /> */}
    </div>
  );
};

export default Layout;
