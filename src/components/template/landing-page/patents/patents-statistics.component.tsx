/** @jsxImportSource @emotion/react */
import React from 'react';
// import { PATENTS_DATA } from './patentsData';
import StatisticBlock from '../statistics/statistic-block/statistic-block.component';
import { ANIMATION_DURATION } from '../landing-page-hero.component';

const PATENTS = {
  us: 8,
  uk: 2,
  eu: 2,
};

const TOTAL_PATENTS = Object.values(PATENTS).reduce((a, b) => a + b, 0);

const PatentsStatistics: React.FC = () => {
  return (
    <StatisticBlock
      number={TOTAL_PATENTS}
      image="blockchain-patents.svg"
      alt="Blockchain Patents"
      suptext="Blockchain"
      subtext="Patents"
      duration={ANIMATION_DURATION}
    />
  );
};

export default PatentsStatistics;
