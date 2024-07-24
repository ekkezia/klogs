/** @jsxImportSource @emotion/react */
import React from 'react';
import StatisticBlock from './statistic-block/statistic-block.component';

const FulltimeStatistics: React.FC = () => {
  return (
    <StatisticBlock
      number={40}
      image="fulltime-onsite.svg"
      alt="Full-Time Onsite Innovators"
      plusSign
      suptext="Full-Time"
      subtext="Onsite Innovators"
      duration={4}
    />
  );
};

export default FulltimeStatistics;
