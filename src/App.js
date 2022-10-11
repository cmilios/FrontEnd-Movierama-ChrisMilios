
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import GridArea from './components/GridArea';
import NavBar from './components/NavBar';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
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
