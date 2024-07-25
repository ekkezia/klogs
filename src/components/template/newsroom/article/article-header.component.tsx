import ContentBox from '@/components/atoms/box/content-box.component';
import NewsTag from '@/components/atoms/utils/news-tag.component';
import { IArticle } from '@/types/newsroom-interfaces';
import React from 'react';

interface IArticleHeader {
  article: IArticle;
}
const ArticleHeader: React.FC<IArticleHeader> = ({ article }) => {
  return (
    <ContentBox
      mainContent={
        <div
          className="w-full flex flex-row justify-between"
        >
          {/* <BackButton variant="secondary" url="/about/newsroom" fitContent /> */}
          Back Button
          {article?.tags?.length > 0 ? (
            <div className="flex gap-2">
              {article?.tags?.map((tag, index) => (
                <NewsTag text={tag} key={index} asHeader />
              ))}
            </div>
          ) : null}
        </div>
      }
    />
  );
};

export default ArticleHeader;
