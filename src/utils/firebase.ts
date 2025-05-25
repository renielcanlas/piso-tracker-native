import { getApp, getApps, initializeApp } from "firebase/app";
import { enableIndexedDbPersistence, getFirestore, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA71CkZQoVhU-jvBtkJ6hci6q0Ag1bYs_c",
  authDomain: "piso-tracker.firebaseapp.com",
  projectId: "piso-tracker",
  storageBucket: "piso-tracker.appspot.com", // fixed typo here
  messagingSenderId: "163936180271",
  appId: "1:163936180271:web:bca6630fa40ab0d4770eda",
  measurementId: "G-GSHHQBCCXL"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
console.log("Firebase initialized:", app.name, app.options);

let db;
try {
  // Try to get existing Firestore instance
  db = getFirestore(app);
} catch {
  // If not initialized, initialize with settings
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true, // Use long polling for better compatibility
  });
}

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a time
    console.warn('Persistence failed: Multiple tabs open');
  } else if (err.code === 'unimplemented') {
    // The current browser doesn't support persistence
    console.warn('Persistence not supported by platform');
  }
});

export { db };
export default app;