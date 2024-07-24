/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, useTheme } from '@mui/material';
import CustomFilters from '../../../molecule/filter/custom-filters.component';
import { ISSUER, STATUS } from './patentsData';
import SingleRowBox from '../../../atoms/box/single-row-box.component';
import { IFunction } from '../../../../../types/shared';

interface IPatentsFiltersProps {
  activeFilters: string[];
  onChangeFilter: IFunction;
}

const LABELS = { ...STATUS, ...ISSUER };

const PatentsFilters: React.FC<IPatentsFiltersProps> = ({
  activeFilters,
  onChangeFilter,
}) => {
  const theme = useTheme();

  return (
    <Box>
      <SingleRowBox>
        {/* <Typography variant="h7">Status</Typography> */}
        <CustomFilters
          filters={Object.keys(STATUS)}
          activeFilters={activeFilters}
          setActiveFilters={onChangeFilter}
          labels={LABELS}
          fitContent
        />
      </SingleRowBox>
      {/* <Box>
        <CustomFilters
          filters={Object.keys(ISSUER)}
          activeFilters={activeFilters}
          setActiveFilters={onChangeFilter}
          labels={LABELS}
          fitContent
        />
      </Box> */}
    </Box>
  );
};

export default PatentsFilters;
