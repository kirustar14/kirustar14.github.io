import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Replace with your Firebase config from Firebase Console
// Instructions in SETUP.md
const firebaseConfig = {
  apiKey: "AIzaSyA5nJvmn-6xcVhfv6XXq0UnLFMDXUVnlBM",
  authDomain: "bleprint-mvp-359e5.firebaseapp.com",
  projectId: "bleprint-mvp-359e5",
  storageBucket: "bleprint-mvp-359e5.firebasestorage.app",
  messagingSenderId: "410659495978",
  appId: "1:410659495978:web:dc68ad4b5202c117f9a353"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { auth, db, storage };
export default app;
