import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Converter from "./components/Converter";
import Rates from "./components/Rates";

const App = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");

  return (
    <Router>
      <div>
        <div className="btns">
          <div className="li-btn">
            <Link to="/">Converter</Link>
          </div>
          <div className="li-btn">
            <Link to="/rates">Rates</Link>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Converter />} />
          <Route
            path="/rates"
            element={<Rates baseCurrency={baseCurrency} />}
          />
        </Routes>
        <div className="baseCurrency">
          <label>
            Base Currency:
          </label>
          <input
              type="text"
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value.toUpperCase())}
            />
        </div>
      </div>
    </Router>
  );
};

export default App;