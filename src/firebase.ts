import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

let db: any = null;

export function getFirebaseDb() {
  if (db) return db;

  const hasConfig = 
    import.meta.env.VITE_FIREBASE_API_KEY && 
    import.meta.env.VITE_FIREBASE_PROJECT_ID;

  if (!hasConfig) {
    console.warn(
      "Firebase config is missing in environment variables. Live Firebase OTP and Submission flows are inactive. Please define VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID."
    );
    return null;
  }

  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    return db;
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    return null;
  }
}
