import React from 'react';
// import NewsCard from './news-card.component';
import Loading from '../../../../atoms/loading/loading.component';
import { IArticle } from '@/types/newsroom-interfaces';
import NewsCard from './news-card.component';

interface NewsGridProps {
  articles: IArticle[];
  loading: boolean;
}
const NewsGrid: React.FC<NewsGridProps> = ({ articles, loading }) => {
  if (loading) {
    return (
      <div className="w-full pt-2 pb-2">
        <Loading />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="w-full pt-2 pb-2">
        <h6
          className="h7 text-center text-primary p-2"
        >
          No articles found
        </h6>
      </div>
    );
  }

  if (articles.length === 1) {
    return (
      <div className="w-full pt-2 pb-2">
            <NewsCard article={articles[0]} index={0} />
      </div>
    );
  }
  return (
      <div className="w-full pt-2 pb-2">
        {articles.map((article, index) => (
          <div key={index}>
            <NewsCard article={article} index={index} />
          </div>
        ))}
    </div>
  );
};

export default NewsGrid;
