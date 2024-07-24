import React from 'react';
import { IArticle } from '../../../../../../types/newsroom-interfaces';
import ContentBox from '../../../../atoms/box/content-box.component';
import BackButton from '../../../../atoms/buttons/back-button.component';
import { Box } from '@mui/material';
import NewsTag from '../../../../atoms/utils/news-tag.component';

interface IArticleHeader {
  article: IArticle;
}
const ArticleHeader: React.FC<IArticleHeader> = ({ article }) => {
  return (
    <ContentBox
      mainContent={
        <Box
          width="100%"
          display="flex"
          flexDirection={{ xs: 'row' }}
          justifyContent="space-between"
        >
          <BackButton variant="secondary" url="/about/newsroom" fitContent />
          {article?.tags?.length > 0 ? (
            <Box display="flex" gap={0.2}>
              {article?.tags?.map((tag, index) => (
                <NewsTag text={tag} key={index} asHeader />
              ))}
            </Box>
          ) : null}
        </Box>
      }
    />
  );
};

export default ArticleHeader;
