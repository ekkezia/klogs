/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import NavBarItem from './navbar-item.component';
import {
  HORIZONTAL_BAR_HEIGHT,
  INNER_BAR_WIDTH,
  Z_INDEX_BELOW,
  Z_INDEX_FIXED_BARS,
  Z_INDEX_MODAL,
} from '@/app/shared-layout-vars';
import useBreakpoints from '../../../../hooks/useBreakpoints';
import CustomButton from '../../atoms/buttons/custom-button.component';
import ThemeSwitches from '../../_ui/theme-switch/theme-switch.component';
import Socials from '../socials/socials.component';
import MouseSwitch from '../../_ui/theme-switch/mouse-switch.component';
import useScrollPosition from '../../../../hooks/useScrollPosition';

export interface ILink {
  label: string;
  linkTo: string;
  disabled?: boolean;
  children?: {
    label: string;
    linkTo: string;
    disabled?: boolean;
  }[];
}

export interface IDropdown {
  label: string;
  linkTo: string;
  disabled?: boolean;
  sub: ILink[];
}

export interface INavItems {
  [key: string]: ILink | IDropdown;
  home: ILink;
}

export interface INavBarComponentProps {
  navItems: INavItems;
  isOpen: boolean;
}

const NavBar: React.FC<INavBarComponentProps> = ({ navItems, isOpen }) => {
  const theme = useTheme();

  const styles = {
    navContainer: css`
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      background-color: ${theme.palette.PCLab?.background?.primary};
      gap: 4px;
      max-width: calc(${INNER_BAR_WIDTH} - 1px);
      max-height: 100vh;
      z-index: ${Z_INDEX_FIXED_BARS};
    `,
    navCollapsed: css`
      z-index: ${Z_INDEX_FIXED_BARS};
      position: fixed;
      top: ${HORIZONTAL_BAR_HEIGHT};
      right: 0;
      background-color: ${theme.palette.PCLab?.background?.primary};
      gap: 4px;
      height: 100vh;
      max-width: 100%;
      max-height: 100vh;
      border-left: 1px solid ${theme.palette.PCLab?.tertiary?.default};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: ${theme.spacing(2)};
    `,
    navSmall: css`
      z-index: ${Z_INDEX_FIXED_BARS};
      position: fixed;
      top: calc(
        ${HORIZONTAL_BAR_HEIGHT} - 1px
      ); // due to the top bar blur filter cutting the border
      border-top: 1px solid ${theme.palette.PCLab?.tertiary?.default};
      left: 0;
      background-color: ${theme.palette.PCLab?.background?.primary};
      gap: 4px;
      width: 100vw;
      height: 100vh;
      max-width: 100%;
      max-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding-top: 10vh;
      padding-bottom: 20vh;
    `,
    navSmallItemsContainer: css`
      overflow-y: scroll;
      width: 100vw;
      height: calc(100vh - ${HORIZONTAL_BAR_HEIGHT});
    `,
    btnContainer: css`
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${theme.spacing(1)};
      margin-bottom: ${theme.spacing(2)};
    `,
  };

  const { isLargeScreen, isSmallScreen } = useBreakpoints();

  const navbarRef = useRef() as RefObject<HTMLDivElement>;
  const { scrollPosition } = useScrollPosition();
  const [dropdownInFocus, setDropdownInFocus] = useState<string>();

  useEffect(() => {
    // Transform
    if (scrollPosition > 0) {
      if (navbarRef.current)
        navbarRef.current.style.zIndex = `${1 * Z_INDEX_BELOW + Z_INDEX_MODAL}`; // ensure it is in higher order to FIXED_BARS, but still lower than MODAL
    } else {
      if (navbarRef.current)
        navbarRef.current.style.zIndex = `${Z_INDEX_FIXED_BARS}`;
    }
  });

  if (isSmallScreen) {
    if (isOpen) {
      return (
        <div css={styles.navSmall} ref={navbarRef}>
          <Box css={styles.navSmallItemsContainer} overflow="scroll">
            {Object.keys(navItems).map((itemKey, idx) => {
              return (
                <NavBarItem
                  navItems={navItems}
                  key={`${itemKey}-${idx}`}
                  itemKey={itemKey}
                  dropdownInFocus={dropdownInFocus}
                  setDropdownInFocus={setDropdownInFocus}
                />
              );
            })}
          </Box>
          <Box
            width="100%"
            flexDirection="column"
            gap={{ xs: 1 }}
            display="flex"
            alignItems="center"
          >
            <Box css={styles.btnContainer}>
              <CustomButton
                variant="primary"
                url="https://e-kezia.com/portfolio"
                newTab
                fitContent
              >
                Portfolio
              </CustomButton>
              <ThemeSwitches />
            </Box>
            <Socials />
          </Box>
        </div>
      );
    }

    return null;
  }

  if (isLargeScreen) {
    if (isOpen) {
      return (
        <Box css={styles.navCollapsed} ref={navbarRef} overflow="scroll">
          <Box overflow="scroll">
            {Object.keys(navItems).map((itemKey, idx) => {
              return (
                <NavBarItem
                  navItems={navItems}
                  key={`${itemKey}-${idx}`}
                  itemKey={itemKey}
                  dropdownInFocus={dropdownInFocus}
                  setDropdownInFocus={setDropdownInFocus}
                />
              );
            })}
          </Box>
          <Box css={styles.btnContainer}>
            <CustomButton
              variant="primary"
              url="https://e-kezia.com/portfolio"
              newTab
              fitContent
            >
              Portfolio
            </CustomButton>
            <ThemeSwitches />
            <MouseSwitch />
          </Box>
        </Box>
      );
    }

    return null;
  }

  return (
    <div css={styles.navContainer}>
      {Object.keys(navItems).map((itemKey, idx) => {
        return (
          <NavBarItem
            navItems={navItems}
            key={`${itemKey}-${idx}`}
            itemKey={itemKey}
            dropdownInFocus={dropdownInFocus}
            setDropdownInFocus={setDropdownInFocus}
          />
        );
      })}
    </div>
  );
};

export default NavBar;
