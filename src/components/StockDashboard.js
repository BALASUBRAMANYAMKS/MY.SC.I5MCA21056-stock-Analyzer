// src/components/StockDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockDashboard = () => {
  const [prices, setPrices] = useState([]);
  const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock is Apple
  const [duration, setDuration] = useState(60); // Default to 60 minutes

  // Fetch stock price data
  useEffect(() => {
    axios.get(`http://20.244.56.144/evaluation-service/stocks/${stockSymbol}?minutes=${duration}`)
      .then(response => setPrices(response.data))
      .catch(error => console.error('Failed to load stock data:', error));
  }, [stockSymbol, duration]);

  // Prepare chart data
  const priceChartData = {
    labels: prices.map(item => new Date(item.lastUpdatedAt).toLocaleTimeString()),  // Formatting time for display
    datasets: [
      {
        label: `${stockSymbol} Stock Price Over Time`,
        data: prices.map(item => item.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div className="stock-dashboard">
      <h2>Stock Price Viewer</h2>
      <div>
        <label>Select Stock: </label>
        <select onChange={(e) => setStockSymbol(e.target.value)} value={stockSymbol}>
          <option value="AAPL">Apple</option>
          <option value="GOOGL">Google</option>
          <option value="Nvda">Nvidia</option>
        </select>
      </div>
      <div>
        <label>Choose Time Frame: </label>
        <select onChange={(e) => setDuration(Number(e.target.value))} value={duration}>
          <option value={30}>30 minutes</option>
          <option value={60}>60 minutes</option>
          <option value={120}>120 minutes</option>
        </select>
      </div>
      <Line data={priceChartData} />
    </div>
  );
};

export default StockDashboard;
