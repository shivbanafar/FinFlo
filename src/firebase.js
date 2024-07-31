// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


    const firebaseConfig = {
        apiKey: "AIzaSyBQovboMYwqaBW6DtwmNtSpnM6POIFDl5I",
        authDomain: "finf-c719c.firebaseapp.com",
        projectId: "finf-c719c",
        storageBucket: "finf-c719c.appspot.com",
        messagingSenderId: "5523720234",
        appId: "1:5523720234:web:cf478dbea3fc3d30455b53",
        measurementId: "G-BSBX4CX7BX"
      };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
