import React from 'react';
import { withRouter } from 'react-router-dom';
import { FaTachometerAlt, FaChartLine, FaFileInvoiceDollar, FaShieldAlt, FaHeadset, FaCog, FaSignOutAlt } from 'react-icons/fa';
import logo from './logo.png';
import { signOut } from 'firebase/auth';
import { auth } from './firebase'; // Assuming you have an auth configuration

const Sidebar = ({ history, currentPage }) => {
  const handleNavigation = (page) => {
    history.push(page);
    window.location.reload(); // Force page reload after navigation
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        history.push('/login');
        window.location.reload(); // Force page reload after sign out
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div className="sidebar">
      <div className="logo">
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
      <div className={`sidebar-item`} onClick={handleSignOut}>
        <FaSignOutAlt />
        <span>Sign Out</span>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);
