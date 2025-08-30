// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js"; // optional

const firebaseConfig = {
  apiKey: "AIzaSyCkO0yC8Vzd4K-OKAQAdBGe-LqdsKIQg-Q",
  authDomain: "bridge-investors-app.firebaseapp.com",
  projectId: "bridge-investors-app",
  storageBucket: "bridge-investors-app.appspot.com",
  messagingSenderId: "1021471133561",
  appId: "1:1021471133561:web:db9fe4dc307239b82a69a8",
  measurementId: "G-VG28FVK550"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app); // enable only if Analytics is set up

export { app, auth, db };