/** @jsxImportSource @emotion/react */
import React from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import ContentBox from '../../atoms/box/content-box.component';
import CustomButton from '../../atoms/buttons/custom-button.component';
import VerticalBox from '../../atoms/box/vertical-box.component';

const Legal: React.FC = () => {
  const theme = useTheme();
  return (
    <section>
      <ContentBox
        verticalContent={
          <VerticalBox padded>
            <Typography variant="verticalHeading">Legal</Typography>
          </VerticalBox>
        }
        mainContent={
          <Grid
            container
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
          >
            <Grid
              item
              xs={12}
              borderBottom={`1px solid ${theme?.palette?.PCLab?.tertiary?.default}`}
            >
              <CustomButton
                variant="secondary"
                url="/legal/terms-of-use"
                noBorder
                newTab
              >
                Terms of Use
              </CustomButton>
            </Grid>
            <Grid item xs={12}>
              <CustomButton
                variant="secondary"
                url="/legal/privacy-policy"
                noBorder
                newTab
              >
                Privacy Policy
              </CustomButton>
            </Grid>
          </Grid>
        }
      />
    </section>
  );
};

export default Legal;
