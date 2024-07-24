'use server'

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import NewsroomFilters from './searchbar/newsroom-filters.component';
import SearchBar from './searchbar/searchbar.component';
import NewsGrid from './articles-block/news-grid.component';
import NewsPagination from './articles-block/news-pagination.component';
import ContentBox from '../../../atoms/box/content-box.component';
import { useQueryParams } from '../../../../hooks/useQueryParams';
import { SanityDocument } from 'next-sanity';

import { sanityFetch } from '@/sanity/client';

const EVENTS_QUERY = `*[_type == "tour"]{
  _id, 
  date, 
  venue, 
  ticketLink, 
  title, 
  slug
}|order(date desc)`;

export const NEWS_PER_PAGE = 6;
export const DEFAULT_PAGE = 1;

async const NewsroomContent: React.FC = () => {
  const concerts = await sanityFetch<SanityDocument[]>({
    query: EVENTS_QUERY,
  });


  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('paramName'); // Replace 'paramName' with your query parameter key

  // let search = query.search ? query.search.split(/\+|%2B/g) : '';
  // if (query.search && query.search.length > 0) {
  //   search = search.map((item, idx) => item.trim());
  // }
  // const params = {
  //   search,
  //   page: Number(query.page) || 1,
  //   tags: query.tags ? query.tags.split(',') : '',
  //   limit: NEWS_PER_PAGE,
  // };
  // const { queryParams, setQueryParams } = useQueryParams(router, params);

  const [articles, setArticles] = useState([]); // todo: change to server
  // const [activeFilters, setActiveFilters] = useState(['ALL']);
  // const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false); // todo: change to loading cache
  // const [countLoading, setCountLoading] = useState(false);

  // const fetchData = async (params) => {
  //   setLoading(true);
  //   setCountLoading(true);
  //   getAllArticles(params)
  //     .then((data) => setArticles(data))
  //     .then(() => {
  //       setLoading(false);
  //       getAllArticlesCount(params)
  //         .then((count) => {
  //           setTotalCount(count);
  //         })
  //         .finally(() => setCountLoading(false));
  //     });
  // };

  // useEffect(() => {
  //   if (router.isReady) {
  //     let search = query.search ? query.search.split(/\+|%2B/g) : '';
  //     if (query.search && query.search.length > 0) {
  //       search = search.map((item, idx) => item.trim());
  //     }
  //     const params = {
  //       search,
  //       page: Number(query.page) || 1,
  //       tags: query.tags ? query.tags.split(',') : '',
  //       limit: NEWS_PER_PAGE,
  //     };
  //     if (query.tags) {
  //       setActiveFilters(decodeURIComponent(query.tags || ''));
  //     }
  //     setQueryParams(params);
  //     fetchData(params);
  //   }
  // }, [router]);

  // // Search
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   let updatedData;
  //   if (!queryParams.search || queryParams.search?.length === 0) {
  //     updatedData = {
  //       ...queryParams,
  //       start: (query.page - 1) * NEWS_PER_PAGE,
  //       page: DEFAULT_PAGE,
  //       tags: ['ALL'],
  //     };
  //     removeQueryParam('search');
  //   } else {
  //     let search = queryParams.search.split(/\+|%2B/g);
  //     if (search.length > 0) {
  //       search = search.map((item, idx) => item.trim());
  //     }
  //     updatedData = {
  //       ...queryParams,
  //       search,
  //     };
  //   }
  //   setQueryParams(updatedData);
  //   fetchData(updatedData);
  // };

  // // Filters
  // const handleFiltersChange = (filters) => {
  //   const updatedData = {
  //     ...queryParams,
  //     page: DEFAULT_PAGE,
  //     search:
  //       queryParams.search.length > 1
  //         ? queryParams.search.split(' ').join(',')
  //         : queryParams.search,
  //     tags: filters,
  //   };
  //   setQueryParams(updatedData);
  //   fetchData(updatedData);
  // };

  // // Page
  // const handlePageChange = (event, value) => {
  //   const updatedData = {
  //     ...queryParams,
  //     start: (value - 1) * queryParams.limit,
  //     page: value,
  //   };
  //   setQueryParams(updatedData);
  //   fetchData(updatedData);
  // };

  // const setSearch = (value) => {
  //   setQueryParams({
  //     ...queryParams,
  //     search: value,
  //   });
  // };

  return (
    <ContentBox
      mainContent={
        <div>
          <div
            className="flex items-center"
          >
            <div className="pl-2 w-full h-[40px] flex items-center">
              <h6
                className="h6 text-secondary"
              >
                Latest Stories
              </h6>
            </div>
            <div className="flex justify-end">
              filters
              {/* <NewsroomFilters
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                handleFiltersChange={handleFiltersChange}
              /> */}
            </div>
          </div>
          <div className="flex w-full h-[40px] bg-white">
            searchbar
            {/* <SearchBar
              search={queryParams.search}
              setSearch={setSearch}
              handleSearch={handleSearch}
              loading={loading}
            /> */}
          </div>
          <NewsGrid articles={articles} loading={loading} />
          {/* <NewsPagination
            pagesCount={Math.ceil(totalCount / NEWS_PER_PAGE)}
            page={queryParams.page}
            onPageChange={handlePageChange}
            loading={countLoading}
          /> */}
        </div>
      }
    />
  );
};

export default NewsroomContent;
