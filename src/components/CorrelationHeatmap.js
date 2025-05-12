// src/components/CorrelationHeatmap.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeatMap from 'react-heatmap-grid';


const CorrelationHeatmap = () => {
  const [correlationData, setCorrelationData] = useState([]);
  const [timeFrame, setTimeFrame] = useState(60); 
  const [stockSymbols, setStockSymbols] = useState([]);

  // Fetch stocks and correlation data
  useEffect(() => {
    axios.get(`http://20.244.56.144/evaluation-service/stocks?minutes=${timeFrame}`)
      .then(response => {
        setStockSymbols(Object.keys(response.data));  
        const dataMatrix = Object.values(response.data).map(stock => stock.map(value => value.correlation)); 
        setCorrelationData(dataMatrix);
      })
      .catch(error => console.error('Error fetching correlation data:', error));
  }, [timeFrame]);

  return (
    <div className="correlation-heatmap">
      <h2>Correlation Heatmap</h2>
      <div>
        <label>Select Time Frame: </label>
        <select onChange={(e) => setTimeFrame(Number(e.target.value))} value={timeFrame}>
          <option value={30}>30 minutes</option>
          <option value={60}>60 minutes</option>
          <option value={120}>120 minutes</option>
        </select>
      </div>
      <HeatMap
        xLabels={stockSymbols}
        yLabels={stockSymbols}
        data={correlationData}
        width={500}  
        height={500}
      />
    </div>
  );
};

export default CorrelationHeatmap;
