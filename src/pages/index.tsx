/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import LandingPageAnimation from '../components/template/landing-page/landing-page-animation.component';
import Vision from '../components/template/landing-page/vision/vision.component';
import LandingPageHero from '../components/template/landing-page/landing-page-hero.component';
import CustomHead from '../components/organism/custom-head/custom-head.component';
import NewsroomHero from '../components/template/newsroom/articles/newsroom-hero.component';
import NewsroomContent from '../components/template/newsroom/articles/newsroom-content.component';

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
    <div>
      <CustomHead
        title="ParallelChain Lab"
        content="The Powerhouse of Innovation. ParallelChain Lab develops tailored integrated software suites built with cutting-edge blockchain and A.I. technologies. Powering businesses of all sizes with the most scalable, interoperable, affordable digital solutions."
        metaTitle="ParallelChain Lab | HOME"
        metaKeywords="Blockchain, Technology, Web3, ParallelChain, XPLL, Software, Digital, Crypto, Cryptocurrency, Artificial Intelligence, AI, Innovation, FinTech, KYC, SaaS"
      />
      {/* <LandingPageAnimation />
      <LandingPageHero />
      <div css={styles.contentContainer}>
        <Vision />
          <NewsroomHero />
         <NewsroomContent />
      </div> */}
    </div>
  );
}
