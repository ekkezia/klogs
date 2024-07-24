/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { CONTENT_WRITE_AREA } from '../../../styles/shared';
import { Typography } from '@mui/material';

const currentYear = new Date().getFullYear();

const FOOTER = Object.freeze([
  {
    text: `Copyright © ${currentYear} ParallelChain Lab. All rights reserved.`,
    url: null,
  },
  // {
  //   text: 'Terms & Conditions.',
  //   url: 'https://copyright.com',
  // },
]);

const Footer: React.FC = () => {
  const theme = useTheme();
  const styles = {
    container: css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      position: relative;
      padding: ${theme.spacing(2)};
    `,
  };

  return (
    <div css={styles.container}>
      {FOOTER.map(({ text, url }) =>
        url ? (
          <a href={url} target="_blank" rel="noreferrer" key={text}>
            <Typography variant="body3">{text}</Typography>
          </a>
        ) : (
          <Typography variant="body3" key={text}>
            {text}
          </Typography>
        ),
      )}
    </div>
  );
};

export default Footer;
