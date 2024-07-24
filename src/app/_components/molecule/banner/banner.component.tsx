/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import useScrollPosition from '../../../../hooks/useScrollPosition';
import Image from 'next/image';
import useBreakpoints from '../../../../hooks/useBreakpoints';

interface IBanner {
  variant: 'primary' | 'secondary' | 'overlay';
  image: string;
  backgroundImage?: string;
  parallax?: boolean;
  children: ReactNode;
  header?: ReactNode;
}

const Banner: React.FC<IBanner> = ({
  variant,
  image,
  backgroundImage,
  parallax,
  children,
  header,
}) => {
  const theme = useTheme();
  const { scrollPosition } = useScrollPosition();
  const { isMediumScreen, isLargeScreen, isSmallScreen } = useBreakpoints();

  const styles = {
    primaryContainer: css`
      padding: ${isSmallScreen ? theme.spacing(0) : theme.spacing(4)};
      position: relative;
      height: fit-content;
      width: 100%;
      background-image: url(${backgroundImage});
      background-repeat: ${parallax && 'norepeat'};
      background-position-y: ${parallax && scrollPosition * 0.02}rem;
      background-size: ${isLargeScreen
        ? '270%'
        : isMediumScreen
        ? '300%'
        : '150%'};
      display: flex;
      flex-direction: row;
      @media (max-width: 900px) {
        flex-direction: column-reverse;
      }
      @media (max-width: 600px) {
        flex-direction: column-reverse;
        background-size: 400%;
      }
    `,
    secondaryContainer: css`
      padding: ${isSmallScreen ? theme.spacing(0) : theme.spacing(4)};
      position: relative;
      height: fit-content;
      // min-height: 360px;
      width: 100%;
      background: ${theme?.palette?.PCLab?.tertiary?.default};
    `,
    textContainer: css`
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    `,
    primary: css`
      padding-right: ${theme.spacing(2)};
      @media (max-width: 600px) {
        padding: ${theme.spacing(2)};
      }
    `,
    secondary: css`
      padding-right: ${theme.spacing(6)};
      @media (max-width: 900px) {
        // padding: ${theme.spacing(4)};
      }
      @media (max-width: 600px) {
        // padding: ${theme.spacing(2)};
      }
    `,
  };

  // VARIANT: SECONDARY
  if (variant === 'secondary') {
    return (
      <Grid container css={styles.secondaryContainer}>
        <Box width="100%" padding={{ xs: theme.spacing(2), md: 0 }}>
          {header}
        </Box>
        <Grid item xs={2} md={4} display="flex">
          <Box>
            <Image
              src={image}
              width={182}
              height={182}
              alt="ParallelChain Logo"
              priority
            />
          </Box>
        </Grid>
        <Grid item xs={10} md={8}>
          <Box
            css={css`
              ${styles.textContainer} ${styles.secondary}
            `}
            paddingBottom={{ xs: theme.spacing(2), md: 0 }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    );
  }

  if (variant === 'overlay') {
    return (
      <Grid
        container
        css={styles.primaryContainer}
        flexDirection="row"
        overflow="hidden"
      >
        <Grid item xs={12} md={7} paddingRight={{ md: 2 }}>
          <Box
            css={css`
              ${styles.textContainer} ${styles.primary}
            `}
          >
            {children}
          </Box>
        </Grid>
        {isMediumScreen && (
          <Grid
            item
            xs={12}
            md={5}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box width="100%" padding={{ xs: theme.spacing(2), md: 0 }}>
              {header}
            </Box>
            <Image
              src={image}
              width={isSmallScreen ? 320 : 400}
              height={isSmallScreen ? 320 : 400}
              alt="FinTech360 Banner"
              priority
            />
          </Grid>
        )}
        {!isMediumScreen && (
          <Box position="absolute" right="-100px" top="10px">
            <Image
              src={image}
              width={600}
              height={500}
              alt="FinTech360 Banner"
              priority
            />
          </Box>
        )}
      </Grid>
    );
  }

  // VARIANT: PRIMARY
  return (
    <Grid container css={styles.primaryContainer}>
      <Grid item xs={12} md={7} paddingRight={{ md: 2 }}>
        <Box
          css={css`
            ${styles.textContainer} ${styles.primary}
          `}
        >
          {children}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <Image
            src={image}
            width={isSmallScreen ? 320 : 400}
            height={isSmallScreen ? 320 : 400}
            alt="FinTech360 Banner"
            priority
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Banner;
