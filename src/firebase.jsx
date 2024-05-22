// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/database"; // Import the database module
import { getAuth } from "firebase/auth/cordova";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2oM1OZTmWU8nJCI3ClftF_g3GXa_WZ5k",
  authDomain: "bvsprojects-d1ca9.firebaseapp.com",
  projectId: "bvsprojects-d1ca9",
  storageBucket: "bvsprojects-d1ca9.appspot.com",
  messagingSenderId: "1035997656608",
  appId: "1:1035997656608:web:d55789fcc775dd6c4c6e45",
  measurementId: "G-H97J6C41GT",
};

// Initialize Firebase
var firebaseDB = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore;
export const auth = getAuth();
export { db };

// Export the database reference for use in other parts of your application
export default firebaseDB.database().ref();
