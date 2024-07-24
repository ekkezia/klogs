import React from 'react';
import { Z_INDEX_ABOVE, Z_INDEX_BASE } from '@/styles/shared';
import BlockLink from '../../../../atoms/utils/blocklink.component';
import NewsTag from '../../../../atoms/utils/news-tag.component';
import DateLabel from '../../../../atoms/utils/date-label.component';
import { IArticle } from '@/types/newsroom-interfaces';

interface NewsCardProps {
  cssStyle?: React.CSSProperties;
  article: IArticle;
  minified?: boolean;
  articlePage?: boolean;
  externalPage?: boolean;
  newTab?: boolean;
  index: number | 1;
}

const NewsCard: React.FC<NewsCardProps> = ({
  cssStyle,
  article,
  minified,
  articlePage,
  externalPage,
  newTab,
  index,
}) => {
  const isLeftItem = index % 2 === 0;

  return (
    <BlockLink
      href={
        articlePage
          ? article.url
          : externalPage
          ? `company/newsroom/${article.url}`
          : `newsroom/${article.url}`
      }
      target={newTab ? '_blank' : '_self'}
    >
      <div
        className={`flex flex-col overflow-hidden w-full h-full transition-transform duration-300 ${
          isLeftItem ? 'border-t border-l border-r border-gray-300' : 'border-t border-r border-b border-gray-300'
        }`}
        style={{
          ...cssStyle,
          backgroundColor: 'var(--background-primary)', // Adjust this if using CSS variables or inline style
          transform: 'scale(1)', // Default scale
        }}
      >
        {article.headlinePicture && (
          <div
            className="w-full aspect-[2/1] border-b border-gray-300"
            style={{
              backgroundImage: `url(${article.headlinePicture.url || ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* If using an image element, replace backgroundImage with the following */}
            {/* <img
              src={article.headlinePicture.url || ''}
              alt={article.headlinePicture?.name || ''}
              className="w-full h-full object-cover"
            /> */}
          </div>
        )}
        <div
          className="flex flex-col transition-all duration-400"
          style={{
            backgroundColor: 'var(--background-primary)', // Adjust this if using CSS variables or inline style
            zIndex: `${1 * Z_INDEX_ABOVE + Z_INDEX_BASE}`,
          }}
        >
          <div
            className={`flex flex-col justify-center p-2 ${
              minified ? 'p-0' : ''
            }`}
          >
            {article.tags?.length > 0 && !minified && (
              <div className="flex items-center border-b border-gray-300">
                {article.tags.map((tag, index) => (
                  <NewsTag text={tag} key={index} />
                ))}
              </div>
            )}
            <div className="flex flex-col gap-2 p-2 border-b border-gray-300">
              {article.pubdate && <DateLabel date={article.pubdate} />}
              <h6 className="text-lg font-semibold">{article.title}</h6>
            </div>
            <div className="p-2">
              {article.summary && !minified && (
                <p className="text-base">{article.summary}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </BlockLink>
  );
};

export default NewsCard;
