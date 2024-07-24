import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { TERMS_OF_USE_DATA } from './termsOfUseData';
import DOMPurify from 'isomorphic-dompurify';
import ContentBox from '../../../atoms/box/content-box.component';

const TermsOfUseSummary: React.FC = () => {
  const theme = useTheme();
  return (
    <ContentBox
      mainContent={
        <main>
          <Typography
            variant="h2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(TERMS_OF_USE_DATA.summary.title),
            }}
            padding={{ xs: 1, sm: 2 }}
            borderBottom={`1px solid ${theme?.palette?.PCLab?.tertiary?.default}`}
          />
          <Box
            padding={{ xs: 1, sm: 2 }}
            display="flex"
            flexDirection="column"
            gap={{ xs: 1, sm: 2 }}
          >
            {TERMS_OF_USE_DATA.summary.text.map(
              (text: string, index: number) => {
                return (
                  <Typography
                    variant="body1"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(text),
                    }}
                    key={index}
                  />
                );
              },
            )}
          </Box>
        </main>
      }
    />
  );
};

export default TermsOfUseSummary;
