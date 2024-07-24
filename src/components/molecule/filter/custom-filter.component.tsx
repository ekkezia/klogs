/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useTheme } from '@mui/material';

type IFunction = (...args: any[]) => any;

interface ICustomFilter {
  filterName: string; // change to filterCode later
  label: string;
  onClick: IFunction;
  active: boolean;
  fitContent?: boolean;
}

const CustomFilter: React.FC<ICustomFilter> = ({
  filterName,
  label,
  onClick,
  active,
  fitContent,
}) => {
  const theme = useTheme();
  const styles = {
    container: css`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${theme.spacing(1)} ${theme.spacing(2)};
      width: ${fitContent ? 'fit-content' : '100%'};
      height: ${fitContent ? 'fit-content' : '100%'};
      min-height: 40px;
      font-family: Barlow;
      color: ${active
        ? theme.palette.PCLab?.background?.primary
        : theme.palette.PCLab?.primary?.default};
      background: ${active && theme.palette.PCLab?.primary?.default};
      // border-width: 0px 1px 0px 0px;
      border-width: 1px;
      border-style: solid;
      border-color: ${theme.palette.PCLab?.tertiary?.default};
      font-size: 12px;
      line-height: 120%;
      font-weight: 700;
      text-transform: uppercase;
      cursor: pointer;
      &:hover {
        color: ${theme.palette.PCLab?.text?.contrast};
        background: ${theme.palette.PCLab?.primary?.default};
      }
      &:last-child {
        // border-width: 0px 1px 0px 0px;
      }
      @media (max-width: 600px) {
        width: fit-content;
      }
    `,
  };

  return (
    <div css={styles.container} onClick={() => onClick(filterName)}>
      {/* if label is not specified, filterName will be used */}
      {label ?? filterName}
    </div>
  );
};

export default CustomFilter;
