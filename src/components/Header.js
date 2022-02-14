import { AppBar, Container,MenuItem,Select,Toolbar, Typography, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
  title: {
   
      flex: 1,
      color: 'gold',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      cursor: 'pointer'
    
  }

}))

const Header = () => {
  
  const navigate = useNavigate();
  const classes = useStyles();

  const { currency, setCurrency } = CryptoState()

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate('/')} className={classes.title} variant='h5'>Crypto Hunter</Typography>
            <Select
              variant ='outlined'
              style={{
                width: 100,
                height: 40,
                marginRight: 15
            }}
              value={currency}
              onChange={(e)=> setCurrency(e.target.value)}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'ARS'}>ARS</MenuItem>
            </Select>
          </Toolbar>
        </Container>

      </AppBar>
    </ThemeProvider>
  )
};

export default Header;
