/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';

interface IFeatureBox {
  title: string;
  description: string;
  icon: string;
  color: string | undefined;
  iconColorFilter: string | undefined;
  idx: number;
}

const FeatureBox: React.FC<IFeatureBox> = ({
  title,
  description,
  icon,
  color,
  iconColorFilter,
}) => {
  const theme = useTheme();
  const styles = {
    iconColor: css`
      filter: ${iconColorFilter};
    `,
  };

  return (
    <Box>
      <Box
        borderBottom={`1px solid ${theme?.palette?.PCLab?.tertiary?.default}`}
      >
        <Grid container height={150}>
          <Grid
            item
            xs={8}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ padding: theme.spacing(2) }}
            borderRight={{
              md: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
            }}
          >
            <Typography
              variant="h6"
              color={color ?? theme?.palette?.PCLab?.text?.primary}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(title),
              }}
            />
          </Grid>
          <Grid
            item
            xs={4}
            minHeight="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={icon}
              width={75}
              height={75}
              alt={title}
              priority
              placeholder="blur"
              blurDataURL="data:image.svg"
              css={styles.iconColor}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          padding: theme.spacing(2),
          gap: 1,
          height: '100%',
        }}
      >
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        />
      </Box>
    </Box>
  );
};

export default FeatureBox;
