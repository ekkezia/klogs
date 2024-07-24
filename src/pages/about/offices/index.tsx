import React from 'react';
import { OFFICE_DATA } from '../../../components/template/about/offices/officeData';
import Offices from '../../../components/template/about/offices/offices.component';
import CustomHead from '../../../components/organism/custom-head/custom-head.component';

const OfficesPage: React.FC = () => {
  return (
    <>
      <CustomHead title="Offices | ParallelChain Lab" content="Offices" />
      <Offices data={OFFICE_DATA} />
    </>
  );
};

export default OfficesPage;
