import React from 'react';
import ContentBox from '../../../../atoms/box/content-box.component';
import { Grid, Typography, useTheme } from '@mui/material';

interface SubscriptionHeaderProps {}
const SubscriptionHeader: React.FC<SubscriptionHeaderProps> = () => {
  const theme = useTheme();
  return (
    <ContentBox
      mainContent={
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            alignItems={'center'}
            padding={{ xs: 1, sm: 2 }}
            borderRight={`1px solid ${theme.palette.PCLab?.tertiary?.default}`}
          >
            <Typography variant="h4">Never Miss A Beat</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" padding={{ xs: 1, sm: 2 }}>
              Submit your email and receive the latest news and updates from
              ParallelChain straight into your inbox.
            </Typography>
          </Grid>
        </Grid>
      }
    />
  );
};

export default SubscriptionHeader;
