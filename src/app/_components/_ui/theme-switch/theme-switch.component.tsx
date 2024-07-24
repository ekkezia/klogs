/** @jsxImportSource @emotion/react */
// @ts-nocheck
import { css } from '@emotion/react';
import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { blueTheme, greenTheme, orangeTheme } from '@/app/theme';
import { PLabThemeContext } from '@/contextStore/mouse-context';

type IFunction = (...args: any[]) => any;

type IColorVariant = 'blue' | 'orange' | 'green';

interface IThemeSwitch {
  colorVariant: string;
  onClick: IFunction;
  active: boolean;
}

const ThemeSwitch: React.FC<IThemeSwitch> = ({
  colorVariant,
  onClick,
  active,
}) => {
  const theme = useTheme();
  const styles = {
    switch: css`
      width: 16px;
      height: 16px;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        border: 2px solid ${theme.palette.PCLab?.primary?.lighter};
        filter: brightness(150%);
      }
    `,
    blue: css`
      background: ${theme.palette.PCLab?.brand?.blue};
    `,
    orange: css`
      background: ${theme.palette.PCLab?.brand?.orange};
    `,
    green: css`
      background: ${theme.palette.PCLab?.brand?.green};
    `,
    active: css`
      width: 18px;
      height: 18px;
      border: 2px solid ${theme.palette.PCLab?.primary?.lighter};
    `,
  };

  function getColorVariant() {
    switch (colorVariant) {
      case 'blue':
        return styles.blue;
      case 'orange':
        return styles.orange;
      case 'green':
        return styles.green;
    }
  }

  const colorVariantCss = getColorVariant();

  return (
    <>
      <div
        css={css`
          ${styles.switch};
          ${colorVariantCss};
          ${active && styles.active};
        `}
        onClick={() => onClick()}
      />
    </>
  );
};

const ThemeSwitches: React.FC = () => {
  const { setUserTheme } = useContext(PLabThemeContext);
  const theme = useTheme();
  const styles = {
    container: css`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${theme.spacing(1)} ${theme.spacing(1)};
      gap: ${theme.spacing(1)};
      flex-wrap: wrap;
    `,
  };

  const COLOR_VARIANTS = ['blue', 'orange', 'green'];

  const [activeThemeSwitch, setActiveThemeSwitch] = useState('blue');
  const handleSelectTheme = (variant: string) => {
    setActiveThemeSwitch(variant);
  };

  function getUserTheme() {
    switch (activeThemeSwitch) {
      case 'blue':
        return blueTheme;
      case 'orange':
        return orangeTheme;
      case 'green':
        return greenTheme;
      default:
        return theme;
    }
  }

  useEffect(() => {
    setUserTheme(getUserTheme());
  }, [activeThemeSwitch]);

  return (
    <div css={styles.container}>
      {COLOR_VARIANTS.map((variant, index) => {
        return (
          <ThemeSwitch
            colorVariant={variant}
            active={activeThemeSwitch === variant}
            onClick={() => handleSelectTheme(variant)}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default ThemeSwitches;
