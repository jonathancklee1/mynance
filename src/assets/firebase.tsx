// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFIP9HujU0IO_7pxxMlJYpzBFwe3e_i9w",
    authDomain: "mynance-8614e.firebaseapp.com",
    projectId: "mynance-8614e",
    storageBucket: "mynance-8614e.firebasestorage.app",
    messagingSenderId: "529044326453",
    appId: "1:529044326453:web:58b458068c24c652c4097c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
