/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, Typography } from '@mui/material';
import DOMPurify from 'isomorphic-dompurify';
import { ECOSYSTEM_MODES } from './ecosystemData';

const EcosystemModes: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={{ xs: 1, sm: 2 }}
      padding={{ xs: 2 }}
    >
      <Box>
        <Typography
          variant="suptitle"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(ECOSYSTEM_MODES.suptitle),
          }}
        />
        <Typography
          variant="h4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(ECOSYSTEM_MODES.title),
          }}
        />
      </Box>
      {ECOSYSTEM_MODES.text.map((text, index) => {
        return (
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(text),
            }}
            key={index}
          />
        );
      })}
    </Box>
  );
};

export default EcosystemModes;
