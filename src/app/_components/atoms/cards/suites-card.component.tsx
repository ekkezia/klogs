/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import BlockLink from '../utils/blocklink.component';

interface ISuitesCard {
  title: string;
  description: string;
  url: string;
  image: string;
  color: string | undefined;
  backgroundOnHover: string | undefined;
}

const SuitesCard: React.FC<ISuitesCard> = ({
  title,
  description,
  url,
  image,
  color,
  backgroundOnHover,
}) => {
  const theme = useTheme();
  const styles = {
    container: css`
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing(2)};
      padding: ${theme.spacing(2)};
      border-radius: 16px;
      transform: scale(1);
      transition: all 300ms;
      background: ${theme?.palette?.PCLab?.background?.primary};
      border: 2px solid ${theme?.palette?.PCLab?.tertiary?.default};
      &:hover {
        background: ${backgroundOnHover};
        border: 2px solid ${color};
        transform: scale(0.95);
        transition: all 300ms;
      }
    `,
  };

  return (
    <BlockLink href={url}>
      <Box css={styles.container}>
        <Image priority src={image} width={45} height={45} alt={title} />
        <Typography
          variant="h6"
          textAlign="center"
          color={color}
          minHeight={48}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(title),
          }}
        />
        <Typography
          variant="body2"
          textAlign="center"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        />
      </Box>
    </BlockLink>
  );
};

export default SuitesCard;
