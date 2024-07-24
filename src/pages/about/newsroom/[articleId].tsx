import React, { useEffect, useState } from 'react';
import { IArticle } from '../../../../types/newsroom-interfaces';
import { getArticles } from '../../../api-service/newsroom';
import Showdown from 'showdown';
import ArticleHead from '../../../components/template/about/newsroom/article/article-head.component';
import ArticleBody from '../../../components/template/about/newsroom/article/article-body.component';
import ArticleHeader from '../../../components/template/about/newsroom/article/article-header.component';
import ArticleTitle from '../../../components/template/about/newsroom/article/article-title.component';
import { useRouter } from 'next/navigation';

interface NewsArticleProps {
  article: IArticle;
}
const NewsArticle: React.FC<NewsArticleProps> = () => {
  const converter = new Showdown.Converter();
  const router = useRouter();
  const { articleId } = router.query;
  const [article, setArticle] = useState<any>();

  useEffect(() => {
    fetch(`https://cms.parallelchain.io/articles/?url=${articleId}&_limit=1`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data[0]);
      });
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>; // Add a loading state or error message
  }
  return (
    <>
      <ArticleHead article={article} />
      <ArticleHeader article={article} />
      <ArticleTitle
        title={article?.title ?? ''}
        pubDate={article.pubdate ?? ''}
      />
      <ArticleBody
        image={article.headlinePicture ?? ''}
        summary={article.summary ?? ''}
        body={converter.makeHtml(article.body) ?? ''}
      />
    </>
  );
};

export default NewsArticle;

// export async function getStaticPaths() {
//   const articles = await getArticles(null);

//   const paths = articles.map((article: IArticle) => ({
//     params: { articleId: article.url },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getServerSideProps({ params }: any) {
//   const converter = new Showdown.Converter();
//   const res = await fetch(
//     `https://cms.parallelchain.io/articles/?url=${params.articleId}&_limit=1`,
//   );
//   const article = (await res.json())[0];

//   if (!article) {
//     return {
//       notFound: true, // Return a 404 error if the article is not found
//     };
//   }

//   article.body = converter.makeHtml(article.body);
//   return {
//     props: {
//       article,
//     },
//   };
// }
