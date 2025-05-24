import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA71CkZQoVhU-jvBtkJ6hci6q0Ag1bYs_c",
  authDomain: "piso-tracker.firebaseapp.com",
  projectId: "piso-tracker",
  storageBucket: "piso-tracker.firebasestorage.app",
  messagingSenderId: "163936180271",
  appId: "1:163936180271:web:bca6630fa40ab0d4770eda",
  measurementId: "G-GSHHQBCCXL"
};

const app = initializeApp(firebaseConfig);
// Analytics is not available in Expo/React Native
// const analytics = getAnalytics(app);

export default app;