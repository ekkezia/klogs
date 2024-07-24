/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { HORIZONTAL_BAR_HEIGHT } from '../../_ui/Layout';

interface VerticalBoxProps {
  padded?: boolean;
  stretched?: boolean;
  noRotation?: boolean; // default is false (always rotate)
  children: React.ReactNode;
}

const VerticalBox: React.FC<VerticalBoxProps> = ({
  padded,
  stretched,
  noRotation,
  children,
}) => {
  const theme = useTheme();

  // Outer Container that have borders across the viewport width
  const styles = {
    container: css`
      position: sticky;
      top: ${HORIZONTAL_BAR_HEIGHT};
      width: 48px;
      height: ${stretched ? '100%' : 'fit-content'};
      max-height: calc(100vh - (${HORIZONTAL_BAR_HEIGHT} * 2) + 2px);
      @media (max-width: 1200px) {
        width: 100%;
        height: 100%;
      }
    `,
    // options whether to have padding or not
    padded: css`
      padding: ${theme.spacing(4)} ${theme.spacing(2)};
      @media (max-width: 600px) {
        padding: ${theme.spacing(2)} ${theme.spacing(1)};
      }
    `,
    verticalTransform: css`
      width: 100%;
      height: ${stretched ? '100%' : 'fit-content'};
      writing-mode: vertical-lr;
      transform: rotate(180deg);
      display: flex;
      justify-content: flex-end;
    `,
  };

  return (
    <div css={styles.container}>
      <div
        css={css`
          ${!noRotation && styles.verticalTransform};
          ${padded && styles.padded};
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default VerticalBox;
