/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, Typography } from '@mui/material';
import ContentBox from '@/app/_components/atoms/box/content-box.component';
import DateLabel from '@/app/_components/atoms/utils/date-label.component';

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
