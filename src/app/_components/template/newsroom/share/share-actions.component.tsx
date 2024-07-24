/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import SocialShareButtons from './social-share-buttons.component';
import LinkCopyButton from './link-copy-button.component';
import { Box } from '@mui/material';

const ShareActions: React.FC = () => {
  const theme = useTheme();

  const styles = {
    container: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      position: sticky;
      height: fit-content;
      border-left: 1px solid ${theme?.palette?.PCLab?.tertiary?.default};
      // LAYOUT BREAK: Socials go inside NavSmall
      @media (max-width: 1200px) {
        width: 100%;
        border-left: 0px solid ${theme?.palette?.PCLab?.tertiary?.default};
      }
    `,
  };

  return (
    <Box css={styles.container}>
      <LinkCopyButton />
      <SocialShareButtons />
    </Box>
  );
};

export default ShareActions;
