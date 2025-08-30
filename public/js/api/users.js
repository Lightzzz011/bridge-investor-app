// users.js — Business People & Investors management
import { db } from "./firebaseConfig.js";
import { auth } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { log } from "./logger.js";

/**
 * Register a business person profile
 */
export async function registerBusinessProfile(data) {
  if (!auth.currentUser) throw new Error("Not authenticated");

  const ref = await addDoc(collection(db, "businessProfiles"), {
    uid: auth.currentUser.uid,
    ...data,
    createdAt: serverTimestamp(),
  });
  await log("REGISTER_BUSINESS", "businessProfile", ref.id, data);
  return ref.id;
}

/**
 * Register an investor profile
 */
export async function registerInvestorProfile(data) {
  if (!auth.currentUser) throw new Error("Not authenticated");

  const ref = await addDoc(collection(db, "investorProfiles"), {
    uid: auth.currentUser.uid,
    ...data,
    createdAt: serverTimestamp(),
  });
  await log("REGISTER_INVESTOR", "investorProfile", ref.id, data);
  return ref.id;
}

/**
 * Fetch all business proposals
 */
export async function getBusinessProposals() {
  const q = query(collection(db, "businessProfiles"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Fetch all investor proposals
 */
export async function getInvestorProposals() {
  const q = query(collection(db, "investorProfiles"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
