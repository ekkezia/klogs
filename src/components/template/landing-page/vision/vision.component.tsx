/** @jsxImportSource @emotion/react */
import React from 'react';
import ContentBox from '../../../atoms/box/content-box.component';
import { Typography, useTheme } from '@mui/material';
import VerticalBox from '../../../atoms/box/vertical-box.component';
import VisionHero from './vision-hero.component';

const Vision: React.FC = () => {
  const theme = useTheme();
  return (
    <section
      style={{
        borderTop: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
      }}
    >
      <ContentBox
        padded
        verticalContent={
          <VerticalBox padded>
            <Typography variant="verticalHeading">The Vision</Typography>
          </VerticalBox>
        }
        mainContent={<VisionHero />}
      />
    </section>
  );
};

export default Vision;
