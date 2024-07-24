import React, { useEffect, useState } from 'react';
import ContentBox from '../../../components/atoms/box/content-box.component';
import { CMS_URL } from '../../../api-service/api-url';
import { useRouter } from 'next/navigation';
import Showdown from 'showdown';
// import { GetStaticPaths, GetStaticProps } from 'next';
import { Opening } from '../../../api-service/career';
import CareerOpeningHero from '../../../components/template/about/career/career-opening/career-opening-hero.component';
import CareerOpeningBody from '../../../components/template/about/career/career-opening/career-opening-body.component';
import CustomHead from '../../../components/organism/custom-head/custom-head.component';
import Loading from '../../../components/atoms/loading/loading.component';
import StickyHeader from '../../../components/organism/sticky-header/sticky-header.component';
import { Box } from '@mui/material';

// interface ICareerOpeningPageProps {
//   opening: Opening;
// }

export const CAREER_OPENING_HEADER_HEIGHT = '90px';

const CareerOpeningPage: React.FC = () => {
  const converter = new Showdown.Converter();

  const router = useRouter();
  const handleCloseCareerOpening = () => {
    router.replace('/about/career', undefined, {
      shallow: true,
    });
  };

  const [opening, setOpening] = useState<Opening | null>();
  const openingId = router.query.careerOpeningURL;

  // TODO: switching to client fetch is a temporary solution, similar bug as [articleId].tsx
  useEffect(() => {
    fetch(`${CMS_URL}/openings?url=${openingId}&_limit=1`)
      .then((res) => res.json())
      .then((data) => setOpening(data[0]));
  }, [openingId]);

  if (!opening) return <Loading />;
  return (
    <Box>
      <CustomHead
        title={`${opening.title} | Career`}
        content="Is the world too slow for you?
      Join the team at ParallelChain Lab – we’re shaping the future now. View
      our current job vacancies."
        metaKeywords={`${opening.title}, Blockchain jobs, Crypto jobs,
      Web3 jobs, software engineer, smart contract developers, data scientist,
      ai engineer, Singapore jobs, marketing, business development`}
        metaTitle={`${opening.title} | Career`}
      />
      <StickyHeader
        height={{
          xs: CAREER_OPENING_HEADER_HEIGHT,
          md: CAREER_OPENING_HEADER_HEIGHT,
        }}
        onCloseModal={handleCloseCareerOpening}
      >
        <CareerOpeningHero title={opening.title} category={opening.category} />
      </StickyHeader>
      <ContentBox
        noBorderBottom
        mainContent={
          <CareerOpeningBody
            description={converter.makeHtml(opening.description) ?? ''}
          />
        }
      />
    </Box>
  );
};

export default CareerOpeningPage;

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await fetch(`${CMS_URL}/openings`);
//   const openings = JSON.parse(JSON.stringify(await response.json()));

//   const paths = openings.map((opening: Opening) => ({
//     params: {
//       careerOpeningURL: opening.url,
//     },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const converter = new Showdown.Converter();
//   const response = await fetch(
//     `${CMS_URL}/openings?url=${params?.careerOpeningURL}`,
//   );
//   const opening: Opening = (await response.json())[0];

//   if (!opening) {
//     return {
//       props: {
//         opening: null,
//       },
//     };
//   }

//   opening.description = converter.makeHtml(opening.description);
//   return {
//     props: {
//       opening,
//     },
//   };
// };
