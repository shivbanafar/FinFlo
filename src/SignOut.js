import React from 'react';
import { withRouter } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import Sidebar from './Sidebar';
import './SignOut.css';

const SignOut = ({ history, currentPage, setCurrentPage }) => {
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        history.push('/login');
        window.location.reload(); // Ensure the page refreshes
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div className="container">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="main-content">
        <button className="signout-button" onClick={handleSignOut}>Sign Out</button>
        <button className="login-button" onClick={() => {
          history.push('/login');
          window.location.reload(); // Ensure the page refreshes
        }}>Go to Login Page</button>
      </div>
    </div>
  );
};

export default withRouter(SignOut);

// import Sidebar from "./Sidebar";
// import React, { useEffect } from 'react';
// import { withRouter } from 'react-router-dom';
// import firebase from 'firebase/app';
// import 'firebase/auth';

// const SignOut = () => {
//     const handleSignOut = () => {
//         // Sign out from Firebase
//         firebase.auth().signOut()
//           .then(() => {
//             // Clear any additional session storage or cookies if needed
//             // localStorage.removeItem('authToken');
            
//             // Redirect to the login page
//             history.push('/login');
//           })
//           .catch((error) => {
//             console.error('Error signing out:', error);
//           });
//       };
//     return (
//         <div className="container">
//           <Sidebar currentPage="signout" />
//           <div className="header">
//             <div>User Info</div>
//           </div>
//           <div className="main-content">
//             <h2>Signed Out</h2>
//             <button onClick={() => history.push('/login')}>Go to Login Page</button>
//             {/* Add content specific to Investment Advisory here */}
//           </div>
//         </div>)
// }
 
// export default SignOut;