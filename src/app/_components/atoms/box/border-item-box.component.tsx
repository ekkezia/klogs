/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import useBreakpoints from '../../../../hooks/useBreakpoints';

interface INumberOfColumns {
  xs?: number | 1; // 1 by default
  md?: number | 2; // 2 by default
  lg?: number | 3; // 3 by default
}

interface IBorderItemBox {
  stretched?: boolean | false;
  noSpacing?: boolean | false;
  index: number;
  numberOfItems: number;
  numberOfColumns?: INumberOfColumns;
  children: ReactNode;
}

const BorderItemBox: React.FC<IBorderItemBox> = ({
  stretched,
  noSpacing,
  index,
  numberOfItems,
  numberOfColumns,
  children,
}) => {
  const { isLargeScreen, isMediumScreen } = useBreakpoints();

  const getNumOfColumns = () => {
    let numOfColumns = 3;

    if (isMediumScreen)
      numOfColumns = numberOfColumns?.xs ?? 1; // < medium screen
    else if (isLargeScreen)
      numOfColumns = numberOfColumns?.md ?? 2; // < large screen
    else numOfColumns = numberOfColumns?.lg ?? 3; // > large screen

    return numOfColumns;
  };

  // initialize number of columns
  const numOfColumns = getNumOfColumns();

  const getItemPosition = () => {
    let columnPos = '';
    let rowPos = '';

    // COLUMN
    const column = index % numOfColumns;
    // CASE: >= 3 COLUMNS
    if (numOfColumns >= 3) {
      if (column === 0) columnPos = 'left';
      else if (column === numOfColumns - 1) columnPos = 'right';
      else columnPos = 'middle';
    } // CASE < 3 COLUMNS BUT NOT 1 COLUMN (USE SINGLE ROW BOX FOR 1 COLUMN CASE)
    else {
      if (column === 0) columnPos = 'left';
      else if (column === 1) columnPos = 'right';
    }

    // ROW
    // TOP
    if (index < numOfColumns) rowPos = 'top'; // (index < 3: 0, 1, 2 )

    // BOTTOM
    // if numOfColumns is a common divisor of  numberOfItems
    if (numberOfItems % numOfColumns === 0) {
      if (index >= numberOfItems - numOfColumns) rowPos = 'bottom';
    }
    // if numOfColumns is NOT a common divisor of numberOfItems (not able to fill the whole row of columns)
    else {
      if (index >= numberOfItems - (numberOfItems % numOfColumns))
        rowPos = 'bottom';
    }

    return { columnPos, rowPos };
  };

  const getBorder = () => {
    let top = '1px';
    let right = '0px';
    let bottom = '1px';
    let left = '0px';

    // CASE: No Spacing (borders touch each other)
    if (noSpacing) {
      top = '0px';
      left = '0px';
      right =
        getItemPosition().columnPos !== 'right' // is NOT RIGHT item
          ? '1px'
          : '0px';
      bottom = getItemPosition().rowPos !== 'bottom' ? '1px' : '0px'; // is NOT BOTTOM item
    }

    // CASE DEFAULT: With Spacing
    else {
      // Only Single Row
      if (numberOfItems <= numOfColumns) {
        // top and bottom is 0px because it touches layout's border
        top = '0px';
        bottom = '0px';
        // only horizontal axis (left and right) matters
        right =
          getItemPosition().columnPos !== 'right' // is NOT RIGHT item
            ? '1px'
            : '0px';
        left =
          getItemPosition().columnPos !== 'left' // is NOT LEFT item
            ? '1px'
            : '0px';
      }
      // >1 ROW
      else {
        top =
          getItemPosition().rowPos !== 'top' // is NOT BOTTOM item
            ? '1px'
            : '0px';
        right =
          getItemPosition().columnPos !== 'right' // is NOT RIGHT item
            ? '1px'
            : '0px';
        bottom =
          getItemPosition().rowPos !== 'bottom' // is NOT TOP item
            ? '1px'
            : '0px';
        left =
          getItemPosition().columnPos !== 'left' // is NOT LEFT item
            ? '1px'
            : '0px';
      }
    }

    if (isMediumScreen) right = '0px';

    let borderWidth = top + ' ' + right + ' ' + bottom + ' ' + left;

    return borderWidth;
  };

  const theme = useTheme();
  const styles = {
    gridBox: css`
      border-style: solid;
      border-color: ${theme?.palette?.PCLab?.tertiary?.default};
      border-width: ${getBorder()};
      width: 100%;
      height: ${stretched ? '100%' : ''};
      justify-content: ${stretched ? 'space-between' : ''};
      display: ${stretched ? 'flex' : ''};
      flex-direction: column;
    `,
  };

  // default: if border is GRID ITEM
  return <Box css={styles.gridBox}>{children}</Box>;
};

export default BorderItemBox;
