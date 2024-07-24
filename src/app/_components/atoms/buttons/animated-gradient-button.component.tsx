/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import BlockLink from '../utils/blocklink.component';
import Image from 'next/image';
import { backgroundGradient } from '../../../styles/animation';
import useBoolean from '../../../../hooks/useBoolean';

interface AnimatedGradientButtonProps {
  hasTooltip?: boolean;
  tooltipLabel?: string;
  label: string;
  link: string;
}

const AnimatedGradientButton: React.FC<AnimatedGradientButtonProps> = ({
  hasTooltip,
  tooltipLabel = 'Tooltip Value Here',
  label,
  link,
}) => {
  const theme = useTheme();

  const styles = {
    button: css`
      display: flex;
      justify-content: space-between;
      // background-color: ${theme.palette.PCLab?.neutral?.black};
      background: linear-gradient(
        -45deg,
        ${theme?.palette?.PCLab?.primary?.default},
        ${theme?.palette?.PCLab?.brand?.green},
        ${theme?.palette?.PCLab?.neutral?.black},
        ${theme?.palette?.PCLab?.brand?.orange}
      );
      background-size: 400% 400%;
      animation: ${backgroundGradient} 4s ease infinite;
      margin-top: ${theme.spacing(2)};
      & .icon {
        filter: invert(100%) sepia(0%) saturate(7394%) hue-rotate(178deg)
          brightness(109%) contrast(70%);
      }
      &:hover {
        background: ${theme.palette.PCLab?.secondary?.default};
        animation: none;
        & .icon {
          filter: none;
        }
      }
    `,
  };

  const {
    value: hoverButton,
    setTrue: onHoverButton,
    setFalse: unhoverButton,
  } = useBoolean(false);

  return (
    <BlockLink href={link} target="_blank" fitContent fitWidth>
      {hasTooltip && (
        <Tooltip
          title={
            <span>
              <Typography
                variant="h7"
                textTransform="none"
                color={theme?.palette?.PCLab?.neutral?.white}
              >
                {tooltipLabel}
              </Typography>
            </span>
          }
        >
          <Box
            display="flex"
            flexDirection="row"
            gap={1}
            padding={{ xs: `${theme.spacing(1)} ${theme.spacing(2)}` }}
            width="fit-content"
            css={styles.button}
            onMouseEnter={onHoverButton}
            onMouseLeave={unhoverButton}
          >
            <Typography
              variant="h7"
              lineHeight={1}
              color={theme?.palette?.PCLab?.tertiary?.default}
            >
              {label}
            </Typography>
            <Image
              src={'/images/icons/button/external-link-icon.svg'}
              width={16}
              height={16}
              alt="External link"
              className="icon"
            />
          </Box>
        </Tooltip>
      )}
      {!hasTooltip && (
        <Box
          display="flex"
          flexDirection="row"
          gap={1}
          padding={{ xs: `${theme.spacing(1)} ${theme.spacing(2)}` }}
          width="fit-content"
          // borderTop={`1px solid ${theme?.palette?.PCLab?.tertiary?.default}`}
          // borderBottom={`1px solid ${theme?.palette?.PCLab?.tertiary?.default}`}
          css={styles.button}
          onMouseEnter={onHoverButton}
          onMouseLeave={unhoverButton}
        >
          <Typography
            variant="h7"
            lineHeight={1}
            color={theme?.palette?.PCLab?.tertiary?.default}
          >
            {label}
          </Typography>
          <Image
            src={'/images/icons/button/external-link-icon.svg'}
            width={16}
            height={16}
            alt="External link"
            className="icon"
          />
        </Box>
      )}
    </BlockLink>
  );
};

export default AnimatedGradientButton;
