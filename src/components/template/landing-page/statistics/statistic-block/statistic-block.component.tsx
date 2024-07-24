/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import CustomCountUp from '../../../../_ui/count-up/custom-count-up.component';
import Image from 'next/image';
import { IMAGE_HEIGHT } from '../statistics.component';
import useScrollPosition from '../../../../../hooks/useScrollPosition';
import { filterGradient, shake } from '../../../../../styles/animation';

interface IStatisticBlock {
  number?: number;
  image?: string;
  alt?: string;
  suptext?: string;
  subtext?: string;
  plusSign?: boolean;
  color?: string;
  duration: number;
}

const StatisticBlock: React.FC<IStatisticBlock> = ({
  number,
  image,
  alt,
  suptext,
  subtext,
  plusSign,
  color,
  duration,
}) => {
  const theme = useTheme();
  const styles = {
    imageContainer: css`
      position: relative;
      width: 100%;
      // height: ${IMAGE_HEIGHT};
      height: 150px;
      opacity: 0.5;
      // animation: ${filterGradient} 2s infinite;
      @media (max-width: 900px) : {
        height: 50px;
      }
    `,
  };
  const { scrollPosition } = useScrollPosition();

  return (
    <Grid container marginBottom={{ xs: 8, md: 0 }}>
      <Grid item xs={6} md={12} css={styles.imageContainer}>
        <Image
          src={`/images/landing-page/statistics/${image}`}
          layout="fill"
          objectFit="contain"
          priority
          placeholder="blur"
          blurDataURL="data:image.png"
          alt={alt}
        />
      </Grid>
      <Grid item xs={6} md={12}>
        {scrollPosition > 0 && number && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={{ xs: '80px' }}
          >
            <CustomCountUp
              number={number}
              delay={0.3}
              color={color}
              duration={duration}
            />
            {plusSign && (
              <Typography
                variant="h1"
                color={theme?.palette?.PCLab?.primary?.lighter}
              >
                +
              </Typography>
            )}
          </Box>
        )}
        {suptext && (
          <Typography
            variant="h4"
            textTransform="uppercase"
            color={theme?.palette?.PCLab?.text?.primary}
            textAlign="center"
          >
            {suptext}
          </Typography>
        )}
        {subtext && (
          <Typography
            variant="h5"
            textTransform="uppercase"
            color={theme?.palette?.PCLab?.text?.primary}
            textAlign="center"
          >
            {subtext}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default StatisticBlock;
