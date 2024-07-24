/** @jsxImportSource @emotion/react */
import Link from 'next/link';
import Image from 'next/image';
import { css } from '@emotion/react';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { IFunction } from '../../../../types/shared';

type variantOptions = 'primary' | 'secondary';

interface ICustomButtonProps {
  variant?: variantOptions;
  darkMode?: boolean;
  url?: string;
  newTab?: boolean;
  customColor?: string;
  fitContent?: boolean;
  limitHeight?: boolean;
  action?: IFunction;
  disabled?: boolean;
  icon?: string;
  noBorder?: boolean;
  testId?: string;
}

const CustomButton: React.FC<ICustomButtonProps> = ({
  variant,
  darkMode,
  url,
  newTab,
  customColor,
  fitContent,
  limitHeight,
  action,
  disabled,
  children,
  icon,
  noBorder,
  testId,
}) => {
  const theme = useTheme();

  const styles = {
    btn: css`
      width: fit-content;
      height: fit-content;
      padding: ${theme.spacing(1)} ${theme.spacing(2)};
      font-family: Barlow;
      font-size: 14px;
      text-transform: uppercase;
      font-weight: 700;
      display: flex;
      justify-content: ${icon ? 'space-between' : 'center'};
      align-items: center;
      text-decoration: none;
      // @media (max-width: 600px) {
      //   font-size: 12px;
      // }
    `,
    link: css`
      width: fit-content;
      height: fit-content;
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
      border: 1px solid grey;
      border-width: ${noBorder ? '0px' : '1px'};
      border-style: solid;
      border-color: ${customColor ??
      theme.palette.PCLab?.primary?.default}; // default custom color is blue
      cursor: pointer;
      .icon {
        filter: invert(100%);
      }
      &:hover {
        color: ${customColor ??
        theme.palette.PCLab?.primary?.default}; // default custom color is blue
        background: ${theme.palette.PCLab?.background?.primary};
        border-width: ${noBorder ? '0px' : '1px'};
        border-style: solid;
        border-color: ${customColor ?? theme.palette.PCLab?.primary?.default};
        .icon {
          filter: ${theme.palette.PCLab?.primary?.defaultFilter};
        }
      }
    `,
    secondary: css`
      color: ${darkMode
        ? theme.palette.PCLab?.text?.contrast
        : theme.palette.PCLab?.text?.primary};
      background: none;
      border-width: ${noBorder ? '0px' : '1px'};
      border-style: solid;
      border-color: ${darkMode
        ? theme.palette.PCLab?.tertiary?.default
        : theme.palette.PCLab?.neutral?.black};
      cursor: pointer;
      .icon {
        filter: invert(25%) sepia(22%) saturate(1336%) hue-rotate(170deg)
          brightness(94%) contrast(91%);
      }

      &:hover {
        color: ${theme.palette.PCLab?.text?.contrast};
        background: ${theme.palette.PCLab?.text?.primary};
        .icon {
          filter: invert(100%);
        }
      }
    `,
    disabled: css`
      color: ${theme.palette.PCLab?.text?.contrast};
      background: ${theme.palette.PCLab?.primary
        ?.default}; // default custom color is blue
      // border-width: 0px 1px 0px 0px;
      // border-style: solid;
      // border-color: ${theme.palette.PCLab?.tertiary?.default};
      opacity: 0.5;
      cursor: not-allowed;
      .icon {
        filter: invert(25%) sepia(22%) saturate(1336%) hue-rotate(170deg)
          brightness(94%) contrast(91%);
      }
    `,
  };

  function getVariant() {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
    }
  }

  const variantCss = getVariant();

  if (disabled)
    return (
      <button
        type="submit"
        css={css`
          ${styles.btn};
          ${fitContent ? '' : styles.stretched};
          ${styles.disabled}
        `}
        disabled={disabled}
        data-testid={testId}
      >
        {children}
        {icon && (
          <Image
            src={`/images/icons/button/${icon}`}
            width={16}
            height={16}
            alt="External link"
            className="icon"
          />
        )}
      </button>
    );

  // For action/handling function related button
  if (!url)
    return (
      <button
        type="submit"
        css={css`
          ${styles.btn};
          ${variantCss};
          ${fitContent ?? styles.stretched};
        `}
        onClick={action}
        data-testid={testId}
      >
        {children}
        {icon && (
          <Image
            src={`/images/icons/button/${icon}`}
            width={16}
            height={16}
            alt="External link"
            className="icon"
          />
        )}
      </button>
    );
  else {
    if (!newTab && url) {
      return (
        <Link href={url}>
          <button
            type="submit"
            css={css`
              ${styles.btn};
              ${variantCss};
              ${fitContent ?? styles.stretched};
            `}
            data-testid={testId}
          >
            {children}
            {icon && (
              <Image
                src={`/images/icons/button/${icon}`}
                width={16}
                height={16}
                alt="External link"
                className="icon"
              />
            )}
          </button>
        </Link>
      );
    }
  }

  // default is external link or newTab
  return (
    <a
      href={url}
      target={newTab ? '_blank' : '_self'}
      rel="noreferrer"
      css={css`
        ${styles.link};
        ${fitContent ?? styles.stretched};
      `}
    >
      <button
        type="submit"
        css={css`
          ${styles.btn};
          ${variantCss};
          ${fitContent ?? styles.stretched};
        `}
        data-testid={testId}
      >
        {children}
        {icon && (
          <div>
            <Image
              src={`/images/icons/button/${icon ?? `external-link-icon.svg`}`}
              width={16}
              height={16}
              alt="External link"
              className="icon"
            />
          </div>
        )}
      </button>
    </a>
  );
};

export default CustomButton;
