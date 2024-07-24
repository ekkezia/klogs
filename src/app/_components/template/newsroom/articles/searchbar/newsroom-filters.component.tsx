// @ts-nocheck
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import CustomFilters from '../../../../molecule/filter/custom-filters.component';

type IFunction = (...args: any[]) => any;

const FILTERS = {
  ALL: 'ALL',
  Dev: 'Dev',
  Business: 'Business',
  Feature: 'Feature',
  Community: 'Community',
  Blog: 'Blog',
  Event: 'Event',
};

interface INewsroomFiltersProps {
  activeFilters: [];
  setActiveFilters: IFunction;
  handleFiltersChange: IFunction;
}
const NewsroomFilters: React.FC<INewsroomFiltersProps> = ({
  activeFilters,
  setActiveFilters,
  handleFiltersChange,
}) => {
  const theme = useTheme();
  const styles = {
    newsFiltersContainer: css`
      height: fit-content;
      width: 100%;
      padding: ${theme.spacing(1.5)};
    `,
  };

  useEffect(() => {
    if (activeFilters.length === 0) return;
    handleFiltersChange(activeFilters);
  }, [activeFilters]);

  return (
    <Box classes={styles.newsFiltersContainer}>
      <CustomFilters
        filters={Object.keys(FILTERS)}
        activeFilters={activeFilters}
        labels={FILTERS}
        setActiveFilters={setActiveFilters}
        fitContent
      />
    </Box>
  );
};

export default NewsroomFilters;
