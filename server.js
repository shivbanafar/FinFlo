const express = require('express');
const bodyParser = require('body-parser');
const firebaseAdmin = require('firebase-admin');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS

// Initialize Firebase Admin with the service account key
const serviceAccount = require('./serviceAccountKey.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

app.post('/login', async (req, res) => {
    const { token } = req.body;

    try {
        // Verify the ID token and get the user's Firebase ID
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        res.status(200).send({ uid });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(401).send('Invalid credentials');
    }
});

app.post('/signup', async (req, res) => {
    const { token } = req.body;

    try {
        // Verify the ID token and get the user's Firebase ID
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        res.status(200).send({ uid });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(401).send('Invalid credentials');
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));

app.get('/test-db', async (req, res) => {
    try {
        res.send('Database connection successful');
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).send('Database connection error');
    }
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const sql = require('mssql');
// const bcrypt = require('bcryptjs');
// const path = require('path');
// const cors = require('cors'); // Import cors

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors()); // Enable CORS

// const dbConfig = {
//     user: 'finflo123',
//     password: 'Li12ghtwood!',
//     server: '10.0.0.4', // Replace with the private IP address you found
//     database: 'finflo',
//     options: {
//         encrypt: true, // Ensure encryption is enabled
//         trustServerCertificate: true // For testing, set to true if you're using a self-signed certificate; false in production with a valid certificate
//     }
// };

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     console.log(`Login attempt for username: ${username}`);

//     try {
//         let pool = await sql.connect(dbConfig);
//         console.log('Database connected successfully');

//         let result = await pool.request()
//             .input('username', sql.NVarChar, username)
//             .query('SELECT * FROM Users WHERE Username = @username');

//         if (result.recordset.length > 0) {
//             const user = result.recordset[0];
//             const passwordMatch = await bcrypt.compare(password, user.PasswordHash);

//             if (passwordMatch) {
//                 console.log('Password match successful');
//                 res.status(200).send('Login successful');
//             } else {
//                 console.log('Invalid password');
//                 res.status(401).send('Invalid credentials');
//             }
//         } else {
//             console.log('User not found');
//             res.status(401).send('Invalid credentials');
//         }
//     } catch (err) {
//         console.error('Database error:', err);
//         res.status(500).send('Server error');
//     }
// });

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// const port = process.env.PORT || 5001;
// app.listen(port, () => console.log(`Server running on port ${port}`));

// app.get('/test-db', async (req, res) => {
//     try {
//         let pool = await sql.connect(dbConfig);
//         let result = await pool.request().query('SELECT 1');
//         res.send('Database connection successful');
//     } catch (err) {
//         console.error('Database connection error:', err);
//         res.status(500).send('Database connection error');
//     }
// });
