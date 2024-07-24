/** @jsxImportSource @emotion/react */
import React from 'react';
import ContentBox from '../../../atoms/box/content-box.component';
import { Typography } from '@mui/material';
import VerticalBox from '../../../atoms/box/vertical-box.component';
import EcosystemText from './ecosystem-text.component';
import EcosystemInteractive from './interactive/ecosystem-interactive.component';

const Ecosystem: React.FC = () => {
  return (
    <>
      <section>
        <ContentBox
          verticalContent={
            <VerticalBox padded>
              <Typography variant="verticalHeading">The Ecosystem</Typography>
            </VerticalBox>
          }
          mainContent={
            <>
              <EcosystemText />
              <EcosystemInteractive />
            </>
          }
        />
      </section>
    </>
  );
};

export default Ecosystem;
