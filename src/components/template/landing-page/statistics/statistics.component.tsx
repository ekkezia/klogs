/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import ContentBox from '../../../atoms/box/content-box.component';
import { Grid, Typography, useTheme } from '@mui/material';
import PatentsStatistics from '../patents/patents-statistics.component';
import FulltimeStatistics from './fulltime-statistics.component';
import YearsOfExperience from './years-of-experience.component';

export const IMAGE_HEIGHT = '200px';

const Statistics: React.FC = () => {
  const theme = useTheme();
  const styles = {
    container: css`
      width: 100%;
      // height: calc(${IMAGE_HEIGHT} + ${theme.spacing(2)} + ${theme.spacing(
        2,
      )});
      height: 100%;
      display: flex;
      padding: ${theme.spacing(2)};
    `,
  };
  return (
    <section>
      <ContentBox
        mainContent={
          <Grid container css={styles.container}>
            <Grid item xs={12} md={4}>
              <YearsOfExperience />
            </Grid>
            <Grid item xs={12} md={4}>
              <FulltimeStatistics />
            </Grid>
            <Grid item xs={12} md={4}>
              <PatentsStatistics />
            </Grid>
          </Grid>
        }
      />
    </section>
  );
};

export default Statistics;
