// src/lib/firebase/config.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// These values are pulled from your .env.local file
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Checks if the Firebase configuration is complete.
 * @returns {boolean} - True if all required Firebase env vars are set, false otherwise.
 */
export function isFirebaseEnabled(): boolean {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
  );
}

// Initialize Firebase
// We wrap this in a function to ensure it's only initialized once.
function initializeFirebaseApp() {
    if (getApps().length > 0) {
        return getApp();
    }
    
    if (!isFirebaseEnabled()) {
        console.warn(
            "Firebase is not fully configured. Please check your .env.local file. " +
            "The app will run with mock data."
        );
        return null;
    }
    
    return initializeApp(firebaseConfig);
}

const app = initializeFirebaseApp();

// Initialize Cloud Firestore and get a reference to the service
// Only initialize if the app was successfully created
export const db = app ? getFirestore(app) : null;
