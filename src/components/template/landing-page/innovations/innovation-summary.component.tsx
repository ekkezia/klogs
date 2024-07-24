/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import DOMPurify from 'isomorphic-dompurify';
import { INNOVATIONS_DATA } from './innovationsData';
import SingleRowBox from '../../../atoms/box/single-row-box.component';

const InnovationSummary: React.FC = () => {
  const theme = useTheme();
  return (
    <Box>
      <SingleRowBox padded>
        <Typography
          variant="h2"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(INNOVATIONS_DATA.title),
          }}
        />
      </SingleRowBox>
      <Grid
        container
        borderBottom={`1px solid ${theme?.palette?.PCLab?.tertiary?.default}`}
      >
        <Grid
          container
          item
          xs={12}
          md={6}
          borderRight={{
            md: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
          }}
          borderBottom={{
            xs: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
            md: `0px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
          }}
          padding={{ xs: 2 }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              textTransform="uppercase"
              color={theme?.palette?.PCLab?.primary?.default}
            >
              Objective
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(INNOVATIONS_DATA.objective),
              }}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} md={6} padding={{ xs: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              textTransform="uppercase"
              color={theme?.palette?.PCLab?.primary?.default}
            >
              Strategy
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(INNOVATIONS_DATA.strategy),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InnovationSummary;
