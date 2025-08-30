// pages.js — Render different user flows
import { getBusinessProposals, getInvestorProposals } from "./users.js";
import { getLoanOffers } from "./banker.js";
import { getSolutions } from "./advisor.js";
import { createCard } from "./components.js";

const appDiv = document.getElementById("app");

/**
 * Show all business proposals
 */
export async function showBusinessProposals() {
  const proposals = await getBusinessProposals();
  appDiv.innerHTML = proposals
    .map((p) => createCard(p.companyName, p.idea))
    .join("");
}

/**
 * Show all investor proposals
 */
export async function showInvestorProposals() {
  const proposals = await getInvestorProposals();
  appDiv.innerHTML = proposals
    .map((p) => createCard(p.investorName, p.interestArea))
    .join("");
}


export async function showLoanOffers() {
  const offers = await getLoanOffers();
  appDiv.innerHTML = offers
    .map((o) => createCard(o.bankName, o.loanDetails))
    .join("");
}

/**
 * Show solutions for a query
 */
export async function showSolutions(queryId) {
  const solutions = await getSolutions(queryId);
  appDiv.innerHTML = solutions
    .map((s) => createCard("Advisor", s.answer))
    .join("");
}
