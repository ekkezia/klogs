/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from '@mui/material';
import SingleRowBox from '../../../atoms/box/single-row-box.component';

const AwardsHero: React.FC = () => {
  return (
    <SingleRowBox padded>
      <Typography variant="h2">Leading the Way</Typography>
      <Typography variant="h4">
        with Award-Winning Technology You Can Trust
      </Typography>
    </SingleRowBox>
  );
};

export default AwardsHero;
