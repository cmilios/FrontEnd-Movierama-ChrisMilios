
import { CssBaseline, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
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


  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log(e.target.value);
  };

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Grid container>
          <Grid item xs={12}>
            <NavBar query={query} handleChange={handleChange}/>
          </Grid>
          <Grid item sx={{mt:8}} xs={12}>
            <GridArea query={query}/>
          </Grid>
        </Grid>
      </ThemeProvider>
  );
}

export default App;
