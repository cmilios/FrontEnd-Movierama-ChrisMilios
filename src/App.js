
import { CssBaseline, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Grid container>
          <Grid item xs={12}>
            <NavBar/>
          </Grid>
          <Grid item sx={{mt:8}} xs={12}>
            <GridArea/>
          </Grid>
        </Grid>
      </ThemeProvider>
  );
}

export default App;
