/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Button, Typography, styled, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

interface StaticBorderItemBoxProps {
  title: string;
  titleColor: string | undefined;
  subtitle: string | undefined;
  subtitileColor: string | undefined;
  description: string;
}
const StaticBorderItemBox: React.FC<StaticBorderItemBoxProps> = ({
  title,
  subtitle,
  titleColor,
  subtitileColor,
  description,
}) => {
  const theme = useTheme();
  const styles = {
    outerBox: css``,
    title: css``,
    description: css``,
  };
  const StyledBox = styled(Box)(({ theme }) => ({
    height: '100%',
    borderWidth: '1px 1px 1px 1px',
    borderStyle: 'solid',
    borderColor: theme?.palette?.PCLab?.tertiary?.default,
  }));
  const StyledTitleBox = styled(Box)(({ theme }) => ({
    borderWidth: '0px 0px 1px 0px',
    borderStyle: 'solid',
    borderColor: theme?.palette?.PCLab?.tertiary?.default,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  }));
  const StyledPaddedBox = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  }));
  return (
    <StyledBox>
      <StyledTitleBox>
        <Typography variant="body1" color={titleColor}>
          {title}
        </Typography>
        <Typography variant="body2" color={subtitileColor}>
          {subtitle}
        </Typography>
      </StyledTitleBox>
      <StyledPaddedBox>
        <Typography variant="body2">{description}</Typography>
      </StyledPaddedBox>
    </StyledBox>
  );
};

export default StaticBorderItemBox;
