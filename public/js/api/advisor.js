// advisor.js — Business Advisor functions
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
 * Post a query (by business people)
 */
export async function postQuery(data) {
  if (!auth.currentUser) throw new Error("Not authenticated");

  const ref = await addDoc(collection(db, "queries"), {
    uid: auth.currentUser.uid,
    ...data,
    createdAt: serverTimestamp(),
  });
  await log("POST_QUERY", "query", ref.id, data);
  return ref.id;
}

/**
 * Advisor posts a solution
 */
export async function postSolution(queryId, data) {
  if (!auth.currentUser) throw new Error("Not authenticated");

  const ref = await addDoc(collection(db, "solutions"), {
    queryId,
    uid: auth.currentUser.uid,
    ...data,
    createdAt: serverTimestamp(),
  });
  await log("POST_SOLUTION", "solution", ref.id, data);
  return ref.id;
}

/**
 * View all solutions for a query
 */
export async function getSolutions(queryId) {
  const snap = await getDocs(collection(db, "solutions"));
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((s) => s.queryId === queryId);
}
