import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { withRouter } from 'react-router-dom';
import { FaTachometerAlt, FaChartLine, FaFileInvoiceDollar, FaShieldAlt, FaHeadset, FaCog, FaSignOutAlt } from 'react-icons/fa';
import logo from './logo.png';
import axios from 'axios';
import Flag from 'react-world-flags';

// Mapping of currency codes to their symbols
const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹'
};

// Mapping of currency codes to country codes for flags
const currencyFlags = {
  USD: 'US',
  EUR: 'EU',
  GBP: 'GB',
  INR: 'IN'
};

const Dashboard = ({ history }) => {
  const [currencyData, setCurrencyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard'); // Local state for currentPage

  const handleNavigation = (page) => {
    setCurrentPage(page);
    history.push(page);
    window.location.href = page; // Force page reload
  };

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get('https://v6.exchangerate-api.com/v6/57fef4fc0b33c10c48dce2d7/latest/USD');
        const data = response.data.conversion_rates;
        const topCurrencies = ['USD', 'EUR', 'GBP', 'INR'];
        const filteredData = Object.entries(data)
          .filter(([currency]) => topCurrencies.includes(currency))
          .sort((a, b) => topCurrencies.indexOf(a[0]) - topCurrencies.indexOf(b[0]));
        setCurrencyData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching currency data:', error);
        setLoading(false);
      }
    };

    fetchCurrencyData();
  }, []);

  return (
    <div className="container">
      <div className="sidebar">
        <div className={`logo ${currentPage === 'dashboard' ? 'active' : ''}`}>
          <img src={logo} alt="FinFlo Logo" />
          <h1>FinFlo</h1>
        </div>
        <div className={`sidebar-item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavigation('/home')}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </div>
        <div className={`sidebar-item ${currentPage === 'investment' ? 'active' : ''}`} onClick={() => handleNavigation('/investment')}>
          <FaChartLine />
          <span>Investment Advisory</span>
        </div>
        <div className={`sidebar-item ${currentPage === 'planning' ? 'active' : ''}`} onClick={() => handleNavigation('/planning')}>
          <FaFileInvoiceDollar />
          <span>Financial Planning</span>
        </div>
        <div className={`sidebar-item ${currentPage === 'risk' ? 'active' : ''}`} onClick={() => handleNavigation('/risk')}>
          <FaShieldAlt />
          <span>Risk Assessment</span>
        </div>
        <div className={`sidebar-item ${currentPage === 'support' ? 'active' : ''}`} onClick={() => handleNavigation('/support')}>
          <FaHeadset />
          <span>Customer Support</span>
        </div>
        <div className={`sidebar-item ${currentPage === 'settings' ? 'active' : ''}`} onClick={() => handleNavigation('/settings')}>
          <FaCog />
          <span>Settings</span>
        </div>
        <div className={`sidebar-item ${currentPage === 'signout' ? 'active' : ''}`} onClick={() => handleNavigation('/signout')}>
          <FaSignOutAlt />
          <span>Sign Out</span>
        </div>
      </div>
      <div className="header">
        <div>User Info</div>
      </div>
      <div className="main-content">
        <h2>Hello Mahak!</h2>
        <div className="flex-container">
          <div className="card card-balance">Balance: INR 2,00,000</div>
          <div className="card card-income">Income: INR 80,000</div>
          <div className="card card-spending">Spending: INR 7,500</div>
          <div className="card card-stocks">Stocks Invested: 8</div>
        </div>
        <div className="card balance-overview">
          <h3>Balance Overview</h3>
          {/* Add chart here */}
        </div>
        <div className="flex-container">
          <div className="card stock-earning">
            <h3>Stock Earning</h3>
            <p>INR 10500.27</p>
            <p>INR 8204.67</p>
          </div>
          <div className="card quick-transfer">
            <h3>Quick Transfer</h3>
            {/* Add quick transfer content here */}
          </div>
        </div>
        <div className="card invoices">
          <h3>Invoices</h3>
          {/* Add invoices table here */}
        </div>
        <div className="card currencies-market">
          <h3>Currencies Market</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="currencies-container">
              {currencyData.map(([currency, value]) => (
                <div className="currency-box" key={currency}>
                  <div className="flag-wrapper">
                    <Flag code={currencyFlags[currency]} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  </div>
                  <div className="currency-info">
                    <div className="currency-symbol">{currencySymbols[currency] || currency}</div>
                    <div className="currency-value">{value.toFixed(4)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);


// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import { FaTachometerAlt, FaChartLine, FaFileInvoiceDollar, FaShieldAlt, FaHeadset, FaCog, FaSignOutAlt } from 'react-icons/fa';
// import logo from './logo.png';
// import axios from 'axios';
// import Flag from 'react-world-flags';

// // Mapping of currency codes to their symbols
// const currencySymbols = {
//   USD: '$',
//   EUR: '€',
//   GBP: '£',
//   INR: '₹'
// };

// // Mapping of currency codes to country codes for flags
// const currencyFlags = {
//   USD: 'US',
//   EUR: 'EU',
//   GBP: 'GB',
//   INR: 'IN'
// };

// const Dashboard = ({ currentPage, setCurrentPage }) => {
//   const [currencyData, setCurrencyData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const handleNavigation = (page) => {
//     setCurrentPage(page);
//     // Additional logic for navigation if needed
//   };

//   useEffect(() => {
//     const fetchCurrencyData = async () => {
//       try {
//         const response = await axios.get('https://v6.exchangerate-api.com/v6/57fef4fc0b33c10c48dce2d7/latest/USD');
//         const data = response.data.conversion_rates;
//         const topCurrencies = ['USD', 'EUR', 'GBP', 'INR']; // Adjust top currencies as needed
//         const filteredData = Object.entries(data)
//           .filter(([currency]) => topCurrencies.includes(currency))
//           .sort((a, b) => topCurrencies.indexOf(a[0]) - topCurrencies.indexOf(b[0])); // Keep order as in topCurrencies
//         setCurrencyData(filteredData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching currency data:', error);
//         setLoading(false);
//       }
//     };

//     fetchCurrencyData();
//   }, []);

//   return (
//     <div className="container">
//       <div className="sidebar">
//         <div className={`logo ${currentPage === 'dashboard' ? 'active' : ''}`}>
//           <img src={logo} alt="FinFlo Logo" />
//           <h1>FinFlo</h1>
//         </div>
//         <div className={`sidebar-item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavigation('dashboard')}>
//           <FaTachometerAlt />
//           <span>Dashboard</span>
//         </div>
//         <div className={`sidebar-item ${currentPage === 'investment' ? 'active' : ''}`} onClick={() => handleNavigation('investment')}>
//           <FaChartLine />
//           <span>Investment Advisory</span>
//         </div>
//         <div className={`sidebar-item ${currentPage === 'planning' ? 'active' : ''}`} onClick={() => handleNavigation('planning')}>
//           <FaFileInvoiceDollar />
//           <span>Financial Planning</span>
//         </div>
//         <div className={`sidebar-item ${currentPage === 'risk' ? 'active' : ''}`} onClick={() => handleNavigation('risk')}>
//           <FaShieldAlt />
//           <span>Risk Assessment</span>
//         </div>
//         <div className={`sidebar-item ${currentPage === 'support' ? 'active' : ''}`} onClick={() => handleNavigation('support')}>
//           <FaHeadset />
//           <span>Customer Support</span>
//         </div>
//         <div className={`sidebar-item ${currentPage === 'settings' ? 'active' : ''}`} onClick={() => handleNavigation('settings')}>
//           <FaCog />
//           <span>Settings</span>
//         </div>
//         <div className={`sidebar-item ${currentPage === 'signout' ? 'active' : ''}`} onClick={() => handleNavigation('signout')}>
//           <FaSignOutAlt />
//           <span>Sign Out</span>
//         </div>
//       </div>
//       <div className="header">
//         <div>User Info</div>
//       </div>
//       <div className="main-content">
//         <h2>Hello Mahak!</h2>
//         <div className="flex-container">
//           <div className="card card-balance">Balance: INR 2,00,000</div>
//           <div className="card card-income">Income: INR 80,000</div>
//           <div className="card card-spending">Spending: INR 7,500</div>
//           <div className="card card-stocks">Stocks Invested: 8</div>
//         </div>
//         <div className="card balance-overview">
//           <h3>Balance Overview</h3>
//           {/* Add chart here */}
//         </div>
//         <div className="flex-container">
//           <div className="card stock-earning">
//             <h3>Stock Earning</h3>
//             <p>INR 10500.27</p>
//             <p>INR 8204.67</p>
//           </div>
//           <div className="card quick-transfer">
//             <h3>Quick Transfer</h3>
//             {/* Add quick transfer content here */}
//           </div>
//         </div>
//         <div className="card invoices">
//           <h3>Invoices</h3>
//           {/* Add invoices table here */}
//         </div>
//         <div className="card currencies-market">
//           <h3>Currencies Market</h3>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <div className="currencies-container">
//               {currencyData.map(([currency, value]) => (
//                 <div className="currency-box" key={currency}>
//                   <div className="flag-wrapper">
//                     <Flag code={currencyFlags[currency]} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
//                   </div>
//                   <div className="currency-info">
//                     <div className="currency-symbol">{currencySymbols[currency] || currency}</div>
//                     <div className="currency-value">{value.toFixed(4)}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;