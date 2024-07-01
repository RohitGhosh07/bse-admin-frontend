import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import MarketScreen from './screens/Market_screen';
import OrdersScreen from './screens/Orders_screen';
import SideMenu from './components/SideMenu'; // Adjust the import path as needed

function App() {
  return (
    <Router>
      <div className="flex">
        {/* <SideMenu /> */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<OrdersScreen />} />
            <Route path="/market" element={<MarketScreen />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
