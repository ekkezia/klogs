/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, Typography } from '@mui/material';
import DOMPurify from 'isomorphic-dompurify';
import { ECOSYSTEM_DATA } from './ecosystemData';
import SingleRowBox from '../../../atoms/box/single-row-box.component';

const EcosystemText: React.FC = () => {
  return (
    <Box>
      <SingleRowBox padded>
        <Typography
          variant="h2"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(ECOSYSTEM_DATA.title),
          }}
        />
      </SingleRowBox>
      <Box padding={{ xs: 2 }}>
        <Typography
          variant="h6"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(ECOSYSTEM_DATA.text),
          }}
        />
      </Box>
    </Box>
  );
};

export default EcosystemText;
