/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import ScrollTriggerBox from '../../../atoms/box/scroll-trigger-box.component';
import { ECOSYSTEM_DIAGRAM } from './ecosystemData';
import { breathe } from '../../../../styles/animation';

const ANIMATION_TIMEOUT = 100;

const EcosystemDiagram: React.FC = () => {
  const styles = {
    imageContainer: css`
      position: relative;
      width: 100%;
      height: 50vh;
    `,
  };

  const [currentImgIndex, setCurrentImgIndex] = useState(-1);
  // const triggerAnimation = () => {
  //   setCurrentImgIndex(0);
  //   setTimeout(() => {
  //     setCurrentImgIndex(1);
  //   }, ANIMATION_TIMEOUT * 4);
  //   setTimeout(() => {
  //     setCurrentImgIndex(2);
  //   }, ANIMATION_TIMEOUT * 8);
  // };

  return (
    // <ScrollTriggerBox index="OVERVIEW-DIAGRAM" handleTrigger={triggerAnimation}>
    <Box css={styles.imageContainer}>
      {/* {ECOSYSTEM_DIAGRAM.map(({ src, alt, imgIndex }, idx) => (
        <Image
          src={`/images/landing-page/ecosystem/${src}`}
          layout="fill"
          objectFit="contain"
          alt={alt}
          placeholder="blur"
          blurDataURL="data:image.svg"
          style={{
            // opacity: imgIndex <= currentImgIndex + 1 ? '1' : '0',
            position: 'absolute',
            top: 0,
            left: 0,
            transition: 'all 500ms',
          }}
          priority
          key={idx}
        />
      ))} */}
      <Image
        src={`/images/landing-page/ecosystem/ecosystem-diagram.gif`}
        layout="fill"
        objectFit="contain"
        alt="Ecosystem Diagram"
        placeholder="blur"
        blurDataURL="data:image.gif"
        priority
      />
    </Box>
    // </ScrollTriggerBox>
  );
};

export default EcosystemDiagram;
