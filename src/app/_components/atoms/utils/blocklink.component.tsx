/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface BlockLinkProps {
  backgroundColor?: string;
  href: string;
  children: ReactNode;
  cssStyle?: any;
  target?: string;
  fitContent?: boolean;
  fitWidth?: boolean;
}
const BlockLink: React.FC<BlockLinkProps> = ({
  backgroundColor,
  href,
  children,
  cssStyle,
  target,
  fitContent,
  fitWidth,
}) => {
  const theme = useTheme();
  const styles = {
    container: css`
      display: block;
      height: ${fitContent ? 'fit-content' : '100%'};
      width: ${fitWidth ? 'fit-content' : '100%'};
      cursor: pointer;
      text-decoration: none;
      &:hover {
        background-color: ${backgroundColor ??
        theme?.palette?.PCLab?.primary?.lighter};
      }
      ${cssStyle}
    `,
  };
  return (
    <Link href={href} passHref>
      <a css={styles.container} target={target ?? '_blank'} rel="noreferrer">
        {children}
      </a>
    </Link>
  );
};

export default BlockLink;
