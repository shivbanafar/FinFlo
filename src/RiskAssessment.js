const RiskAssessment = () => {
  return ( 
    <div>
      <h2>Enter Content</h2>
    </div>
  );
}
 
export default RiskAssessment;







// import React, { useState, useEffect } from 'react';
// import { Chart } from 'chart.js';

// const RiskAssessment = () => {
//   const fetchPredictions = async (ticker) => {
//     try {
//       const response = await fetch(`https://<your-function-app>.azurewebsites.net/api/your-function-name?ticker=${ticker}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error("Failed to fetch predictions:", error);
//       return null;
//     }
//   };
  

//   const createChart = (ticker, dates, predictions) => {
//     const ctx = document.createElement('canvas');
//     ctx.style.width = '100%';
//     ctx.style.height = '400px';
//     document.getElementById('charts').appendChild(ctx);

//     new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: dates,
//         datasets: [{
//           label: `${ticker} Predicted Prices`,
//           data: predictions,
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//           fill: false,
//         }],
//       },
//       options: {
//         scales: {
//           x: {
//             type: 'time',
//             time: {
//               unit: 'day',
//             },
//           },
//           y: {
//             beginAtZero: false,
//           },
//         },
//       },
//     });
//   };

//   const refreshData = async () => {
//     const tickers = ['AAPL', 'MSFT', 'GOOGL']; // Example tickers
//     document.getElementById('charts').innerHTML = ''; // Clear existing charts

//     for (const ticker of tickers) {
//       const data = await fetchPredictions(ticker);
//       createChart(ticker, data.dates, data.predictions);
//     }
//   };

//   useEffect(() => {
//     refreshData();
//   }, []); // Only run once, on component mount

//   return (
//     <div>
//       <h1>Real-Time Stock Predictions</h1>
//       <button onClick={refreshData}>Refresh Data</button>
//       <div id="charts"></div>
//     </div>
//   );
// };

// export default RiskAssessment;
