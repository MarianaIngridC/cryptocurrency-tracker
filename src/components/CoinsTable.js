import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';

import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './Banner/Carousel';

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);


  const navigate = useNavigate();
  const { currency, symbol } = CryptoState();

  const fetchCoins = async() => {
    setLoading(true);
    const {data} = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  } 
  console.log(coins);
  console.log('desde coinstable');
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    }
  })

  const handleSearch = () => {
    /* si no hay ningun search el filter va a devolver true por lo tanto en el tablebody van a aparecer todas las coins en un row con todos sus datos */
    return coins.filter((coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    )
  }

  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: '#16171a',
      cursor: 'pointer',
      '&:hover': {
      backgroundColor: '#131111',
      },
      fontFamily: 'Montserrat'
    },
    pagination: {
      '& .MuiPaginationItem-root': {
        color: 'gold',
      }
    }
    
  }))

  const classes = useStyles();

  return <ThemeProvider theme={darkTheme}>
    <Container style={{ textAlign: 'center'}}>
      <Typography
        variant='h4'
        style={{ margin: 18, fontFamily: 'Montserrat'}}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField 
      label='Search for a Crypto Currency..' 
      variant='outlined' 
      style={{marginBottom: 20, width: '100%'}}
      onChange={(e)=> setSearch(e.target.value)}
      />
      <TableContainer>
        {
          loading ? (
            <LinearProgress style={{background: 'gold'}}/>
          ) : (
            <Table >
              <TableHead style={{background: '#EEBCD1'}}>
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map((head)=> (
                    <TableCell
                      style={{
                        color: 'black',
                        fontWeight: '700',
                        fontFamily: 'Montserrat',
                      }}
                      key={head}
                      align={head === 'Coin' ? '' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow> 
              </TableHead>

              <TableBody>
                {handleSearch()
                /*primero limitamos la cantidad de resultados a mostrar antes de recorrerlos y generar su respectivo row y cells*/
                .slice((page-1) *10, (page-1) *10 +10)
                .map((row) => {
                  const profit =
                  row.price_change_percentage_24h > 0;
                  console.log(profit)
                  return (
                    <TableRow
                      onClick={()=> navigate(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                    >
                      {/*FIRST COLUMN*/} 
                      <TableCell component='th' scope='row' style={{display: 'flex', gap: 15}}>
                        <img
                          src={row?.image}
                          alt={row.name}
                          height='50'
                          style={{marginBottom: 10}}
                        />
                        <div
                          styles={{ display: 'flex', flexDirection:'column'}}
                        >
                          <span
                            style={{
                              textTransform:'uppercase',
                              fontSize:22
                            }}
                          >
                            {row.symbol}
                          </span>
                        </div>
                        <span
                          style={{color: 'darkgrey'}}
                        >{row.name}</span>
                      </TableCell>
                      {/*SECOND COLUMN*/}
                      <TableCell align='right'>
                        {symbol} {' '}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>

                      {/*THIRD COLUMN*/}
                      <TableCell
                        align='right'
                        style={{
                          color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                          fontWeight: 500
                        }}
                      >
                        {profit && '+'}
                        {row.price_change_percentage_24h.toFixed(2)}%
                        
                      </TableCell>

                      {/*FOURTH COLUMN*/}
                      <TableCell align='right'>
                        {symbol}{' '}
                        {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                      </TableCell>

                    </TableRow>
                )
              })}</TableBody>
            </Table>
          )
        }
      </TableContainer>
      <Pagination
        style={{
          padding: 20,
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
        classes={{ul: classes.pagination}}
        count={(handleSearch()?.length/10).toFixed(0)}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
          console.log(_)
        }}
      />
    </Container>
  </ThemeProvider>
};

export default CoinsTable;
 