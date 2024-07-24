'use client'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import BottomBar from './_components/_ui/bottom-bar/bottom-bar.component';
import NavBar from './_components/organism/navbar/navbar.component';
import ROUTES from './routes';
import useBreakpoints from '../hooks/useBreakpoints';
import useBoolean from '../hooks/useBoolean';
import { HORIZONTAL_BAR_HEIGHT, INNER_BAR_WIDTH, INNER_BAR_WIDTH_LG, INNER_BAR_WIDTH_SM, MAXWIDTH, OUTER_BAR_WIDTH, OUTER_BAR_WIDTH_LG } from './shared-layout-vars';
import TopBar from './_components/_ui/top-bar/top-bar.component';
import Socials from './_components/organism/socials/socials.component';

interface IClientLayoutProps {
  children?: React.ReactNode;
}

const ClientLayout: React.FC<IClientLayoutProps> = ({ children }) => {
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
  const pathname = usePathname()

  const {
    value: isOpen,
    setFalse: closeNavbar,
    toggle: toggleExpanded,
  } = useBoolean(false);
  const toggle = () => {
    toggleExpanded();
  };

  // Navbar-related ClientLayout Configuration
  useEffect(() => {
    closeNavbar(); // close navbar on redirect to other route
  }, [pathname]);

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

export default ClientLayout;
