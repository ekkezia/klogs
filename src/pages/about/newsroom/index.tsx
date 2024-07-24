import React from 'react';
import NewsroomHero from '../../../components/template/about/newsroom/articles/newsroom-hero.component';
import NewsroomContent from '../../../components/template/about/newsroom/articles/newsroom-content.component';
import CustomHead from '../../../components/organism/custom-head/custom-head.component';
import EndComponent from '../../../components/organism/footer/end.component';

const NewsroomPage: React.FC = () => {
  return (
    <>
      <CustomHead
        title="Newsroom | ParallelChain Lab"
        content="Stay updated with the latest news at ParallelChain Lab. Our Newsroom brings you exciting announcements, insightful articles, and tech industry trends."
        metaKeywords="ParallelChain Announcements, XPLL News, Roadmap, Latest Releases, Latest Development"
        metaTitle="What’s New at ParallelChain Lab"
      />
      <NewsroomHero />
      <NewsroomContent />
      <EndComponent />
    </>
  );
};

export default NewsroomPage;
