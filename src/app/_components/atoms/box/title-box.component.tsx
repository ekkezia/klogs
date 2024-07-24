import React from 'react';
import SingleRowBox from './single-row-box.component';
import { Typography, useTheme } from '@mui/material';

interface TitleBoxProps {
  title: string;
  backgroundColor?: string;
  titleColor?: string;
  typographyVariant?: any;
}

const TitleBox: React.FC<TitleBoxProps> = ({
  title,
  backgroundColor,
  titleColor,
  typographyVariant,
}) => {
  const theme = useTheme();
  return (
    <SingleRowBox padded backgroundColor={backgroundColor}>
      <Typography
        variant={typographyVariant ? typographyVariant : 'h4'}
        color={titleColor}
      >
        {title}
      </Typography>
    </SingleRowBox>
  );
};

export default TitleBox;
