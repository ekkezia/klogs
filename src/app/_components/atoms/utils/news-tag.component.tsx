import { Box, Typography, styled } from '@mui/material';
import React from 'react';

interface NewsTagProps {
  text: string;
  asHeader?: boolean;
}
const NewsTag: React.FC<NewsTagProps> = ({ text, asHeader }) => {
  const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    fontSize: 12,
    lineHeight: 1.2,
    fontWeight: '700',
    fontFamily: 'Barlow',
    borderRight: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
    textTransform: 'uppercase',
    color: theme.palette.PCLab?.primary?.default,
    backgroundColor: theme?.palette?.PCLab?.background?.primary,
    // marginRight: 8,
    '&:last-child': {
      marginRight: 0,
    },
    [theme.breakpoints.down('xs')]: {
      padding: '8px 12px',
    },
  }));

  const StyledHeaderTag = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    height: '40px',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    fontSize: 12,
    lineHeight: 1.2,
    fontWeight: '700',
    fontFamily: 'Barlow',
    borderRight: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
    textTransform: 'uppercase',
    color: theme.palette.PCLab?.text?.contrast,
    backgroundColor: theme?.palette?.PCLab?.primary?.default,
    [theme.breakpoints.down('xs')]: {
      padding: '8px 12px',
    },
  }));

  if (asHeader) return <StyledHeaderTag>{text}</StyledHeaderTag>;

  return <StyledBox>{text}</StyledBox>;
};

export default NewsTag;
