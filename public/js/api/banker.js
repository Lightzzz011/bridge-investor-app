// banker.js — Banker related functions
import { db } from "./firebaseConfig.js";
import { auth } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { log } from "./logger.js";

/**
 * Post loan offering details
 */
export async function postLoanDetails(data) {
  if (!auth.currentUser) throw new Error("Not authenticated");

  const ref = await addDoc(collection(db, "loanOffers"), {
    uid: auth.currentUser.uid,
    ...data,
    createdAt: serverTimestamp(),
  });
  await log("POST_LOAN", "loanOffer", ref.id, data);
  return ref.id;
}

/**
 * View all loan offers
 */
export async function getLoanOffers() {
  const snap = await getDocs(collection(db, "loanOffers"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
