import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { IArticle } from '../../../../../../types/newsroom-interfaces';

interface IArticleHead {
  article: IArticle;
}
const ArticleHead: React.FC<IArticleHead> = ({ article }) => {
  const router = useRouter();

  const metaDescription = `${article.summary?.substring(0, 100)}...`;
  const metaImage = `https://cms.parallelchain.io/${article?.headlinePicture?.url}`;

  return (
    <Head>
      <title>{article.title} | ParallelChain Lab</title>
      <meta name="description" content={metaDescription} />
      <meta name="image" content={metaImage} />

      <meta
        property="og:title"
        content={`${article.title} | ParallelChain Lab`}
      />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta
        property="og:url"
        content={`https://parallelchain-lab.io/${router.asPath}`}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:domain"
        content={`https://parallelchain-lab.io/${router.asPath}`}
      />
      <meta
        name="twitter:title"
        content={`${article.title} | ParallelChain Lab`}
      />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:site" content="@ParallelChainLB" />
      <meta name="twitter:creator" content="@ParallelChainLB" />
    </Head>
  );
};

export default ArticleHead;
