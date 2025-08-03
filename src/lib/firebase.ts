// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "market-genius-e6v2c",
  appId: "1:931293317544:web:78eb8f3938c80f710fb59d",
  storageBucket: "market-genius-e6v2c.firebasestorage.app",
  apiKey: "AIzaSyAWQqYKfFZsyHs0tGHE7hZfMoBhiG2x6yY",
  authDomain: "market-genius-e6v2c.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "931293317544",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const messaging = (app: any) => {
    if (typeof window !== "undefined") {
        return getMessaging(app);
    }
    return null;
}


export const firebaseApp = app;