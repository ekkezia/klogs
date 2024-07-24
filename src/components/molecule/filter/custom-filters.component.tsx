/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

import CustomFilter from './custom-filter.component';
import { useTheme } from '@mui/material';

type IFunction = (...args: any[]) => any;
export interface ILabel {
  [key: string]: string;
}

interface ICustomFilters {
  filters: string[];
  labels: ILabel;
  fitContent?: boolean;
  activeFilters: string[];
  setActiveFilters: IFunction;
}

// when you first declare CustomFilters component, the param filters will be filled with default filters
const CustomFilters: React.FC<ICustomFilters> = ({
  filters,
  labels,
  fitContent,
  activeFilters,
  setActiveFilters,
}) => {
  const theme = useTheme();
  const styles = {
    container: css`
      display: flex;
      align-items: center;
      width: ${fitContent ? 'fit-content' : '100%'};
      height: ${fitContent ? 'fit-content' : '100%'};
      flex-wrap: wrap;
      gap: ${theme.spacing(0.5)};
      padding: ${theme.spacing(0.5)};
    `,
  };
  // const [activeFilters, setActiveFilters] = useState(['ALL']); // set filter default to include the tag 'ALL'

  const handleClickFilter = (filter: string) => {
    let newFilters = activeFilters.slice();

    // Default: user can either select just 1 FILTER:'ALL' OR MULTIPLE FILTERS at once as long as it is not 'ALL'
    if (activeFilters.includes(filter) && filter !== 'ALL') {
      newFilters = newFilters.filter((f) => f !== filter);
    } else if (filter === 'ALL' || newFilters.includes('ALL')) {
      newFilters = [filter];
    } else {
      newFilters.push(filter);
    }

    if (newFilters.length === 0) newFilters = ['ALL'];
    setActiveFilters(newFilters);
  };

  return (
    <div css={styles.container}>
      {filters.map((filter, index) => (
        <CustomFilter
          key={index}
          filterName={filter}
          label={labels[filter]}
          onClick={handleClickFilter}
          active={activeFilters.includes(filter)}
          fitContent={fitContent}
        />
      ))}
    </div>
  );
};

export default CustomFilters;
