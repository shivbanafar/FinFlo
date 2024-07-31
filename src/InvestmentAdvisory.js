import React from 'react';
import Sidebar from './Sidebar';

const InvestmentAdvisory = () => {
  return (
    <div className="container">
      <Sidebar currentPage="investment" />
      <div className="header">
        <div>User Info</div>
      </div>
      <div className="main-content">
        <h2>Investment Advisory</h2>
        {/* Add content specific to Investment Advisory here */}
      </div>
    </div>
  );
};

export default InvestmentAdvisory;
