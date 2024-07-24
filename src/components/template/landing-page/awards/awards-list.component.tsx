/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import { AWARDS_DATA } from './awardsData';
import CustomDropdownBottomToggle from '../../../molecule/dropdown/custom-dropdown-bottom-toggle.component';
import BorderItemBox from '../../../atoms/box/border-item-box.component';

const AwardsList: React.FC = () => {
  const styles = {
    imageContainer: css`
      position: relative;
      width: 100%;
      height: 200px;
    `,
  };

  return (
    <Grid container spacing={1}>
      {AWARDS_DATA.map(
        (
          { awardImage, awarderImage, alt, title, subtitle, content },
          index,
        ) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <BorderItemBox index={index} numberOfItems={AWARDS_DATA.length}>
                <CustomDropdownBottomToggle
                  summary={
                    <div css={styles.imageContainer}>
                      <Image
                        src={`/images/landing-page/awards/${awardImage}`}
                        layout="fill"
                        objectFit="contain"
                        alt={alt}
                        priority
                        placeholder="blur"
                        blurDataURL="data:image.png"
                      />
                    </div>
                  }
                  details={
                    <>
                      <Typography
                        variant="body4"
                        textTransform="uppercase"
                        fontWeight={700}
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(subtitle),
                        }}
                      />
                      <Typography
                        variant="h6"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(title),
                        }}
                        marginBottom={{ xs: 1 }}
                      />

                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={{ xs: 1 }}
                      >
                        {content.map(({ heading, description }, idx) => {
                          return (
                            <Box key={idx}>
                              <Typography
                                variant="body2"
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(heading),
                                }}
                                marginBottom={0.5}
                              />
                              {description &&
                                description.map((desc, idx) => {
                                  return (
                                    <Typography
                                      variant="body2"
                                      dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(desc),
                                      }}
                                      key={idx}
                                      marginBottom={0.5}
                                    />
                                  );
                                })}
                            </Box>
                          );
                        })}
                      </Box>
                    </>
                  }
                />
              </BorderItemBox>
            </Grid>
          );
        },
      )}
    </Grid>
  );
};

export default AwardsList;
