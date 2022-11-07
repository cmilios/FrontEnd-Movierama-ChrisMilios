
import { CssBaseline, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState, useRef, useCallback, useRef } from 'react';
import darkScrollbar from '@mui/material/darkScrollbar';
import './App.css';
import GridArea from './components/GridArea';
import NavBar from './components/NavBar';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
      }),
    },
  },
});

function App() {

  
  let isInitialized = useRef(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const handleChange = (val) => {
    setQuery(val);
    console.log(val);
  };
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && isInitialized.current) {
      setPage(prev => prev+1);
    }
    isInitialized.current = true;
  }, []);

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Grid container>
          <Grid item xs={12}>
            <NavBar query={query} handleChange={handleChange}/>
          </Grid>
          <Grid item sx={{mt:8}} xs={12}>
            <GridArea query={query} page = {page} handleObserver={handleObserver} isInitialized={isInitialized}/>
          </Grid>
        </Grid>
      </ThemeProvider>
  );
}

export default App;
