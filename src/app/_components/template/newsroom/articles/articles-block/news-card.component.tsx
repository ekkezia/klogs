import React from 'react';
import { IArticle } from '../../../../../../types/newsroom-interfaces';
import { Box, CardContent, CardMedia, Typography, styled } from '@mui/material';
import { Z_INDEX_ABOVE, Z_INDEX_BASE } from '../../../../_ui/Layout';
import BlockLink from '../../../../atoms/utils/blocklink.component';
import NewsTag from '../../../../atoms/utils/news-tag.component';
import DateLabel from '../../../../atoms/utils/date-label.component';

interface NewsCardProps {
  cssStyle?: any;
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
  const StyledCard = styled(Box)(({ theme }) => ({
    ...cssStyle,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme?.palette?.PCLab?.background?.primary,
    borderWidth: isLeftItem ? '1px 1px 1px 0px' : '1px 0px 1px 1px',
    borderStyle: 'solid',
    borderColor: theme?.palette?.PCLab?.tertiary?.default,
    transition: 'all 300ms',
    '&:hover': {
      transform: 'scale(1.01,1.01)',
      transition: 'all 300ms',
    },
  }));
  const ImageBox = styled(Box)(({ theme }) => ({
    width: '100%',
    aspectRatio: '2 / 1',
    borderBottom: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
  }));
  const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    width: '100%',
    height: '100%',
    verticalAlign: 'middle',
    transition: 'all 400ms ease-in-out',
    zIndex: `${Z_INDEX_BASE}`,
    // borderRadius: '8px 8px 0 0',
  }));
  const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    // height: '100%',
    backgroundColor: theme?.palette?.PCLab?.background?.primary,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 0,
  }));
  const DetailsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 400ms ease-in-out',
    zIndex: `${1 * Z_INDEX_ABOVE + Z_INDEX_BASE}`,
    backgroundColor: theme?.palette?.PCLab?.background?.primary,
  }));
  const TagListBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
  }));
  const TitleBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderBottom: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
  }));
  const SummaryBox = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  }));
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
      <StyledCard>
        {article.headlinePicture && (
          <ImageBox>
            <StyledCardMedia
              image={
                article.headlinePicture.url ? article.headlinePicture.url : ''
              }
              title={article.headlinePicture?.name ?? ''}
            />
          </ImageBox>
        )}
        <DetailsBox>
          <StyledCardContent>
            {article.tags?.length > 0 && !minified ? (
              <TagListBox>
                {article.tags?.map((tag, index) => (
                  <NewsTag text={tag} key={index} />
                ))}
              </TagListBox>
            ) : null}
            <TitleBox>
              {article.pubdate && <DateLabel date={article.pubdate} />}
              <Typography variant="h6">{article.title}</Typography>
            </TitleBox>
            <SummaryBox>
              {article.summary && !minified && (
                <Typography variant="body2">{article.summary}</Typography>
              )}
            </SummaryBox>
          </StyledCardContent>
        </DetailsBox>
      </StyledCard>
    </BlockLink>
  );
};

export default NewsCard;
