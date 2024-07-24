import React from 'react';
import ContentBox from '../../../../atoms/box/content-box.component';
import { Grid, Typography, styled, useTheme } from '@mui/material';
import SubscriptionHeader from './subscription-header.component';
import SubscriptionInput from './subscription-input.component';

interface SubscriptionBlockProps {}
const SubscriptionBlock: React.FC<SubscriptionBlockProps> = () => {
  const theme = useTheme();
  const Title = styled(Typography)(({ theme }) => ({}));
  const Subtitle = styled(Typography)(({ theme }) => ({}));
  const ConsentDescrip = styled(Typography)(({ theme }) => ({}));

  return (
    <>
      <SubscriptionHeader />
      <SubscriptionInput />
    </>
  );
};

export default SubscriptionBlock;
