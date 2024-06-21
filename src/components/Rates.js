import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Rates = ({ baseCurrency }) => {
  const [rates, setRates] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        setRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates', error);
      }
    };
    fetchRates();
  }, [baseCurrency]);

  return (
    <div className="App-rates">
    <div className="rates-container">
      <h1>Current Exchange Rates</h1>
      <ul className="rates-list">
        {Object.keys(rates).map((currency) => (
          <li key={currency} className="rate-item">
            1 {baseCurrency} = {rates[currency]} {currency}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Rates;
