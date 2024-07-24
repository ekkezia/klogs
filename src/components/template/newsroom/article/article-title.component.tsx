/** @jsxImportSource @emotion/react */
import React from 'react';
import ContentBox from '../../../../atoms/box/content-box.component';
import { Box, Typography } from '@mui/material';
import DateLabel from '../../../../atoms/utils/date-label.component';

interface IArticleTitleProps {
  title: string;
  pubDate: string;
}
const ArticleTitle: React.FC<IArticleTitleProps> = ({ title, pubDate }) => {
  return (
    <ContentBox
      padded
      mainContent={
        <Box>
          <Typography variant="h2" marginBottom={{ xs: 2 }}>
            {title}
          </Typography>
          <DateLabel date={pubDate} />
        </Box>
      }
    />
  );
};

export default ArticleTitle;
