/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  HORIZONTAL_BAR_HEIGHT,
  INNER_BAR_WIDTH,
  INNER_BAR_WIDTH_LG,
  INNER_BAR_WIDTH_SM,
  Z_INDEX_FIXED_BARS,
} from '../../_ui/Layout';

interface IContentBoxProps {
  padded?: boolean;
  verticalContent?: React.ReactNode;
  mainContent: React.ReactNode;
  noBorderBottom?: boolean;
  sticky?: boolean;
}

const ContentBox: React.FC<IContentBoxProps> = ({
  padded,
  verticalContent,
  mainContent,
  noBorderBottom,
  sticky,
}) => {
  const theme = useTheme();
  const styles = {
    contentWrapper: css`
      position: ${sticky ? 'sticky' : 'relative'};
      top: ${sticky ? HORIZONTAL_BAR_HEIGHT : ''};
      z-index: ${sticky ? Z_INDEX_FIXED_BARS : ''};
      width: 100%;
      height: fit-content;
      display: flex;
      border-bottom: ${noBorderBottom ? '0px' : '1px'} solid
        ${theme.palette?.PCLab?.tertiary?.default};
    `,
    padded: css`
      padding: ${theme.spacing(2)};
    `,
    verticalBar: css`
      display: flex;
      justify-content: flex-end;
      width: ${INNER_BAR_WIDTH};
      min-width: ${INNER_BAR_WIDTH};
      max-width: ${INNER_BAR_WIDTH};
      border-right: 1px solid ${theme.palette?.PCLab?.tertiary?.default};
      @media (max-width: 1200px) {
        min-width: ${INNER_BAR_WIDTH_LG};
        width: ${INNER_BAR_WIDTH_LG};
      }
      @media (max-width: 600px) {
        min-width: ${INNER_BAR_WIDTH_SM};
        width: ${INNER_BAR_WIDTH_SM};
      }
    `,
    mainBar: css`
      width: calc(100% - ${INNER_BAR_WIDTH});
      @media (max-width: 1200px) {
        width: calc(100% - ${INNER_BAR_WIDTH_LG});
      }
      @media (max-width: 600px) {
        width: calc(100% - ${INNER_BAR_WIDTH_SM});
      }
    `,
  };

  return (
    <div css={styles.contentWrapper}>
      <div
        css={css`
          ${styles.verticalBar};
        `}
      >
        {verticalContent ?? ''}
      </div>

      <div
        css={css`
          ${styles.mainBar};
          ${padded && styles.padded};
        `}
      >
        {mainContent}
      </div>
    </div>
  );
};

export default ContentBox;
