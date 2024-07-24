import React from 'react';
import { Box, Grid, Typography, styled, useTheme } from '@mui/material';
import NewsCard from './news-card.component';
import { IArticle } from '../../../../../../types/newsroom-interfaces';
import Loading from '../../../../atoms/loading/loading.component';

interface NewsGridProps {
  articles: IArticle[];
  loading: boolean;
}
const NewsGrid: React.FC<NewsGridProps> = ({ articles, loading }) => {
  const StyledBox = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: `${theme.spacing(2)} 0`,
  }));

  const theme = useTheme();

  if (loading) {
    return (
      <StyledBox>
        <Loading />
      </StyledBox>
    );
  }

  if (articles.length === 0) {
    return (
      <StyledBox>
        <Typography
          variant="h7"
          color={theme?.palette?.PCLab?.primary?.default}
          textAlign="center"
          padding={{ xs: 2 }}
        >
          No articles found
        </Typography>
      </StyledBox>
    );
  }

  if (articles.length === 1) {
    return (
      <StyledBox>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <NewsCard article={articles[0]} index={0} />
          </Grid>
        </Grid>
      </StyledBox>
    );
  }
  return (
    <StyledBox>
      <Grid container spacing={1}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <NewsCard article={article} index={index} />
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  );
};

export default NewsGrid;
