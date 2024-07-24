/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from '@mui/material';
import SingleRowBox from '../../../atoms/box/single-row-box.component';

const PatentsHero: React.FC = () => {
  return (
    <SingleRowBox padded>
      <Typography variant="h2">State-of-the-Art Blockchain</Typography>
      <Typography variant="h4">Built from Scratch</Typography>
    </SingleRowBox>
  );
};

export default PatentsHero;
