import { CssBaseline } from '@material-ui/core';
import SideBar from './components/SideBar';
import Routes from './routes';
import { AppContextProvider } from './context';

const App = (props) => {
  return (
    <AppContextProvider>
      <CssBaseline />

      <SideBar />

      <Routes />
    </AppContextProvider>
  );
};

export default App;
