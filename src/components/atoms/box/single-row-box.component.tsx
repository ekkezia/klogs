/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface ISingleRowBox {
  padded?: boolean | false;
  borderTop?: boolean | false;
  noBorderBottom?: boolean;
  backgroundColor?: string;
  fullHeight?: boolean;
  children: ReactNode;
}

const SingleRowBox: React.FC<ISingleRowBox> = ({
  padded,
  borderTop,
  noBorderBottom,
  backgroundColor,
  fullHeight,
  children,
}) => {
  const theme = useTheme();
  const styles = {
    singleBox: css`
      border-top: ${borderTop ? '1px' : '0px'} solid
        ${theme?.palette?.PCLab?.tertiary?.default};
      border-bottom: ${noBorderBottom ? '0px' : '1px'} solid
        ${theme?.palette?.PCLab?.tertiary?.default};
      width: 100%;
      height: ${fullHeight ? '100%' : ''};
      background: ${backgroundColor ?? ''};
      padding: ${padded ? theme.spacing(2) : 0};
    `,
  };

  // if box is SINGLE ITEM (not part of Grid)
  return <Box css={styles.singleBox}>{children}</Box>;
};

export default SingleRowBox;
