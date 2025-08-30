// api/investorProposals.js — Investor Proposals (CRUD)
import { db } from "../firebaseConfig.js";
import { collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { log } from "../logger.js";

/**
 * Post new Investor Proposal
 */
export async function postInvestorProposal(userId, amount, sector, description) {
  const ref = await addDoc(collection(db, "investorProposals"), {
    userId,
    amount,
    sector,
    description,
    createdAt: serverTimestamp(),
  });
  await log("POST_PROPOSAL", "user", userId, { amount, sector });
  return ref.id;
}

/**
 * Fetch all Investor Proposals
 */
export async function getInvestorProposals() {
  const querySnapshot = await getDocs(collection(db, "investorProposals"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
