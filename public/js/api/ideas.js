// api/ideas.js — Business Ideas (CRUD)
import { db } from "../firebaseConfig.js";
import { collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { log } from "../logger.js";

/**
 * Post new Business Idea
 */
export async function postIdea(userId, title, description, category) {
  const ref = await addDoc(collection(db, "businessIdeas"), {
    userId,
    title,
    description,
    category,
    createdAt: serverTimestamp(),
  });
  await log("POST_IDEA", "user", userId, { title, category });
  return ref.id;
}

/**
 * Fetch all Business Ideas
 */
export async function getIdeas() {
  const querySnapshot = await getDocs(collection(db, "businessIdeas"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
