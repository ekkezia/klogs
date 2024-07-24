/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
/** @jsxImportSource @emotion/react */
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import { Box, Grid, Typography, useTheme } from '@mui/material';
import NewsroomFilters from './searchbar/newsroom-filters.component';
import SearchBar from './searchbar/searchbar.component';
import NewsGrid from './articles-block/news-grid.component';
import NewsPagination from './articles-block/news-pagination.component';
import { getAllArticles, getAllArticlesCount } from '../../../../../api/newsroom';
import ContentBox from '../../../atoms/box/content-box.component';
import { useQueryParams } from '../../../../../hooks/useQueryParams';

export const NEWS_PER_PAGE = 6;
export const DEFAULT_PAGE = 1;

const NewsroomContent: React.FC = () => {
  const theme = useTheme();
  const styles = {
    searchContainer: css`
      display: flex;
      width: 100%;
      height: 40px;
      background-color: ${theme.palette.PCLab?.background?.primary};
    `,
    titleContainer: css`
      height: 100%;
      padding-left: ${theme.spacing(2)};
      border-width: 0px 0px 0px 0px;
      border-style: solid;
      border-color: ${theme.palette.PCLab.tertiary.default};
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      @media (max-width: 600px) {
        padding: ${theme.spacing(1)} ${theme.spacing(1)};
      }
    `,
  };
  const pathname = usePathname()
  const { query } = router;
  let search = query.search ? query.search.split(/\+|%2B/g) : '';
  if (query.search && query.search.length > 0) {
    search = search.map((item, idx) => item.trim());
  }
  const params = {
    search,
    page: Number(query.page) || 1,
    tags: query.tags ? query.tags.split(',') : '',
    limit: NEWS_PER_PAGE,
  };
  const { queryParams, setQueryParams } = useQueryParams(router, params);

  const [articles, setArticles] = useState([]);
  const [activeFilters, setActiveFilters] = useState(['ALL']);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [countLoading, setCountLoading] = useState(false);

  const fetchData = async (params) => {
    setLoading(true);
    setCountLoading(true);
    getAllArticles(params)
      .then((data) => setArticles(data))
      .then(() => {
        setLoading(false);
        getAllArticlesCount(params)
          .then((count) => {
            setTotalCount(count);
          })
          .finally(() => setCountLoading(false));
      });
  };

  useEffect(() => {
    if (router.isReady) {
      let search = query.search ? query.search.split(/\+|%2B/g) : '';
      if (query.search && query.search.length > 0) {
        search = search.map((item, idx) => item.trim());
      }
      const params = {
        search,
        page: Number(query.page) || 1,
        tags: query.tags ? query.tags.split(',') : '',
        limit: NEWS_PER_PAGE,
      };
      if (query.tags) {
        setActiveFilters(decodeURIComponent(query.tags || ''));
      }
      setQueryParams(params);
      fetchData(params);
    }
  }, [router]);

  // Search
  const handleSearch = (e) => {
    e.preventDefault();
    let updatedData;
    if (!queryParams.search || queryParams.search?.length === 0) {
      updatedData = {
        ...queryParams,
        start: (query.page - 1) * NEWS_PER_PAGE,
        page: DEFAULT_PAGE,
        tags: ['ALL'],
      };
      removeQueryParam('search');
    } else {
      let search = queryParams.search.split(/\+|%2B/g);
      if (search.length > 0) {
        search = search.map((item, idx) => item.trim());
      }
      updatedData = {
        ...queryParams,
        search,
      };
    }
    setQueryParams(updatedData);
    fetchData(updatedData);
  };

  // Filters
  const handleFiltersChange = (filters) => {
    const updatedData = {
      ...queryParams,
      page: DEFAULT_PAGE,
      search:
        queryParams.search.length > 1
          ? queryParams.search.split(' ').join(',')
          : queryParams.search,
      tags: filters,
    };
    setQueryParams(updatedData);
    fetchData(updatedData);
  };

  // Page
  const handlePageChange = (event, value) => {
    const updatedData = {
      ...queryParams,
      start: (value - 1) * queryParams.limit,
      page: value,
    };
    setQueryParams(updatedData);
    fetchData(updatedData);
  };

  const setSearch = (value) => {
    setQueryParams({
      ...queryParams,
      search: value,
    });
  };

  return (
    <ContentBox
      mainContent={
        <Box>
          <Grid
            container
            display="flex"
            alignItems="center"
            padding={{ xs: 1, md: 0 }}
          >
            <Grid item xs={12} md={3} css={styles.titleContainer}>
              <Typography
                variant="h7"
                color={theme?.palette?.PCLab?.text?.secondary}
              >
                Latest Stories
              </Typography>
            </Grid>
            <Grid item xs={12} md={9} display="flex" justifyContent="flex-end">
              <NewsroomFilters
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                handleFiltersChange={handleFiltersChange}
              />
            </Grid>
          </Grid>
          <Box css={styles.searchContainer}>
            <SearchBar
              search={queryParams.search}
              setSearch={setSearch}
              handleSearch={handleSearch}
              loading={loading}
            />
          </Box>
          <NewsGrid articles={articles} loading={loading} />
          <NewsPagination
            pagesCount={Math.ceil(totalCount / NEWS_PER_PAGE)}
            page={queryParams.page}
            onPageChange={handlePageChange}
            loading={countLoading}
          />
        </Box>
      }
    />
  );
};

export default NewsroomContent;
