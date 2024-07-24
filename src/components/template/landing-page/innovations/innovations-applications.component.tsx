/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import DOMPurify from 'isomorphic-dompurify';
import { IApplication, INNOVATIONS_APPLICATIONS } from './innovationsData';
import BorderItemBox from '../../../atoms/box/border-item-box.component';
import SingleRowBox from '../../../atoms/box/single-row-box.component';
import Image from 'next/image';
import CustomButton from '../../../atoms/buttons/custom-button.component';
import { ArrowForward } from '@mui/icons-material';

interface IApplicationProps {
  items: IApplication[];
  borderBottom?: boolean;
}

const Application: React.FC<IApplicationProps> = ({ items, borderBottom }) => {
  const theme = useTheme();
  const styles = {
    imageContainer: css`
      position: relative;
      width: 100%;
      height: 60px;
    `,
  };

  return (
    <>
      {items.map(({ suptitle, title, text, url }, idx) => {
        return (
          <Grid
            item
            xs={12}
            md={6}
            key={idx}
            borderBottom={
              borderBottom
                ? `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`
                : 'none'
            }
          >
            <BorderItemBox
              stretched
              noSpacing
              index={idx}
              numberOfItems={items.length}
              numberOfColumns={{
                xs: 1,
                md: 2,
                lg: 2,
              }}
            >
              <Grid container>
                <Grid item xs={9} padding={{ xs: 2 }}>
                  <Typography
                    variant="body2"
                    color={theme?.palette?.PCLab?.brand?.orange}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(suptitle),
                    }}
                  />
                  <Typography
                    variant="h6"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(title),
                    }}
                  />
                </Grid>

                {/* Button if URL exists */}
                {url && (
                  <Grid
                    item
                    xs={3}
                    display="flex"
                    borderLeft={`1px solid ${theme?.palette?.PCLab?.tertiary?.default}`}
                  >
                    <CustomButton variant="secondary" url={url} noBorder newTab>
                      <ArrowForward />
                    </CustomButton>
                  </Grid>
                )}
              </Grid>
              {text && (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(text),
                  }}
                  padding={{ xs: 2 }}
                />
              )}
            </BorderItemBox>
          </Grid>
        );
      })}
    </>
  );
};

const InnovationsApplications: React.FC = () => {
  return (
    <Grid container>
      <Application items={INNOVATIONS_APPLICATIONS.core} borderBottom />
      <Application items={INNOVATIONS_APPLICATIONS.platform} borderBottom />
      <Application items={INNOVATIONS_APPLICATIONS.application} />
    </Grid>
  );
};

export default InnovationsApplications;
