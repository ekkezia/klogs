/** @jsxImportSource @emotion/react */
import React, { ReactNode, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Collapse, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface CustomDropdownBottomToggleProps {
  summary: ReactNode;
  details: ReactNode;
  color?: string;
}

const CustomDropdownBottomToggle: React.FC<CustomDropdownBottomToggleProps> = ({
  summary,
  details,
  color,
}) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const theme = useTheme();

  const StyledContainer = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    // borderStyle: `solid`,
    // borderWidth: '0px 1px 0px 1px',
    // borderColor: theme.palette?.PCLab?.tertiary?.default,
  }));

  const StyledSummaryBox = styled(Box)(({ theme }) => ({
    fontFamily: 'Barlow',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme?.palette?.PCLab?.background?.primary,
  }));

  const StyledExpandIconContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    cursor: 'pointer',
    backgroundColor: !dropdownIsOpen
      ? theme?.palette?.PCLab?.tertiary?.default
      : color ?? theme?.palette?.PCLab?.primary?.default,
  }));

  const StyledDetailsBox = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    backgroundColor: theme?.palette?.PCLab?.background?.primary,
    borderTop: `1px solid ${theme?.palette?.PCLab?.background?.primary}`,
  }));

  return (
    <StyledContainer onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
      <StyledSummaryBox>{summary}</StyledSummaryBox>

      <Collapse in={dropdownIsOpen}>
        <StyledDetailsBox>{details}</StyledDetailsBox>
      </Collapse>

      <StyledExpandIconContainer>
        {!dropdownIsOpen && (
          <ExpandMoreIcon
            style={{
              color: dropdownIsOpen
                ? theme?.palette?.PCLab?.text?.contrast
                : theme?.palette?.PCLab?.text?.secondary,
            }}
          />
        )}
        {dropdownIsOpen && (
          <ExpandLessIcon
            style={{
              color: dropdownIsOpen
                ? theme?.palette?.PCLab?.text?.contrast
                : theme?.palette?.PCLab?.text?.secondary,
            }}
          />
        )}
      </StyledExpandIconContainer>
    </StyledContainer>
  );
};

export default CustomDropdownBottomToggle;
