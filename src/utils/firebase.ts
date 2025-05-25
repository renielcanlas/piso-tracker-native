import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, enableIndexedDbPersistence, getDoc, getFirestore, initializeFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA71CkZQoVhU-jvBtkJ6hci6q0Ag1bYs_c",
  authDomain: "piso-tracker.firebaseapp.com",
  projectId: "piso-tracker",
  storageBucket: "piso-tracker.appspot.com",
  messagingSenderId: "163936180271",
  appId: "1:163936180271:web:bca6630fa40ab0d4770eda",
  measurementId: "G-GSHHQBCCXL"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
console.log("Firebase initialized:", app.name, app.options);

// Initialize Auth first
const auth = getAuth(app);

// Initialize Firestore with specific settings for better offline support
// We use IIFE to handle initialization and error cases
const db = (() => {
  try {
    // Try to get existing Firestore instance first
    return getFirestore(app);
  } catch (error) {
    console.log('Creating new Firestore instance:', error);
    // If no instance exists, create new one with our settings
    return initializeFirestore(app, {
      experimentalForceLongPolling: true,
      experimentalAutoDetectLongPolling: true
    });
  }
})();

// Enable offline persistence with better error handling
try {
  enableIndexedDbPersistence(db)
    .then(() => {
      console.log('Offline persistence enabled successfully');
    })
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence enabled in another tab');
      } else if (err.code === 'unimplemented') {
        console.warn('Current browser does not support persistence');
      } else {
        console.error('Error enabling persistence:', err);
      }
    });
} catch (error) {
  console.error('Failed to enable persistence:', error);
}

// Function to save user avatar settings
export async function saveUserAvatarSettings(userId: string, icon: string, color: string) {
  try {
    // Verify auth state
    const currentUser = auth.currentUser;
    if (!currentUser || currentUser.uid !== userId) {
      throw new Error('User not authenticated');
    }

    // Reference to user's document
    const userDoc = doc(db, 'userSettings', userId);
      // Prepare data - ensuring all values are of supported Firestore types
    const data = {
      avatar: {
        icon: String(icon), // Ensure it's a string
        color: String(color) // Ensure it's a string
      },
      updatedAt: new Date(), // Using actual Date object instead of string
      userId: currentUser.uid
    };
    
    // Save to Firestore with error handling
    try {
      await setDoc(userDoc, data, { merge: true });
      console.log('Document successfully written');
      return true;
    } catch (error: any) {
      console.error('Error writing document:', error);
      // Check for specific Firestore errors
      if (error.code === 'invalid-argument') {
        throw new Error('Invalid data format. Please check your input.');
      }
      throw error;
    }
  } catch (error: any) {
    console.error('Firestore save error:', error);
    if (error.code === 'permission-denied') {
      throw new Error('Permission denied. Please check your authentication status.');
    }
    throw error; // Re-throw other errors to be handled by the UI
  }
}

// Function to load user avatar settings
export async function loadUserAvatarSettings(userId: string) {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser || currentUser.uid !== userId) {
      console.error('User not authenticated or ID mismatch', {
        currentUser: currentUser?.uid,
        requestedId: userId
      });
      return null;
    }

    console.log('Loading avatar settings for user:', userId);
    const userDoc = doc(db, 'userSettings', userId);
    
    console.log('Fetching document...');
    try {
      const docSnap = await getDoc(userDoc);
      console.log('Document snapshot:', {
        exists: docSnap.exists(),
        id: docSnap.id,
        metadata: docSnap.metadata
      });
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Loaded avatar settings:', data);
        return data.avatar;
      }
      console.log('No existing avatar settings found');
      return null;
    } catch (readError: any) {
      if (readError.code === 'unavailable') {
        console.warn('Device is offline, using cached data if available');
        // The SDK will automatically use cached data if available
        return null;
      }
      console.error('Error during getDoc:', readError);
      throw readError;
    }
  } catch (error) {
    console.error('Error loading avatar settings:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    return null;
  }
}

export { db };
export default app;