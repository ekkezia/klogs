import { Pagination, PaginationItem, Skeleton } from '@material-ui/lab';
import { Box, styled } from '@mui/material';
import React from 'react';

type IFunction = (...args: any[]) => any;

interface NewsPaginationProps {
  page: number;
  onPageChange: IFunction;
  pagesCount: number;
  loading: boolean;
}
const NewsPagination: React.FC<NewsPaginationProps> = ({
  page,
  onPageChange,
  pagesCount,
  loading,
}) => {
  if (!pagesCount) return null;

  const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    borderTop: `1px solid ${theme.palette?.PCLab?.tertiary?.default}`,
    [theme.breakpoints.down('sm')]: {
      margin: '48px 0',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '32px 0',
    },
  }));
  const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
    fontSize: 18,
    lineHeight: 1.2,
    fontWeight: '700',
    margin: '0 !important',
    padding: '0 !important',
    fontFamily: 'Space Mono',
    borderRadius: `0 !important`,
    color: `${theme.palette.PCLab?.neutral?.grey} !important`,
    transition: 'all 300ms ease-in-out',
    '&.Mui-selected, &:hover, &.Mui-selected:hover': {
      color: `${theme.palette.PCLab?.background?.primary} !important`,
      backgroundColor: `${theme.palette.PCLab?.primary?.default} !important`,
      borderRadius: 0,
    },
    '&.Mui-disabled': {
      color: theme.palette.PCLab?.neutral?.grey,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  }));

  const StyledPaginationWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center', // Align right
    alignItems: 'center',
    flex: '1', // Allow the pagination to take up remaining space
  }));

  const StyledPagination = styled(Pagination)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&	.MuiPagination-root': {
      width: '100%',
    },
    // '&	.MuiPagination-ul': {
    //   width: '100%',
    //   display: 'flex',
    //   justifyContent: 'center',
    // },
    // '& .MuiPagination-ul li': {
    //   height: 'fit-content',
    // },
  }));
  return (
    <StyledBox>
      {loading ? (
        <Skeleton>
          <StyledPaginationWrapper>
            <StyledPagination
              page={page}
              onChange={onPageChange}
              count={pagesCount}
              boundaryCount={1}
              siblingCount={1}
              renderItem={(item) => {
                return <StyledPaginationItem {...item} />;
              }}
            />
          </StyledPaginationWrapper>
        </Skeleton>
      ) : (
        <StyledPaginationWrapper>
          <StyledPagination
            page={page}
            onChange={onPageChange}
            count={pagesCount}
            boundaryCount={1}
            siblingCount={1}
            renderItem={(item) => {
              return <StyledPaginationItem {...item} />;
            }}
          />
        </StyledPaginationWrapper>
      )}
    </StyledBox>
  );
};

export default NewsPagination;
