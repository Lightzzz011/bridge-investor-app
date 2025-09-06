// auth.js
import { auth } from "./firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

/**
 * Register with email & password
 */
export async function registerUser(email, password) {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Registered:", userCred.user);
    return userCred.user;
  } catch (err) {
    console.error("Registration failed:", err);
    throw err;
  }
}

/**
 * Login with email & password
 */
export async function loginUser(email, password) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in:", userCred.user);
    return userCred.user;
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
}

/**
 * Logout
 */
export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("Logged out");
  } catch (err) {
    console.error("Logout failed:", err);
    throw err;
  }
}

/**
 * Observe authentication state
 */
export function observeAuth(callback) {
  return onAuthStateChanged(auth, callback);
}
