// users.js — Handles all profiles and proposals
import { db } from "../firebaseConfig.js";
import { auth } from "../firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { log } from "../logger.js";

/**
 * Register a profile (Business/Investor/Advisor)
 */
export async function registerProfile(role, data) {
  if (!auth.currentUser) throw new Error("Not authenticated");

  const ref = await addDoc(collection(db, `${role}Profiles`), {
    uid: auth.currentUser.uid,
    ...data,
    createdAt: serverTimestamp(),
  });
  await log(`REGISTER_${role.toUpperCase()}`, `${role}Profile`, ref.id, data);
  return ref.id;
}

/**
 * Fetch all profiles for a role
 */
export async function getProfiles(role) {
  const q = query(collection(db, `${role}Profiles`), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Post a proposal for a role
 */
export async function postProposal(role, title, description) {
  if (!auth.currentUser) throw new Error("Not authenticated");

  const ref = await addDoc(collection(db, `${role}Proposals`), {
    uid: auth.currentUser.uid,
    title,
    description,
    createdAt: serverTimestamp(),
  });
  await log(`POST_${role.toUpperCase()}_PROPOSAL`, `${role}Proposal`, ref.id, { title, description });
  return ref.id;
}

/**
 * Fetch all proposals for a role
 */
export async function fetchProposals(role) {
  const q = query(collection(db, `${role}Proposals`), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
