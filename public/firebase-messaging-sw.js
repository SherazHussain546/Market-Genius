// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyAWQqYKfFZsyHs0tGHE7hZfMoBhiG2x6yY",
  authDomain: "market-genius-e6v2c.firebaseapp.com",
  projectId: "market-genius-e6v2c",
  storageBucket: "market-genius-e6v2c.firebasestorage.app",
  messagingSenderId: "931293317544",
  appId: "1:931293317544:web:78eb8f3938c80f710fb59d",
};


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});