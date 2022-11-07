import * as React from 'react';
import { useState, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(${theme.spacing(2)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

export default function SearchAppBar(props) {


  const {query, handleChange} = props
  let [val, setVal] = useState("")
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const submit = () =>{
    handleChange(val)
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={scrollToTop}>
            <HomeIcon></HomeIcon>
        </IconButton>
          
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, mx: '5px',  display: { xs: 'none', sm: 'block' } }}>
            MovieRama
          </Typography>
          <Search>
            {/* <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper> */}
            <StyledInputBase value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={e=> e.keyCode===13? submit():null}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
            <Button variant='contained' sx={{mx: 1}} onClick={submit} startIcon={<SearchIcon></SearchIcon>}>search</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
