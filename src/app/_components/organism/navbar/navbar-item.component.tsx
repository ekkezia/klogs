/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
// import { styled } from '@mui/material/styles';
import { Collapse, Typography, useTheme } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { IDropdown, ILink, INavItems } from './navbar.component';
import { IFunction } from '../../../../types/shared';

interface INavBarItemComponentProps {
  navItems: INavItems;
  itemKey: string;
  dropdownInFocus: string | undefined;
  setDropdownInFocus: IFunction;
}

const isDropdown = (navItem: ILink | IDropdown): navItem is IDropdown => {
  return 'sub' in navItem;
};

const NavBarItem: React.FC<INavBarItemComponentProps> = ({
  navItems,
  itemKey,
  dropdownInFocus,
  setDropdownInFocus,
}) => {
  const navItem: ILink | IDropdown = navItems[itemKey];
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(false);

  const theme = useTheme();
  const styles = {
    navContainer: css`
      display: 'flex';
      background-color: ${theme.palette.PCLab?.primary?.default};
      flex-direction: 'column';
      gap: ${theme.spacing(0.5)};
      width: 100%;
    `,
    navItemContainer: css`
      display: flex;
      width: 100%;
      flex-direction: row;
      border-bottom: 1px solid ${theme.palette.PCLab?.tertiary?.default};
      align-items: center;
      padding: 0px ${theme.spacing(1)};
      gap: ${theme.spacing(1)};
      cursor: pointer;
      background-color: ${activeNav
        ? theme?.palette?.PCLab?.primary?.default
        : 'null'};
      &:hover {
        background-color: ${activeNav
          ? 'null'
          : theme?.palette?.PCLab?.background?.secondary};
      }
    `,
    navItemDropdownContainer: (
      isDropdown: string,
      isSubNavActive: boolean,
    ) => css`
      display: flex;
      width: 100%;
      flex-direction: row;
      border-bottom: 1px solid ${theme.palette.PCLab?.tertiary?.default};
      align-items: center;
      gap: ${theme.spacing(1)};
      cursor: pointer;
      ${isDropdown === 'isDropdown' &&
      css`
        background-color: ${theme.palette.PCLab?.tertiary?.default};
        border-bottom: 1px solid ${theme.palette.PCLab?.background?.primary};
        & .child-item {
          padding: ${activeNav
            ? `0px ${theme.spacing(4)}`
            : `0px ${theme.spacing(2)}`};
          color: ${isSubNavActive
            ? theme.palette.PCLab?.primary?.default
            : theme.palette.PCLab?.neutral?.grey};
          background-color: ${isSubNavActive
            ? theme.palette.PCLab?.secondary?.default
            : 'none'};
        }
        &:hover {
          background-color: ${theme.palette.PCLab?.secondary?.default};
          .child-item {
            color: ${theme.palette.PCLab?.primary?.default} !important;
          }
        }
      `}
      ${isDropdown === 'isFolder' &&
      css`
        color: ${theme?.palette?.PCLab?.tertiary?.default};
        padding: 0px ${theme.spacing(2)};
        background-color: ${theme.palette.PCLab?.background?.primary};
      `}
    `,
    orangeDot: css`
      background-color: ${theme.palette.PCLab?.secondary?.default};
      width: 10px;
      height: 10px;
      border-radius: 5px;
      margin-left: ${theme.spacing(1)};
    `,
    navItem: css`
      width: 100%;
      &:hover {
        background-color: ${activeNav
          ? theme?.palette?.PCLab?.primary?.default
          : theme?.palette?.PCLab?.background?.secondary};
      }
    `,
    navTitle: (type: string) => css`
      font-size: 16px;
      font-weight: 600;
      line-height: 150%;
      text-align: left;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      ${type === 'isFolder'
        ? css`
            color: ${theme?.palette?.PCLab?.tertiary?.default};
            text-transform: uppercase;
          `
        : css`
            color: ${activeNav
              ? theme?.palette?.PCLab?.text?.contrast
              : theme?.palette?.PCLab?.text?.secondary};
            text-transform: ${type === 'isParent' ? 'uppercase' : 'none'};
          `}
    `,
  };
  // const Typography = styled(Typography)(({ theme }) => ({
  //   fontFamily: 'Barlow',
  //   fontSize: '16px',
  //   fontWeight: '600',
  //   lineHeight: '150%',
  //   textAlign: 'left',
  //   display: 'flex',
  //   width: '100%',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   color: activeNav
  //     ? theme?.palette?.PCLab?.text?.contrast
  //     : theme?.palette?.PCLab?.text?.secondary,
  // }));

  // const NavFolderTitle = styled(Typography)(({ theme }) => ({
  //   fontFamily: 'Barlow',
  //   fontSize: '16px',
  //   fontWeight: '600',
  //   lineHeight: '150%',
  //   textAlign: 'left',
  //   display: 'flex',
  //   width: '100%',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   textTransform: 'uppercase',
  //   color: theme?.palette?.PCLab?.tertiary?.default,
  // }));

  const pathname = usePathname()

  useEffect(() => {
    const currentNav = navItem.linkTo.split('/')[1];
    setActiveNav(currentNav === pathname.split('/')[1]);
    setDropdownIsOpen(isDropdown(navItem) && activeNav);
  }, [pathname, activeNav]);

  useEffect(() => {
    if (dropdownInFocus !== itemKey) {
      setDropdownIsOpen(false);
    }
  }, [dropdownInFocus, itemKey]);

  return (
    <div>
      <div
        css={styles.navItemContainer}
        onClick={() => {
          setDropdownIsOpen(!dropdownIsOpen);
          console.log(itemKey);
          setDropdownInFocus(itemKey);
        }}
      >
        <div>{activeNav && <div css={styles.orangeDot} />}</div>
        {navItem.linkTo.length !== 0 && !navItem.disabled ? (
          <Link href={`${navItem.linkTo}`} passHref>
            <a css={styles.navItem}>
              <Typography
                className="child-item parent-nav"
                css={styles.navTitle('isParent')}
              >
                {navItem.label}
              </Typography>
            </a>
          </Link>
        ) : (
          <Typography
            className="child-item parent-nav"
            css={styles.navTitle('isParent')}
          >
            {navItem.label}
          </Typography>
        )}
        {isDropdown(navItem) && !dropdownIsOpen && (
          <ExpandMoreIcon
            style={{
              color: activeNav
                ? theme?.palette?.PCLab?.text?.contrast
                : theme?.palette?.PCLab?.text?.secondary,
            }}
          />
        )}
        {isDropdown(navItem) && dropdownIsOpen && (
          <ExpandLessIcon
            style={{
              color: activeNav
                ? theme?.palette?.PCLab?.text?.contrast
                : theme?.palette?.PCLab?.text?.secondary,
            }}
          />
        )}
      </div>
      <div>
        <Collapse in={dropdownIsOpen}>
          {isDropdown(navItem) &&
            navItem.sub.map((subnav) => {
              return (
                <div key={subnav.label}>
                  {/* Non-Foldered Nav Items (does not have children in sub) */}
                  {!subnav.children && (
                    <Link key={subnav.label} href={subnav.linkTo} passHref>
                      <a
                        css={styles.navItemDropdownContainer(
                          'isDropdown',
                          subnav.linkTo === pathname,
                        )}
                      >
                        <Typography
                          className="child-item sub-nav"
                          css={styles.navTitle('')}
                        >
                          {subnav.label}
                        </Typography>
                      </a>
                    </Link>
                  )}

                  {/* Foldered Nav Items (have children in sub) */}
                  {subnav.children && (
                    <>
                      {/* Folder of the Nav Items */}
                      <div
                        css={styles.navItemDropdownContainer(
                          'isFolder',
                          subnav.linkTo === pathname,
                        )}
                      >
                        <Typography
                          className="child-item sub-nav"
                          css={styles.navTitle('isFolder')}
                        >
                          {subnav.label}
                        </Typography>
                      </div>

                      {/* the Nav Items children inside the Folder */}
                      {subnav.children.map(({ label, linkTo }) => (
                        <Link key={label} href={linkTo} passHref>
                          <a
                            css={styles.navItemDropdownContainer(
                              'isDropdown',
                              linkTo === pathname,
                            )}
                          >
                            <Typography
                              className="child-item sub-nav"
                              css={styles.navTitle('')}
                            >
                              {label}
                            </Typography>
                          </a>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              );
            })}
        </Collapse>
      </div>
    </div>
  );
};

export default NavBarItem;
