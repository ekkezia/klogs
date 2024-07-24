/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import showdown from 'showdown';
import {
  IArticle,
  IFeaturedArticle,
  IQueryParams,
} from '../../types/newsroom-interfaces';

const converter = new showdown.Converter();
const API_URL = `https://cms.parallelchain.io`;
const WEBAPI_URL = 'https://api.parallelchain.io';

export async function getArticles(limit: null | number) {
  const limitQuery = limit ? `&_limit=${limit}` : '';

  const res = await fetch(
    `${API_URL}/articles?_sort=pubdate:DESC${limitQuery}`,
  );
  const articles = await res.json();

  articles.forEach((article: IArticle) => {
    if (article.headlinePicture) {
      article.headlinePicture.url = `${API_URL}/${article.headlinePicture.url}`;
    }
  });

  return articles;
}

export async function getArticle(articleId: string) {
  const res = await fetch(`${API_URL}/articles/?url=${articleId}&_limit=1`);
  const articles = await res.json();

  try {
    articles[0].body = converter.makeHtml(articles[0].body);
    return articles[0];
  } catch (e) {
    return null;
  }
}

const getTagsQuery = (tags: string[]) => {
  if (!tags || tags?.length === 0 || tags?.includes('ALL')) return '';
  let tagsQuery = '';
  for (let i = 0; i < tags.length; i++) {
    tagsQuery += `&_where[${i}][tags_contains]=${tags[i]}`;
  }
  return tagsQuery;
};

export async function getAllArticles(params: IQueryParams) {
  const queryFilter = 'body'; // may customize if needed
  const startQuery = `&_start=${params?.start ?? 0}`;
  const limitQuery = params?.limit ? `&_limit=${params?.limit}` : '';
  const tagsQuery = getTagsQuery(params?.tags);
  let searchQuery = '';
  if (params.search && params.search.length > 1) {
    const searchQueryArr = params.search.map(
      (word, idx) => `&_where[${idx}][${queryFilter}_contains]=${word} `,
    );
    searchQuery = searchQueryArr.join('');
  } else if (params.search && params.search.length === 1) {
    searchQuery = `&${queryFilter}_contains=${params.search} `;
  }
  const res = await fetch(
    `${API_URL}/articles/?_sort=pubdate:DESC${searchQuery}${startQuery}${limitQuery}${tagsQuery}`,
  );
  const articles = await res.json();
  articles.forEach((article: IArticle) => {
    if (article.headlinePicture) {
      article.headlinePicture.url = `${API_URL}/${article.headlinePicture.url}`;
    }
  });
  return articles;
}

export async function getAllArticlesCount(params: IQueryParams) {
  const queryFilter = 'body'; // may customize if needed
  const startQuery = `&_start=${params?.start ?? 0}`;
  const limitQuery = params?.limit ? `&_limit=${params?.limit}` : '';
  const tagsQuery = getTagsQuery(params?.tags);
  let searchQuery = '';
  if (params.search && params.search.length > 1) {
    const searchQueryArr = params.search.map(
      (word, idx) => `&_where[${idx}][${queryFilter}_contains]=${word} `,
    );
    searchQuery = searchQueryArr.join('');
  } else if (params.search && params.search.length === 1) {
    searchQuery = `&${queryFilter}_contains=${params.search}`;
  }
  const res = await fetch(
    `${API_URL}/articles/count?_sort=pubdate:DESC${searchQuery}${startQuery}${limitQuery}${tagsQuery}`,
  );
  const count = await res.json();
  return count;
}

export async function searchArticle(searchQuery: string[]) {
  const queryFilter = 'body'; // may customize if needed
  const res = await fetch(
    `${API_URL}/articles/?${queryFilter}_contains=${searchQuery}`,
  );
  const articles = await res.json();

  articles.forEach((article: IArticle) => {
    if (article.headlinePicture) {
      article.headlinePicture.url = `${API_URL}/${article.headlinePicture.url}`;
    }
  });

  return articles;
}

const getRelatedTagsQuery = (tags: string[]) => {
  if (!tags || tags?.length === 0 || tags?.includes('ALL')) return '';
  let tagsQuery = '';
  for (let i = 0; i < tags.length; i++) {
    tagsQuery += `&tags_contains[]=${tags[i]}`;
  }
  return tagsQuery;
};

export async function getRelatedArticles(tags: string[], articleId: string) {
  const tagsQuery = getRelatedTagsQuery(tags);
  const res = await fetch(
    `${API_URL}/articles?_sort=pubdate:DESC&_start=0&_limit=3&id_ne=${articleId}${tagsQuery}`,
  );
  const articles = await res.json();

  articles.forEach((article: IArticle) => {
    if (article.headlinePicture) {
      article.headlinePicture.url = `${API_URL}/${article.headlinePicture.url}`;
    }
  });

  return articles;
}

export async function getPinnedArticles() {
  const res = await fetch(`${API_URL}/articles?pinned=true&_sort=pubdate:DESC`);
  const articles = await res.json();

  articles?.forEach((article: IArticle) => {
    if (article.headlinePicture) {
      article.headlinePicture.url = `${API_URL}/${article.headlinePicture.url}`;
    }
  });

  return articles;
}

export async function getAllFeaturedArticles() {
  const res = await fetch(`${API_URL}/featured-articles`);
  const data = await res.json();

  data?.forEach((item: IFeaturedArticle) => {
    if (item.logo) {
      item.logo.url = `${API_URL}/${item.logo.url}`;
    }
  });

  return data;
}

interface IEmail {
  email: string;
}

export async function enrollSubscriber(email: IEmail) {
  try {
    const res = await fetch(`${WEBAPI_URL}/newsroom-subscription/enroll`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(email),
    });
  } catch (err) {
    throw err;
  }
}
