/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import DOMPurify from 'isomorphic-dompurify';
import { ISSUER, PATENTS_DATA } from './patentsData';
import BorderItemBox from '../../../atoms/box/border-item-box.component';

interface IPatentsListProps {
  activeFilters: string[];
}

export const PatentsList: React.FC<IPatentsListProps> = ({ activeFilters }) => {
  const theme = useTheme();
  const styles = {
    padded: css`
      padding: ${theme.spacing(2)};
    `,
    iconColor: css`
      filter: ${theme.palette.PCLab?.products?.approvalChain?.filter};
    `,
  };

  // const onlyStatusIsFiltered = Object.values(ISSUER).every(
  //   (issuer) => !activeFilters.includes(issuer),
  // );

  return (
    <Grid container spacing={1}>
      {PATENTS_DATA.map(({ title, patents }, index) => {
        return (
          <Grid item xs={12} md={6} lg={4} key={title}>
            <BorderItemBox
              stretched
              index={index}
              numberOfItems={PATENTS_DATA.length}
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={{ xs: 1, sm: 2 }}
                padding={{ xs: 2 }}
              >
                <Typography
                  variant="h6"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(`&#34;${title}&#34;`),
                  }}
                />
                {/* {patents.map(({ name, status, issuer }, idx) => {
                  return (
                    <Typography
                      variant="body2"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(name),
                      }}
                      style={{
                        opacity:
                          activeFilters.includes(
                            onlyStatusIsFiltered ? status : status && issuer,
                          ) || activeFilters.toString() === 'ALL'
                            ? 1
                            : 0.1,
                      }}
                      key={idx}
                    />
                  );
                })} */}
              </Box>
            </BorderItemBox>
          </Grid>
        );
      })}
    </Grid>
  );
};
