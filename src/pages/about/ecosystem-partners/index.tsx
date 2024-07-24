import React from 'react';
import CustomHead from '../../../components/organism/custom-head/custom-head.component';
// import EcosystemPartnersHero from '../../../components/about/ecosystem-partners/ecosystem-partners-hero.component';
import EcosystemPartnersGrids from '../../../components/template/about/ecosystem-partners/ecosystem-partners-grids.component';
import { ECOSYSTEM_PARTNERS_DATA } from '../../../components/template/about/ecosystem-partners/ecosystemPartnersData';

const EcosystemPartnersPage: React.FC = () => {
  return (
    <>
      <CustomHead
        title="Ecosystem Partners | ParallelChain Lab"
        content="Deliver the most innovative and unique solutions to your clients. Partner with ParallelChain Lab to bring industry-leading blockchain and AI technologies to businesses across all sectors."
        metaTitle="ParallelChain Lab Partners"
        metaKeywords="Global Partners, ParallelChain Partners, Ecosystem, Reseller, Channel, Consulting, Partner Network, Systems integrator, IBM, Cloud, SaaS"
      />
      {/* <EcosystemPartnersHero /> */}
      <EcosystemPartnersGrids data={ECOSYSTEM_PARTNERS_DATA} />
    </>
  );
};

export default EcosystemPartnersPage;
