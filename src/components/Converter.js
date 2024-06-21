import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import "../App.css"

const Converter = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [flipping, setFlipping] = useState(false);
    const [direction, setDirection] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState(getRandomPastelColor());
  
    const handleConvert = async () => {
      const [amount, from, , to] = input.split(' ');
      try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from.toUpperCase()}`);
        const rate = response.data.rates[to.toUpperCase()];
        if (rate) {
          setResult(`${amount} ${from.toUpperCase()} = ${(amount * rate).toFixed(2)} ${to.toUpperCase()}`);
        } else {
          setResult('Invalid currency');
        }
        setDirection((prev) => 1);
        setFlipping(true);
        setBackgroundColor(getRandomPastelColor());
      } catch (error) {
        setResult('Вы не ввели валюты для конвертации, пример : 15 usd in rub');
        setFlipping(true);
        setBackgroundColor(getRandomPastelColor());
      }
    };
  
    const { transform } = useSpring({
      transform: `rotateY(${flipping ? direction * 88 : 0}deg)`,
      config: { tension: 1000, friction: 50 },
      onRest: () => setFlipping(false),
    });
  
    return (
      <div className="App">
        <h1>Currency Converter</h1>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="15 usd in rub" />
        <button style={{marginTop:"20px"}} onClick={handleConvert}>Convert</button>
        <div className="calendar-container">
          <animated.div
            className="calendar-page"
            style={{ backgroundColor, transform}}
          >
            {result && <p>{result}</p>}
          </animated.div>
        </div>
      </div>
    );
  };
  
  const getRandomPastelColor = () => {
    const pastelColors = [
      '#FFD1DC', '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BFFCC6', '#BAE1FF', '#A3E4D7', '#F9E79F', '#D2B4DE'
    ];
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  };
  
  export default Converter;
