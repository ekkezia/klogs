/** @jsxImportSource @emotion/react */
import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import ContentBox from '../../../atoms/box/content-box.component';
import VerticalBox from '../../../atoms/box/vertical-box.component';
import { Box, Typography } from '@mui/material';
import InnovationsApplications from './innovations-applications.component';
import SingleRowBox from '../../../atoms/box/single-row-box.component';
import { INNOVATIONS_APPLICATIONS } from './innovationsData';

const Innovations: React.FC = () => {
  return (
    <section>
      <ContentBox
        verticalContent={
          <VerticalBox padded>
            <Typography variant="verticalHeading">The Innovations</Typography>
          </VerticalBox>
        }
        mainContent={
          <>
            <Box>
              <SingleRowBox padded>
                <Typography
                  variant="h2"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(INNOVATIONS_APPLICATIONS.title),
                  }}
                />
                <Typography
                  variant="h4"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      INNOVATIONS_APPLICATIONS.subtitle,
                    ),
                  }}
                />
              </SingleRowBox>
            </Box>
            <InnovationsApplications />
          </>
        }
      />
    </section>
  );
};

export default Innovations;
