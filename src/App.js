import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import OnlineShop from "./pages/OnlineShop"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product" element={<ProductPage />} />
        <Route exact path="/OnlineShop" element={<OnlineShop />} />
      </Routes>
    </Router>
  );
}

export default App;
