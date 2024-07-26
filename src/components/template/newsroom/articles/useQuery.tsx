  // const router = useRouter()
  // const searchParams = useSearchParams()
  // const query = searchParams.get('paramName'); // Replace 'paramName' with your query parameter key

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

  // const [activeFilters, setActiveFilters] = useState(['ALL']);
  // const [totalCount, setTotalCount] = useState(0);
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
