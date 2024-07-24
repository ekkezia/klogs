/** @jsxImportSource @emotion/react */
import React, { ReactNode, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Collapse, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { IFunction } from '../../../../types/shared';

interface CustomDropdownTopToggleProps {
  dropdownIsOpen: boolean;
  setDropdownIsOpen: IFunction;
  title: ReactNode;
  titleBackgroundColor?: string;
  titleContainerPadding?: string;
  titleOpenBackgroundColor?: string;
  content: ReactNode;
  contentBackgroundColor?: string;
  contentPadded?: boolean;
  bordered?: boolean;
  borderColor?: string;
}

const CustomDropdownTopToggle: React.FC<CustomDropdownTopToggleProps> = ({
  dropdownIsOpen, // the state which controls the dropdown
  setDropdownIsOpen, // an empty function that gets called that will change the state above (specified in parent)
  title,
  titleBackgroundColor,
  titleContainerPadding,
  titleOpenBackgroundColor,
  content,
  contentBackgroundColor,
  contentPadded,
  bordered,
  borderColor,
}) => {
  const theme = useTheme();

  const StyledContainer = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
  }));

  const StyledExpandIconContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: titleContainerPadding ? titleContainerPadding : theme.spacing(2),
    cursor: 'pointer',
    backgroundColor: !dropdownIsOpen
      ? titleBackgroundColor
        ? titleBackgroundColor
        : theme?.palette?.PCLab?.tertiary?.default
      : titleOpenBackgroundColor ?? theme?.palette?.PCLab?.primary?.default,
    '&:hover': {
      backgroundColor:
        titleOpenBackgroundColor ?? theme?.palette?.PCLab?.primary?.default,
    },
  }));

  const StyledTitleBox = styled(Box)(({ theme }) => ({
    fontFamily: 'Barlow',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
  }));

  const StyledContentBox = styled(Box)(({ theme }) => ({
    padding: contentPadded ? `${theme.spacing(1)} ${theme.spacing(2)}` : '',
    backgroundColor: contentBackgroundColor
      ? contentBackgroundColor
      : theme?.palette?.PCLab?.background?.primary,
  }));

  const styles = {
    borderStyle: bordered ? `solid` : '',
    borderWidth: bordered ? '1px' : '',
    borderColor: borderColor
      ? borderColor
      : theme.palette?.PCLab?.tertiary?.default,
  };

  return (
    <div style={styles}>
      <StyledContainer>
        <StyledExpandIconContainer onClick={setDropdownIsOpen}>
          <StyledTitleBox>{title}</StyledTitleBox>
          {!dropdownIsOpen && (
            <ExpandMoreIcon
              style={{
                color: theme?.palette?.PCLab?.text?.contrast,
              }}
            />
          )}
          {dropdownIsOpen && (
            <ExpandLessIcon
              style={{
                color: theme?.palette?.PCLab?.text?.contrast,
              }}
            />
          )}
        </StyledExpandIconContainer>
      </StyledContainer>
      <div>
        <Collapse in={dropdownIsOpen}>
          <StyledContentBox>{content}</StyledContentBox>
        </Collapse>
      </div>
    </div>
  );
};

export default CustomDropdownTopToggle;
