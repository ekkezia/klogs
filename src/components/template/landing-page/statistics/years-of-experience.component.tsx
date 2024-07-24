/** @jsxImportSource @emotion/react */
import React from 'react';
import StatisticBlock from './statistic-block/statistic-block.component';

const YearsOfExperience: React.FC = () => {
  return (
    <StatisticBlock
      number={100}
      image="years-of-experience.svg"
      alt="Years of Experience"
      plusSign
      suptext="Years"
      subtext="of Experience"
      duration={3}
    />
  );
};

export default YearsOfExperience;
