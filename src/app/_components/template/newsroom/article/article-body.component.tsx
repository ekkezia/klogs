/** @jsxImportSource @emotion/react */
import ContentBox from '@/app/_components/atoms/box/content-box.component';
import SingleRowBox from '@/app/_components/atoms/box/single-row-box.component';
import { CMS_URL } from '@/env';
import { css } from '@emotion/react';
import { Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import ShareActions from '../share/share-actions.component';
import { IHeadlinePicture } from '@/types/newsroom-types';

interface ArticleBodyProps {
  image: IHeadlinePicture;
  summary: string;
  body: string;
}
const ArticleBody: React.FC<ArticleBodyProps> = ({ image, summary, body }) => {
  const theme = useTheme();

  const styles = {
    title: css`
      & img {
        display: block;
        max-width: 100%;
        margin: 24px 0;
      }
      & strong {
        font-size: 18px;
        font-weight: 700;
        font-family: Barlow;
        color: ${theme?.palette?.PCLab?.primary?.default};
        @media (max-width: 600px) {
          font-size: 16px;
        }
      }
      & h1 {
        color: ${theme?.palette?.PCLab?.primary?.default};
        font-family: Barlow;
        font-size: 48px;
        font-weight: 700;
        line-height: 2;
        padding: ${theme.spacing(2)};
        margin: 0;
        @media (max-width: 600px) {
          font-size: 20px;
        }
      }
      & h2 {
        color: ${theme?.palette?.PCLab?.primary?.default};
        font-family: Barlow;
        font-size: 42px;
        font-weight: 700;
        line-height: 1;
        padding: ${theme.spacing(2)};
        margin: 0;
        @media (max-width: 600px) {
          font-size: 20px;
        }
      }
      & h3 {
        color: ${theme?.palette?.PCLab?.primary?.default};
        font-family: 'Barlow';
        font-size: 36px;
        font-weight: 700;
        line-height: 2;
        margin: 0;
        @media (max-width: 600px) {
          font-size: 20px;
        }
      }
      // SubTitle have border top and bottom
      & h3:has(strong) {
        font-size: 20px;
        padding: ${theme.spacing(2)};
        border-top: 1px solid ${theme?.palette?.PCLab?.tertiary?.default};
        border-bottom: 1px solid ${theme?.palette?.PCLab?.tertiary?.default};
        @media (max-width: 600px) {
          font-size: 16px;
        }
      }
      // padding top for the first h5 element after the SubTitle (h5:has(strong) is SubTitle)
      & h3:first-of-type {
        padding-top: ${theme.spacing(2)};
      }
      & h3:has(strong) + h5 {
        padding-top: ${theme.spacing(2)};
      }
      // padding bottom for the last text element (usually h5) before the news recommendation component
      & h3:last-child {
        padding-bottom: ${theme.spacing(2)};
      }
      & h4 {
        color: ${theme?.palette?.PCLab?.primary?.default};
        font-family: 'Barlow';
        font-size: 30px;
        font-weight: 700;
        line-height: 2;
        margin: 0;
        @media (max-width: 600px) {
          font-size: 20px;
        }
      }
      & h5 {
        font-family: 'Barlow';
        font-size: 16px;
        font-weight: 400;
        tex-transform: none;
        line-height: 2;
        text-align: justify;
        color: ${theme?.palette?.PCLab?.text?.primary};
        padding: 0 ${theme.spacing(2)};
        margin: 0;
        @media (max-width: 600px) {
          font-size: 14px;
        }
      }
      // SubTitle have border top and bottom
      & h5:has(strong) {
        font-size: 20px;
        padding: ${theme.spacing(2)};
        border-top: 1px solid ${theme?.palette?.PCLab?.tertiary?.default};
        border-bottom: 1px solid ${theme?.palette?.PCLab?.tertiary?.default};
        @media (max-width: 600px) {
          font-size: 16px;
        }
      }
      // padding top for the first h5 element after the SubTitle (h5:has(strong) is SubTitle)
      & h5:first-of-type {
        padding-top: ${theme.spacing(2)};
      }
      & h5:has(strong) + h5 {
        padding-top: ${theme.spacing(2)};
      }
      // padding bottom for the last text element (usually h5) before the news recommendation component
      & h5:last-child {
        padding-bottom: ${theme.spacing(2)};
      }
      & a {
        font-size: 18px;
        color: ${theme?.palette?.PCLab?.primary?.lighter};
        line-height: 2;
        font-weight: 400;
        font-family: Barlow;
        text-decoration: underline;
        @media (max-width: 600px) {
          font-size: 16px;
        }
      }
      & p {
        color: ${theme?.palette?.PCLab?.text?.primary};
        font-size: 18px;
        font-weight: 400;
        line-height: 2;
        font-family: 'Barlow';
        padding: 0 ${theme.spacing(2)};
        @media (max-width: 600px) {
          font-size: 16px;
        }
      }
      & br {
        width: 100%;
        display: block;
        content: '';
        // border-bottom: 2px solid ${theme.palette.PCLab?.tertiary
          ?.default}; /* Customize the color and style here */
        margin: 0; /* Adjust the margin as needed */
      }
      & hr {
        color: ${theme.palette.PCLab?.tertiary?.default};
      }
    `,
  };

  return (
    <ContentBox
      verticalContent={
        <VerticalBox noRotation>
          <ShareActions />
        </VerticalBox>
      }
      mainContent={
        <>
          <Image
            priority
            src={`${CMS_URL}${image.url}`}
            width={1000}
            height={500}
            alt={image.url}
          />
          {/* Summary */}
          <SingleRowBox padded>
            <Typography
              variant="body2"
              lineHeight={2}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(summary),
              }}
            />
          </SingleRowBox>
          {/* Content */}
          <div
            css={styles.title}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(body),
            }}
          />
        </>
      }
    />
  );
};

export default ArticleBody;
