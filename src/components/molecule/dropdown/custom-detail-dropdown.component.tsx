/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Collapse, Typography, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';

type IVariant = 'primary' | 'secondary';

interface CustomDetailDropdownProps {
  variant?: IVariant;
  color?: string;
  title: string;
  description: string[];
  image?: string;
  isDropdownOpen?: boolean;
  borderBottom?: boolean;
}

const CustomDetailDropdown: React.FC<CustomDetailDropdownProps> = ({
  variant,
  color,
  title,
  description,
  image,
  isDropdownOpen,
  borderBottom,
}) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(isDropdownOpen);
  const theme = useTheme();
  const styles = {
    imageContainer: css`
      position: relative;
      width: 100%;
      height: 200px;
    `,
  };
  const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'Barlow',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '150%',
    textAlign: 'left',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  }));

  const PrimarySummaryBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderStyle: `solid`,
    borderWidth: `0px 0px 1px 0px`,
    borderColor: theme.palette?.PCLab?.tertiary?.default,
    backgroundColor: dropdownIsOpen
      ? theme?.palette?.PCLab?.background?.primary
      : color ?? theme?.palette?.PCLab?.primary?.default,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: dropdownIsOpen
        ? 'none'
        : theme?.palette?.PCLab?.secondary?.default,
    },
    '& .title': {
      color: dropdownIsOpen
        ? theme?.palette?.PCLab?.primary?.default
        : theme?.palette?.PCLab?.text?.contrast,
    },
  }));

  // naked outlined theme
  const SecondarySummaryBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderStyle: `solid`,
    borderWidth: `0px 0px ${borderBottom ? '1px' : '0px'} 0px`,
    borderColor: theme.palette?.PCLab?.tertiary?.default,
    backgroundColor: dropdownIsOpen
      ? color ?? theme?.palette?.PCLab?.primary?.default
      : theme?.palette?.PCLab?.background?.primary,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: dropdownIsOpen
        ? 'none'
        : theme?.palette?.PCLab?.secondary?.default,
    },
    '& .title': {
      color: dropdownIsOpen
        ? theme?.palette?.PCLab?.text?.contrast
        : color ?? theme?.palette?.PCLab?.primary?.default,
    },
  }));

  const StyledDetailsBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderStyle: `solid`,
    borderWidth: '0px 0px 1px 0px',
    borderColor: theme.palette?.PCLab?.tertiary?.default,
  }));

  if (variant === 'secondary') {
    return (
      <>
        <SecondarySummaryBox onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
          <StyledTypography variant="h6" className="title">
            {title}
          </StyledTypography>
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
        </SecondarySummaryBox>

        <Collapse in={dropdownIsOpen}>
          <StyledDetailsBox>
            {description.map((description, idx) => {
              return (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(description),
                  }}
                  key={idx}
                />
              );
            })}
            {image && (
              <Box css={styles.imageContainer}>
                <Image
                  src={image}
                  layout="fill"
                  objectFit="contain"
                  alt={title}
                  placeholder="blur"
                  blurDataURL={`data:image.png`}
                  priority
                />
              </Box>
            )}
          </StyledDetailsBox>
        </Collapse>
      </>
    );
  }

  // default: primary (outlined)
  return (
    <>
      <PrimarySummaryBox onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
        <StyledTypography variant="h6" className="title">
          {title}
        </StyledTypography>
        {!dropdownIsOpen && (
          <ExpandMoreIcon
            style={{
              color: dropdownIsOpen
                ? theme?.palette?.PCLab?.primary?.default
                : theme?.palette?.PCLab?.text?.contrast,
            }}
          />
        )}
        {dropdownIsOpen && (
          <ExpandLessIcon
            style={{
              color: dropdownIsOpen
                ? theme?.palette?.PCLab?.primary?.default
                : theme?.palette?.PCLab?.text?.contrast,
            }}
          />
        )}
      </PrimarySummaryBox>

      <Collapse in={dropdownIsOpen}>
        <StyledDetailsBox>
          {description.map((description, idx) => {
            return (
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(description),
                }}
                key={idx}
              />
            );
          })}
          {image && (
            <Box css={styles.imageContainer}>
              <Image
                src={image}
                layout="fill"
                objectFit="contain"
                alt={title}
                placeholder="blur"
                blurDataURL={`data:image.png`}
                priority
              />
            </Box>
          )}
        </StyledDetailsBox>
      </Collapse>
    </>
  );
};

export default CustomDetailDropdown;
