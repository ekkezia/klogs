/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import LandingPageAnimation from './_components/template/landing-page/landing-page-animation.component';
import LandingPageHero from './_components/template/landing-page/landing-page-hero.component';
import NewsroomContent from './_components/template/newsroom/articles/newsroom-content.component';

export const HERO_TOP = '30vh';
export const HERO_TOP_SM = '25vh';
export const CONTENT_TOP = '40vh';
export const CONTENT_TOP_SM = '35vh';

export default function Home() {
  const styles = {
    contentContainer: css`
      position: relative;
      margin-top: ${CONTENT_TOP};
      @media (max-width: 600px) {
        margin-top: ${CONTENT_TOP_SM};
      }
    `,
  };

  return (
    <Box>
      <LandingPageAnimation />
      <LandingPageHero />
      <div css={styles.contentContainer}>
          {/* <NewsroomHero /> */}
         {/* <NewsroomContent /> */}
      </div>
    </Box>
  );
}
