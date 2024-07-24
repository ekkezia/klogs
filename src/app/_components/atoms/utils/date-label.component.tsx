import { Typography, styled } from '@mui/material';
import React from 'react';

interface DateLabelProps {
  date: string;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DateLabel: React.FC<DateLabelProps> = ({ date }) => {
  const year = date.slice(0, 4);
  const month = months[Number(date.slice(5, 7)) - 1];
  const day = date.slice(8, 10);
  const StyledTypography = styled(Typography)(({ theme }) => ({
    fontSize: 16,
    lineHeight: 1.2,
    color: theme?.palette?.PCLab?.text?.primary,
    fontFamily: 'Barlow',
    fontWeight: '400',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  }));
  return (
    <StyledTypography variant="h6">
      {`${day} ${month} ${year}`}
    </StyledTypography>
  );
};

export default DateLabel;
