/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputBase,
  Paper,
  Typography,
  useTheme,
  styled,
} from '@mui/material';
import { Search } from '@mui/icons-material';

type IFunction = (...args: any[]) => any;

interface SearchBarProps {
  search: string;
  setSearch: IFunction;
  handleSearch: IFunction;
  loading: boolean;
}
const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  handleSearch,
  loading,
}) => {
  const [focus, setFocus] = useState(false);
  const theme = useTheme();

  const StyledPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    height: '100%',
    fontWeight: '400',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme?.palette?.PCLab?.text?.primary,
    borderRadius: 0,
    boxShadow: 'none',
    borderTop: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
    borderBottom: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
    // '&:hover': {
    //   // border: `1px solid ${theme?.palette?.PCLab?.primary?.default}`,
    // },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: '100%',
    fontFamily: 'Barlow',
    fontSize: 16,
    fontWeight: 400,
    // color: ({ error }) => (error ? '#FF0000' : '#1b1b1b'),
  }));

  const [myState, setMyState] = useState('');

  // not sure why but when changing of state, styled() would affect how it works and cause a glitch
  // thus using sx directly to change state
  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        width: '100%',
        height: '100%',
        fontWeight: '400',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: theme?.palette?.PCLab?.text?.primary,
        borderRadius: 0,
        boxShadow: 'none',
        borderWidth: '1px 0px 1px 0px',
        borderStyle: 'solid',
        borderColor: theme.palette.PCLab?.tertiary?.default,
        background: theme.palette.PCLab?.background?.primary,
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      }}
    >
      <InputBase
        sx={{
          width: '100%',
          fontFamily: 'Barlow !important',
          fontSize: 16,
          fontWight: 400,
          border: 'none',
          padding: 0,
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search News..."
        autoComplete="false"
      />
      <IconButton type="submit" aria-label="search">
        {loading ? <CircularProgress color="success" /> : <Search />}
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
