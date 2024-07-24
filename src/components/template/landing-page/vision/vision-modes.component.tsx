/** @jsxImportSource @emotion/react */
import React from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import DOMPurify from 'isomorphic-dompurify';
import { VISION_MODES_DATA } from './visionData';

const VisionModes: React.FC = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      border={`1px solid ${theme?.palette?.PCLab?.tertiary?.default}`}
    >
      <Grid
        item
        xs={12}
        md={6}
        padding={{ xs: 2 }}
        borderRight={{
          md: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
        }}
        borderBottom={{
          xs: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
          md: `0px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
        }}
      >
        <Typography
          variant="h5"
          color={theme?.palette?.PCLab?.brand?.green}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(VISION_MODES_DATA.private.title),
          }}
          textAlign="center"
          marginBottom={{ xs: 1 }}
        />
        {VISION_MODES_DATA.private.text.map((text: string, index: number) => {
          return (
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(text),
              }}
              key={index}
            />
          );
        })}
      </Grid>
      <Grid item xs={12} md={6} padding={{ xs: 2 }}>
        <Typography
          variant="h5"
          color={theme?.palette?.PCLab?.brand?.orange}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(VISION_MODES_DATA.mainnet.title),
          }}
          textAlign="center"
          marginBottom={{ xs: 1 }}
        />
        {VISION_MODES_DATA.mainnet.text.map((text: string, index: number) => {
          return (
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(text),
              }}
              key={index}
            />
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          color={theme?.palette?.PCLab?.text?.contrast}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              VISION_MODES_DATA.interParallelChain.title,
            ),
          }}
          style={{
            background: theme?.palette?.PCLab?.background?.contrast,
          }}
          textAlign="center"
          padding={{ xs: 1 }}
        />
      </Grid>
    </Grid>
  );
};

export default VisionModes;
