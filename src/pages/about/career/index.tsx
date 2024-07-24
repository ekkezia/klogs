import React, { useEffect, useState } from 'react';
import ContentBox from '../../../components/atoms/box/content-box.component';
import VerticalBox from '../../../components/atoms/box/vertical-box.component';
import { CMS_URL } from '../../../api-service/api-url';
import { GetStaticProps } from 'next';
import { Opening } from '../../../api-service/career';
import CareerHero from '../../../components/template/about/career/career-hero.component';
import CareerGrids from '../../../components/template/about/career/career-grids.component';
import CustomHead from '../../../components/organism/custom-head/custom-head.component';
import CustomTabs from '../../../components/molecule/tabs/custom-tabs.component';
import { getQueryParam, updateQueryParam } from '../../../hooks/useQueryParams';
import { useRouter } from 'next/navigation';

export interface ICareerPageProps {
  openings: Opening[];
}

const LABELS = {
  all: 'All',
  engineering: 'Engineering',
  sales_and_marketing: 'Sales & Marketing',
  // product_planning_and_strategy: 'Product Planning & Strategy',
};

const CareerPage: React.FC<ICareerPageProps> = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [openings, setOpenings] = useState<Opening[] | null>(null);
  const router = useRouter();

  // TODO: temporary solution using client fetch to fix Error on Client Side
  const fetchData = async () => {
    const response = await fetch(`${CMS_URL}/openings?_sort=priority:DESC`);
    const openings: Opening[] = await response.json();
    setOpenings(openings);
  };

  useEffect(() => {
    fetchData();
    const tag = getQueryParam(router, 'tag');
    setActiveTab(tag ?? 'all');
  }, [router]);

  const handleChangeTab = (selectedTab: string) => {
    setActiveTab(selectedTab);
    // replace query with the selected tab key
    updateQueryParam(router, 'tag', selectedTab);
  };

  return (
    <>
      <CustomHead
        title="Career | ParallelChain Lab"
        content="Is the world too slow for you? Join the team at ParallelChain Lab – we’re shaping the future now. View our current job vacancies."
        metaKeywords="Blockchain jobs, Crypto jobs, Web3 jobs, software engineer, smart contract developers, data scientist, ai engineer, Singapore jobs, marketing, business development"
        metaTitle="ParallelChain Lab Careers"
      />

      <ContentBox
        verticalContent={
          <VerticalBox stretched>
            <CustomTabs
              tabs={Object.keys(LABELS).slice(0).reverse()}
              activeTab={activeTab}
              setActiveTab={handleChangeTab}
              labels={LABELS}
            />
          </VerticalBox>
        }
        mainContent={
          <>
            <CustomHead title="Career | ParallelChain Lab" content="Career" />
            <CareerHero />
            <CareerGrids openings={openings} activeTab={activeTab} />
          </>
        }
      />
    </>
  );
};

export default CareerPage;

// export const getStaticProps: GetStaticProps = async () => {
//   const response = await fetch(`${CMS_URL}/openings?_sort=priority:DESC`);
//   const openings: Opening[] = await response.json();
//   // openings.forEach((opening: Opening) => {
//   //   opening.url = `${API_URL}/${opening.url}`;
//   //   opening.title = opening.title;
//   //   opening.description = opening.description;
//   // });

//   return {
//     props: {
//       openings,
//     },
//     revalidate: 30,
//   };
// };
