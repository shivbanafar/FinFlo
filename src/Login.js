import axios from 'axios';
import logo from './logo.png';
import './Login.css';
import { withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        document.body.classList.add('login-page');
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken(true);
            const response = await axios.post('http://localhost:5001/login', { token });

            if (response.status === 200) {
                console.log('Login successful:', response.data);
                window.location.href = '/home'; // Redirect and refresh
            }
        } catch (error) {
            console.error('Invalid credentials', error);
            setError('Invalid credentials');
        }
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            const token = await user.getIdToken(true);
            const response = await axios.post('http://localhost:5001/signup', { token });

            if (response.status === 200) {
                console.log('Account creation successful:', response.data);
                window.location.href = '/home'; // Redirect and refresh
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('The email address is already in use by another account.');
            } else if (error.response) {
                console.error('Error creating account', error.response.data);
                setError('Error creating account: ' + error.response.data.message);
            } else if (error.request) {
                console.error('Network error', error.request);
                setError('Network error: Please try again later.');
            } else {
                console.error('Error', error.message);
                setError('Error: ' + error.message);
            }
        }
    };

    return (
        <div className='login-wrapper'>
            <div className="body-login">
            <div className="login-container">
                <div className="login-box">
                    <img src={logo} alt="Logo" className="logo" />
                    <h2>FinFlo</h2>
                    <p>Secure. Plan. Prosper.</p>
                    {isCreatingAccount ? (
                        <form onSubmit={handleCreateAccount}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="login-button">CREATE ACCOUNT</button>
                            {error && <p className="error-message">{error}</p>}
                            <p>Already have an account? <a href="#" onClick={() => setIsCreatingAccount(false)} className="login-link">Sign in.</a></p>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="remember-me">
                                <input type="checkbox" id="remember-me" />
                                <label htmlFor="remember-me">Remember me</label>
                                <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
                            </div>
                            <button type="submit" className="login-button">SIGN IN</button>
                            {error && <p className="error-message">{error}</p>}
                            <p>Don't have an account? <a href="#" onClick={() => setIsCreatingAccount(true)} className="create-account-link">Create account.</a></p>
                        </form>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default withRouter(Login);

// import axios from 'axios';
// import logo from './logo.png';
// import './Login.css';
// import { Redirect } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { auth } from './firebase';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [redirect, setRedirect] = useState(false);
//     const [isCreatingAccount, setIsCreatingAccount] = useState(false);
//     const [name, setName] = useState('');

//     useEffect(() => {
//         document.body.classList.add('login-page');
//         return () => {
//             document.body.classList.remove('login-page');
//         };
//     }, []);

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError(''); // Clear previous errors
//         try {
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             const token = await userCredential.user.getIdToken(true);
//             const response = await axios.post('http://localhost:5001/login', { token });

//             if (response.status === 200) {
//                 console.log('Login successful:', response.data);
//                 setRedirect(true);
//             }
//         } catch (error) {
//             console.error('Invalid credentials', error);
//             setError('Invalid credentials');
//         }
//     };

//     const handleCreateAccount = async (e) => {
//         e.preventDefault();
//         setError(''); // Clear previous errors
//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;
//             await updateProfile(user, { displayName: name });
//             const token = await user.getIdToken(true);
//             const response = await axios.post('http://localhost:5001/signup', { token });

//             if (response.status === 200) {
//                 console.log('Account creation successful:', response.data);
//                 setRedirect(true);
//             }
//         } catch (error) {
//             if (error.code === 'auth/email-already-in-use') {
//                 setError('The email address is already in use by another account.');
//             } else if (error.response) {
//                 console.error('Error creating account', error.response.data);
//                 setError('Error creating account: ' + error.response.data.message);
//             } else if (error.request) {
//                 console.error('Network error', error.request);
//                 setError('Network error: Please try again later.');
//             } else {
//                 console.error('Error', error.message);
//                 setError('Error: ' + error.message);
//             }
//         }
//     };

//     if (redirect) {
//         return <Redirect to="/home" />;
//     }

//     return (
//         <div className="body-login">
//             <div className="login-container">
//                 <div className="login-box">
//                     <img src={logo} alt="Logo" className="logo" />
//                     <h2>FinFlo</h2>
//                     <p>Secure. Plan. Prosper.</p>
//                     {isCreatingAccount ? (
//                         <form onSubmit={handleCreateAccount}>
//                             <div className="input-group">
//                                 <input
//                                     type="text"
//                                     placeholder="Name"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                 />
//                             </div>
//                             <div className="input-group">
//                                 <input
//                                     type="text"
//                                     placeholder="Email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>
//                             <div className="input-group">
//                                 <input
//                                     type="password"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                             </div>
//                             <button type="submit" className="login-button">CREATE ACCOUNT</button>
//                             {error && <p className="error-message">{error}</p>}
//                             <p>Already have an account? <a href="#" onClick={() => setIsCreatingAccount(false)} className="login-link">Sign in.</a></p>
//                         </form>
//                     ) : (
//                         <form onSubmit={handleLogin}>
//                             <div className="input-group">
//                                 <input
//                                     type="text"
//                                     placeholder="Email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>
//                             <div className="input-group">
//                                 <input
//                                     type="password"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                             </div>
//                             <div className="remember-me">
//                                 <input type="checkbox" id="remember-me" />
//                                 <label htmlFor="remember-me">Remember me</label>
//                                 <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
//                             </div>
//                             <button type="submit" className="login-button">SIGN IN</button>
//                             {error && <p className="error-message">{error}</p>}
//                             <p>Don't have an account? <a href="#" onClick={() => setIsCreatingAccount(true)} className="create-account-link">Create account.</a></p>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

