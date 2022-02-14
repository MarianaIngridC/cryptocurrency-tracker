import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: 'white',
      minHeight: '100vh',
    }
  }));

  const classes = useStyles();

  return (
    <>
    <div className={classes.App}>
      <BrowserRouter>
        <Header/>

          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/coins/:id' element={<CoinPage/>}/>
          </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;