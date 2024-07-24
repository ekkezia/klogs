/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ContentBox from '../../../atoms/box/content-box.component';
import PatentsFilters from './patents-filters.component';
import PatentsHero from './patents-hero.component';
import { PatentsList } from './patents-list.component';
import VerticalBox from '../../../atoms/box/vertical-box.component';
import DOMPurify from 'isomorphic-dompurify';

const Patents: React.FC = () => {
  const theme = useTheme();
  const styles = {
    paddedContainer: css`
      padding: ${theme.spacing(2)};
    `,
    title: css`
      position: absolute;
      top: 0;
      left: calc(-1 * ${theme.spacing(8)});
      writing-mode: vertical-lr;
      rotate: 180deg;
      color: ${theme.palette.PCLab?.products?.approvalChain?.default};
      padding: ${theme.spacing(2)};
    `,
    gridItemBorderBox: css`
      border: 1px solid ${theme.palette.PCLab?.tertiary?.default};
      height: 100%;
    `,
    padded: css`
      padding: ${theme.spacing(2)};
    `,
    iconColor: css`
      filter: ${theme.palette.PCLab?.products?.approvalChain?.filter};
    `,
  };

  const [activeFilters, setActiveFilters] = useState(['ALL']);

  return (
    <section>
      <ContentBox
        verticalContent={
          <VerticalBox padded>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <Typography
                variant="h7"
                color={theme?.palette?.PCLab?.primary?.lighter}
              >
                <i>(Multiple Jurisdictions)</i>
              </Typography>
              <Typography variant="verticalHeading">Patents</Typography>
            </Box>
          </VerticalBox>
        }
        mainContent={
          <>
            <PatentsHero />
            {/* <PatentsFilters
              activeFilters={activeFilters}
              onChangeFilter={setActiveFilters}
            /> */}
            <PatentsList activeFilters={activeFilters} />
          </>
        }
      />
    </section>
  );
};

export default Patents;
