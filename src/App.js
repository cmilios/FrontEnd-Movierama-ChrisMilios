
import { CssBaseline } from '@mui/material';
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
        <NavBar/>
        <GridArea/>
      </ThemeProvider>
  );
}

export default App;
