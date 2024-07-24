import { NextRouter, useRouter } from 'next/navigation';
import { replaceCharacterWith } from '../utils/convertString';
import { useEffect, useState } from 'react';
import { IKeyString } from '../../types/shared';

const updateQueryParamsWithURLSearch = (
  router: NextRouter,
  param: string,
  value: string,
) => {
  if (router.isReady) {
    //@ts-ignore
    const params = new URLSearchParams(router?.query);
    params?.set(param, value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }
};

export default updateQueryParamsWithURLSearch;

export const getQueryParam = (router: NextRouter, param: string) => {
  // @ts-ignore
  const params = new URLSearchParams(router?.query);
  return params?.get(param);
};

export const updateQueryParam = (
  router: NextRouter,
  param: string,
  value: string,
) => {
  // @ts-ignore
  const params = new URLSearchParams(router?.query);
  params?.set(param, value);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);

  //   implemented new work around in which adding params to url will not cause component to re-render
  //   however still not able to figure out why router.replace() with shallow:true does not work,
  //   it could be due to dependencies compatability
  //   */
  // router?.replace(
  //   {
  //     pathname: router?.pathname,
  //     query: { [param]: value },
  //   },
  //   undefined,
  //   { shallow: true },
  // );
};

interface IParamObject {
  param: string;
  value: string;
}

export const useQueryParams = (router: NextRouter, params: any) => {
  const [queryParams, setQueryParams] = useState(params);

  useEffect(() => {
    updateQueryParams(router, queryParams);
  }, [router, queryParams]);

  return { queryParams, setQueryParams };
};

export const updateQueryParams = (router: NextRouter, data: IKeyString) => {
  //@ts-ignore
  const params = new URLSearchParams(router?.query);
  // format of data:
  // { [param]: value }
  Object.keys(data).map((key) => {
    params?.set(key.toString(), data[key].toString());
  });
  const paramsToPassToURL = replaceCharacterWith(params.toString(), '%2C', ',');

  const newUrl = `${window.location.pathname}?${paramsToPassToURL}`;
  window.history.replaceState({}, '', newUrl);
};

export const removeQueryParam = (router: NextRouter, paramToRemove: string) => {
  //@ts-ignore
  const params = new URLSearchParams(router?.query);
  params.delete(paramToRemove);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
};

export const useExtendedRouter = (param: string | undefined) => {
  const router = useRouter();
  let routerQuery = router?.query;
  let routerQueryByParam = router?.query[param ?? 'tag']; // by default is tag

  return { router, routerQuery, routerQueryByParam };
};

// to get sub path by '#'
export const useSubPathGetter = (splitter: string | undefined) => {
  const router = useRouter();
  const subPath = router.asPath.split(splitter ?? '#')[1]; // by default using '#' or ID identifier

  return subPath;
};

export const updateURLAnchor = (router: NextRouter, value: string) => {
  router.replace(`${router.pathname}#${value}`, undefined, {
    shallow: true,
  });
};
