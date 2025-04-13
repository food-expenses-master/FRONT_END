// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAaX0O_LdNpr-B3IleWPxiE04hlB6zFfk",
  authDomain: "food-expenses-master.firebaseapp.com",
  projectId: "food-expenses-master",
  storageBucket: "food-expenses-master.firebasestorage.app",
  messagingSenderId: "747767727971",
  appId: "1:747767727971:web:42a1ae74d019200ea3b556",
  measurementId: "G-LN6VZ0DEC6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);