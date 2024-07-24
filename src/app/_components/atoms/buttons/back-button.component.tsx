/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

type variantOptions = 'primary' | 'secondary' | 'outlined';
type IFunction = (...args: any[]) => any;

interface IBackButtonProps {
  variant?: variantOptions;
  url?: string;
  customColor?: string;
  fitContent?: boolean;
  limitHeight?: boolean;
  disabled?: boolean;
  action?: IFunction;
}

const BackButton: React.FC<IBackButtonProps> = ({
  variant,
  url,
  customColor,
  fitContent,
  limitHeight,
  disabled,
  action,
  children,
}) => {
  const theme = useTheme();

  const styles = {
    btn: css`
      // fit-content styling
      width: fit-content;
      height: 100%;
      padding: ${theme.spacing(1)} ${theme.spacing(2)};
      font-family: Barlow;
      font-size: 14px;
      text-transform: uppercase;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      .icon {
        filter: invert(25%) sepia(22%) saturate(1336%) hue-rotate(170deg)
          brightness(94%) contrast(91%);
      }
      &:hover {
        .icon {
          filter: invert(100%);
        }
      }
    `,
    stretched: css`
      width: 100%;
      height: 100%;
      max-height: ${limitHeight ? '48px' : 'none'};
    `,
    primary: css`
      color: ${theme.palette.PCLab?.text?.contrast};
      background: ${customColor ??
      theme.palette.PCLab?.primary?.default}; // default custom color is blue
      border: 1px solid ${theme.palette.PCLab?.tertiary?.default};
      cursor: pointer;
      &:hover {
        color: ${customColor ??
        theme.palette.PCLab?.primary?.default}; // default custom color is blue
        background: none;
        border: 1px solid ${theme.palette.PCLab?.primary?.default};
      }
    `,
    secondary: css`
      color: ${theme.palette.PCLab?.neutral?.grey};
      background: none;
      border: none;
      cursor: pointer;
      &:hover {
        color: ${theme.palette.PCLab?.text?.contrast};
        background: ${theme.palette.PCLab?.primary?.default};
      }
    `,
    outlined: css`
      color: ${customColor ?? theme.palette.PCLab?.text?.contrast};
      background: none;
      border: 1px solid ${theme.palette.PCLab?.tertiary?.default};
      cursor: pointer;
      &:hover {
        color: ${theme.palette.PCLab?.text?.contrast};
        background: ${customColor ?? theme.palette.PCLab?.text?.primary};
      }
    `,
    disabled: css`
      color: ${theme.palette.PCLab?.text?.contrast};
      background: ${customColor ??
      theme.palette.PCLab?.primary?.default}; // default custom color is blue
      border: 1px solid ${theme.palette.PCLab?.tertiary?.default};
      opacity: 0.5;
      cursor: not-allowed;
    `,
  };

  function getVariant() {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'outlined':
        return styles.outlined;
    }
  }

  const variantCss = getVariant();

  if (disabled)
    return (
      <button
        css={css`
          ${styles.btn};
          ${fitContent ?? styles.stretched};
          ${styles.disabled}
        `}
      >
        <ArrowBackIosNewIcon />
        {children ?? ''}
      </button>
    );

  // For action/handling function related button
  if (!url && action)
    return (
      <button
        css={css`
          ${styles.btn};
          ${variantCss};
          ${fitContent ?? styles.stretched};
        `}
        onClick={action}
      >
        <ArrowBackIosNewIcon />
        {children ?? ''}
      </button>
    );

  // default is internal link
  return (
    <Link href={url ?? ''}>
      <button
        css={css`
          ${styles.btn};
          ${variantCss};
          ${fitContent ?? styles.stretched};
        `}
      >
        <ArrowBackIosNewIcon />
        {children ?? ''}
      </button>
    </Link>
  );
};

export default BackButton;
