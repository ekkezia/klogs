/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { getPinnedArticles } from '../../../../../../api-service/newsroom';
import { Box, styled, useTheme } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Skeleton } from '@material-ui/lab';
import BlockLink from '../../../../../atoms/utils/blocklink.component';
import { IArticle } from '../../../../../../../types/newsroom-interfaces';
import ContentBox from '../../../../../atoms/box/content-box.component';
import { Z_INDEX_ABOVE, Z_INDEX_BASE } from '../../../../../_ui/Layout';

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
  }));
  const StyledCarousel = styled(Carousel)(({ theme }) => ({
    width: '100%',
  }));
  const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
    width: '100%',
    height: 'calc(100vw / 3)',
    '@media (min-width: 1440px)': {
      height: 'calc(1440px / 3)',
    },
  }));
  const BannerBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'calc(100vw / 3)',
    '@media (min-width: 1440px)': {
      height: 'calc(1440px / 3)',
    },
  }));

  return (
    <NewsCarouselBox>
      <StyledCarousel
        swipe
        autoPlay
        indicators
        cycleNavigation
        animation="slide"
        fullHeightHover={false}
        navButtonsAlwaysVisible
        navButtonsWrapperProps={{
          style: {
            width: 'max-content',
            top: 0,
            height: '100%',
            padding: `0 ${theme.spacing(4)}`,
            [theme.breakpoints.down('sm')]: {
              padding: `0 ${theme.spacing(2)}px`,
            },
          },
        }}
        navButtonsProps={{
          style: {
            width: 40,
            height: 40,
            margin: 0,
            padding: 0,
            borderRadius: 8,
            border: '1px solid #fff',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          },
        }}
        indicatorContainerProps={{
          style: {
            marginTop: 0,
            position: 'absolute',
            bottom: 48,
            left: 0,
            zIndex: `${2 * Z_INDEX_ABOVE + Z_INDEX_BASE}`,
          },
        }}
        indicatorIconButtonProps={{
          style: {
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #19867F 100%)',
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: '#19867F',
            background:
              'linear-gradient(180deg, rgba(25, 134, 127, 0) 0%, #19867F 100%)',
          },
        }}
      >
        {loading ? (
          <StyledSkeleton variant="rect" animation="wave" />
        ) : (
          articles.map((article: IArticle, index) => (
            <BlockLink
              href={`newsroom/${article.url}`}
              key={index}
              cssStyle={{ width: '100%' }}
            >
              <BannerBox
                style={{
                  background: `url("${article?.headlinePicture?.url}") center/contain`,
                  //   background: `url("${article?.headlinePicture?.url}") center/cover`,
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
