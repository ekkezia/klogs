import { cache } from 'react';

import { unstable_cache } from 'next/cache';
import { cookies } from 'next/headers';
import 'server-only';
import { parse, stringify } from 'superjson';
import { z } from 'zod';

// import { BACKEND_API_KEY, BACKEND_API_URL } from '@/config';
import handleResponse from '@/utils/handle-response';

const ProviderMetadataSchema = z.object({
  public_id: z.string(),
  resource_type: z.string(),
});

const FormatSchema = z.object({
  ext: z.string(),
  url: z.string(),
  hash: z.string(),
  mime: z.string(),
  name: z.string(),
  path: z.string().nullable(),
  size: z.number(),
  width: z.number(),
  height: z.number(),
  sizeInBytes: z.number(),
  provider_metadata: ProviderMetadataSchema,
});

const FormatsSchema = z.object({
  small: FormatSchema,
  thumbnail: FormatSchema,
});

const BannerAttributesSchema = z.object({
  name: z.string(),
  alternativeText: z.string().nullable(),
  caption: z.string().nullable(),
  width: z.number(),
  height: z.number(),
  formats: FormatsSchema,
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  size: z.number(),
  url: z.string(),
  previewUrl: z.string().nullable(),
  provider: z.string(),
  provider_metadata: ProviderMetadataSchema,
  createdAt: z.string().transform((str) => new Date(str)),
  updatedAt: z.string().transform((str) => new Date(str)),
});

const BannerDataSchema = z.object({
  id: z.number(),
  attributes: BannerAttributesSchema,
});

const BannerSchema = z.object({
  data: BannerDataSchema,
});

export const ArticleSchema = z.object({
  id: z.number(),
  attributes: z.object({
    title: z.string(),
    body: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    banner: BannerSchema,
  }),
});
export type IArticleSchema = z.infer<typeof ArticleSchema>;

export const ArticlesSchema = z.object({
  data: z.array(ArticleSchema),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number(),
    }),
  }),
});
export type IArticlesSchema = z.infer<typeof ArticlesSchema>;

export const GetProjectErrorSchema = z.object({
  detail: z.string(),
});
export type IGetProjectErrorSchema = z.infer<typeof GetProjectErrorSchema>;

// https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#preloading-data

export function preloadProject() {
  void getArticles();
}

// const getArticles = cache(async () => {
//   // const cookie = cookies().get('access_token');
//   // if (!cookie?.value) {
//   //   return { success: false, error: 'User must be logged in' } as const;
//   // }

//   const tags = [`projects`];

//   // https://github.com/vercel/next.js/issues/51613#issuecomment-1759296111
//   const cachedResult = await unstable_cache(
//     async () => {
//       const result = await fetchProject();
//       return stringify(result);
//     },
//     tags,
//     { tags }
//   )();

//   return parse<ReturnType<typeof fetchProject>>(cachedResult);
// });

async function getArticles() {
  const url = new URL(`http://127.0.0.1:1337/api/articles?populate=*`);
  // const options = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     // 'X-API-KEY': BACKEND_API_KEY,
  //   },
  //   method: 'GET',
  // };
  try {
    const response = await fetch(url);
    // const json = await response.json();
    // console.log('articlesss', json);

    // return json;
    return await handleResponse(response, ArticlesSchema);
  } catch (err) {
    console.log(err);
  }
}

export default getArticles;
