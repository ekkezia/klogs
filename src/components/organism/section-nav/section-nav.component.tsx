/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import scrollToSection from '../../../utils/scrollToSection';
import { updateURLAnchor } from '../../../hooks/useQueryParams';
import { NextRouter } from 'next/navigation';
import { IKeyRefs } from '../../../../types/shared';
import { HORIZONTAL_BAR_HEIGHT, Z_INDEX_FIXED_BARS } from '../../_ui/Layout';
import { Arrow } from './arrow.component';
import ContentBox from '../../atoms/box/content-box.component';
import useBreakpoints from '../../../hooks/useBreakpoints';
import useScrollPosition from '../../../hooks/useScrollPosition';
import theme from '../../../styles/theme';

const NAV_HEIGHT = 48; // same as horizontal bar height

interface ISectionNav {
  activeSection: string;
  data: IKeyRefs;
  color: string | undefined;
  router?: NextRouter;
}

interface ISectionNavItem {
  activeSection: string;
  data: IKeyRefs;
  color: string | undefined;
  router?: NextRouter;
  idx: number;
  navKey: string;
}

const SectionNavItem: React.FC<ISectionNavItem> = ({
  activeSection,
  data,
  color,
  router,
  idx,
  navKey,
}) => {
  const theme = useTheme();
  const styles = {
    container: css`
      width: 100%;
      height: ${NAV_HEIGHT}px;
      display: flex;
    `,
    navContainer: css`
      position: relative;
      height: ${NAV_HEIGHT}px;
      width: ${100 / Object.keys(data).length}%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: ${theme.spacing(2)};
      background: ${theme?.palette?.PCLab?.background?.primary};
      transition: all 500ms;
      &:hover {
        background: ${color ?? theme?.palette?.PCLab?.primary?.lighter};
        cursor: pointer;
        transition: all 500ms;
        & .text {
          color: ${theme?.palette?.PCLab?.neutral?.white};
          transition: all 500ms;
        }
      }
    `,
    activeNav: css`
      background: ${color ?? theme?.palette?.PCLab?.primary?.default};
      transition: all 500ms;
    `,
    text: css`
      color: ${color ?? theme?.palette?.PCLab?.primary?.default};
      width: 90%;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      transition: all 500ms;
      @media (max-width: 1440px) {
        width: 70%;
      }
      @media (max-width: 900px) {
        width: 60%;
      }
      @media (max-width: 600px) {
        width: 50%;
      }
    `,
    activeText: css`
      color: ${theme?.palette?.PCLab?.neutral?.white};
      transition: all 500ms;
    `,
  };

  const handleChangeSection = (navKey: string) => {
    if (data[navKey]) {
      // scroll to section ref
      scrollToSection(data[navKey].ref);
      // replace query with the clicked navigation button
      if (router) updateURLAnchor(router, data[navKey].id);
    }
  };

  const activeIdx = data[activeSection]?.idx;

  const [hover, setHover] = useState<number>(-1);

  return (
    <Box
      css={css`
        ${styles.navContainer}
        ${idx <= activeIdx && styles.activeNav}
      `}
      onClick={() => handleChangeSection(navKey)}
      onMouseEnter={() => setHover(data[navKey].idx)}
      onMouseLeave={() => setHover(-1)}
      key={navKey}
    >
      <Typography
        variant="h6"
        css={css`
          ${styles.text} ${idx <= activeIdx && styles.activeText}
        `}
        className="text"
      >
        {data[navKey].label}
      </Typography>
      {/* Triangle Arrow */}
      {idx !== Object.keys(data).length - 1 && (
        <Box
          position="absolute"
          zIndex={Z_INDEX_FIXED_BARS}
          right={`-${NAV_HEIGHT - 3}px`}
          display="flex"
          alignItems="center"
        >
          <Arrow
            color={
              idx === hover
                ? color
                : idx <= activeIdx
                ? color
                : theme?.palette?.PCLab?.background?.primary
            }
          />
        </Box>
      )}
    </Box>
  );
};

const SectionNav: React.FC<ISectionNav> = ({
  color,
  data,
  activeSection,
  router,
}) => {
  const { isSmallScreen } = useBreakpoints();
  const { scrollPosition } = useScrollPosition();

  const styles = {
    container: css`
      width: 100%;
      height: ${NAV_HEIGHT}px;
      display: flex;
    `,
    smallContainer: css`
      position: fixed;
      top: ${scrollPosition > 0 ? HORIZONTAL_BAR_HEIGHT : 0};
      opacity: ${scrollPosition > 0 ? 1 : 0};
      width: 100%;
      height: ${NAV_HEIGHT}px;
      display: flex;
      z-index: ${Z_INDEX_FIXED_BARS};
      border-bottom: 1px solid ${theme?.palette?.PCLab?.tertiary?.default};
      box-sizing: content-box;
      transition: all 300ms;
    `,
  };

  if (isSmallScreen) {
    return (
      <Box css={styles.smallContainer}>
        {Object.keys(data).map((navKey, idx) => (
          <SectionNavItem
            color={color}
            data={data}
            activeSection={activeSection}
            router={router}
            idx={idx}
            navKey={navKey}
            key={navKey}
          />
        ))}
      </Box>
    );
  }

  return (
    <ContentBox
      sticky
      mainContent={
        <Box css={styles.container}>
          {Object.keys(data).map((navKey, idx) => (
            <SectionNavItem
              color={color}
              data={data}
              activeSection={activeSection}
              router={router}
              idx={idx}
              navKey={navKey}
              key={navKey}
            />
          ))}
        </Box>
      }
    />
  );
};

export default SectionNav;
