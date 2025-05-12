
import React from 'react';
import StockPage from './components/StockDashboard';
import CorrelationHeatmap from './components/CorrelationHeatmap';
import './styles/StockDashboard.css';
import './styles/CorrelationHeatmap.css';

const App = () => {
  return (
    <div className="App">
      <h1>Stock Price</h1>
      <StockPage />
      <CorrelationHeatmap />
    </div>
  );
};

export default App;
