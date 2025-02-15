// config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// 🚀 Ensure Firebase config exists
const firebaseConfig = Constants.expoConfig?.extra?.firebase;

if (!firebaseConfig) {
  throw new Error("❌ Firebase config is missing from app.json. Check your setup.");
}

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Enable persistent authentication with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, app };
