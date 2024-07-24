/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from '@mui/material';
import ContentBox from '../../../atoms/box/content-box.component';
import VerticalBox from '../../../atoms/box/vertical-box.component';
import AwardsHero from './awards-hero.component';
import AwardsList from './awards-list.component';

const Awards: React.FC = () => {
  return (
    <section>
      <ContentBox
        verticalContent={
          <VerticalBox padded>
            <Typography variant="verticalHeading">Awards</Typography>
          </VerticalBox>
        }
        mainContent={
          <>
            <AwardsHero />
            <AwardsList />
          </>
        }
      />
    </section>
  );
};

export default Awards;
