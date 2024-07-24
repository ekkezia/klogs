/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, Grid, Typography, styled } from '@mui/material';
import NewsCarousel from './news-carousel/news-carousel.component';
import ContentBox from '../../../atoms/box/content-box.component';
import useBreakpoints from '../../../../../hooks/useBreakpoints';
// import TwitterBlock from './twitter-block/twitter-block.component';

export const NEWSROOM_HERO_HEIGHT = {
  xl: 'calc(100vw / 3)',
  xs: 'calc(100vw / 2)',
};

export const NEWSROOM_HERO_MAXHEIGHT = '480px';

const NewsroomHero: React.FC = () => {
  const { isExtraSmallScreen } = useBreakpoints();
  const StyledBox = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: NEWSROOM_HERO_HEIGHT.xl,
    maxHeight: NEWSROOM_HERO_MAXHEIGHT,
    '@media (max-width: 425px)': {
      height: NEWSROOM_HERO_HEIGHT.xs,
    },
  }));

  const StyledGrid = styled(Grid)(({ theme }) => ({
    width: '100%',
    maxWidth: 1440,
  }));

  return (
    <main>
      <ContentBox
        padded
        mainContent={<Typography variant="h2">Newsroom</Typography>}
      />
      <ContentBox
        mainContent={
          <StyledBox>
            <StyledGrid
              container
              sx={{ width: '100%' }}
              direction={!isExtraSmallScreen ? 'row-reverse' : 'row'}
            >
              <Grid item xs={12}>
                <NewsCarousel />
              </Grid>
            </StyledGrid>
          </StyledBox>
        }
      />
    </main>
  );
};

export default NewsroomHero;
