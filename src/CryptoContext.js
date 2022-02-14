import React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';

const Crypto = createContext();

const CryptoContext = ({children}) => {
  const [ currency, setCurrency ] = useState('USD')
  const [symbol, setSymbol] = useState('US$')

  useEffect(() => {
    if(currency === 'USD') setSymbol('US$');
    else if (currency === 'ARS') setSymbol('$')
  }, [currency]);

  return (
    <Crypto.Provider value={{currency, symbol,setCurrency}}>
      {children}
    </Crypto.Provider>
    )
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);

}