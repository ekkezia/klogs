/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Box, styled, useTheme } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Skeleton } from '@material-ui/lab';
import {
  NEWSROOM_HERO_HEIGHT,
  NEWSROOM_HERO_MAXHEIGHT,
} from '../newsroom-hero.component';
import { getPinnedArticles } from '../../../../../../api/newsroom';
import Loading from '../../../../atoms/loading/loading.component';
import { IArticle } from '../../../../../../types/newsroom-interfaces';
import BlockLink from '../../../../atoms/utils/blocklink.component';

interface NewsCarouselProps {}
const NewsCarousel: React.FC<NewsCarouselProps> = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      getPinnedArticles()
        .then((data) => setArticles(data))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, []);

  if (!articles?.length && !loading) return null;

  const NewsCarouselBox = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    // height: '260px',
  }));
  const StyledCarousel = styled(Carousel)(({ theme }) => ({
    width: '100%',
  }));
  const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
    width: '100%',
    height: NEWSROOM_HERO_HEIGHT.xl,
    maxHeight: NEWSROOM_HERO_MAXHEIGHT,
    '@media (max-width: 425px)': {
      height: NEWSROOM_HERO_HEIGHT.xs,
    },
  }));
  const BannerBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'calc(100vw / 3)',
    '@media (min-width: 1440px)': {
      height: 'calc(1440px / 3)',
    },
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vw / 2)',
    },
  }));

  return (
    <NewsCarouselBox>
      <StyledCarousel
        swipe
        autoPlay
        indicators={false}
        cycleNavigation
        animation="slide"
        fullHeightHover={false}
        navButtonsAlwaysVisible
        navButtonsWrapperProps={{
          style: {
            width: 'max-content',
            top: 0,
            height: '100%',
            padding: `0 ${theme.spacing(4)}px`,
            [theme.breakpoints.down('sm')]: {
              padding: `0 ${theme.spacing(2)}px`,
            },
            backgroundColor: theme.palette.PCLab?.background?.primary,
          },
        }}
        navButtonsProps={{
          style: {
            color: theme.palette.PCLab?.text?.secondary,
          },
        }}
      >
        {loading ? (
          <Loading
            height={{
              xl: NEWSROOM_HERO_HEIGHT.xl,
              lg: NEWSROOM_HERO_HEIGHT.xl,
              md: NEWSROOM_HERO_HEIGHT.xl,
              sm: NEWSROOM_HERO_HEIGHT.xl,
              xs: NEWSROOM_HERO_HEIGHT.xs,
            }}
            maxHeight={NEWSROOM_HERO_MAXHEIGHT}
          />
        ) : (
          articles.map((article: IArticle, index) => (
            <BlockLink
              href={`newsroom/${article.url}`}
              key={index}
              cssStyle={{ width: '100%' }}
            >
              <BannerBox
                style={{
                  background: `url("${article?.headlinePicture?.url}") center/cover`,
                }}
              />
            </BlockLink>
          ))
        )}
      </StyledCarousel>
    </NewsCarouselBox>
  );
};

export default NewsCarousel;
