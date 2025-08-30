// main.js
import { loginWithGoogle, logoutUser, observeAuth } from "./auth.js";
import { registerProfile, getProfiles } from "./api/users.js";

const loginBtn = document.getElementById("btnLogin");
const logoutBtn = document.getElementById("btnLogout");

// Sections
const businessForm = document.getElementById("businessForm");
const investorForm = document.getElementById("investorForm");
const businessCards = document.getElementById("businessCards");
const investorCards = document.getElementById("investorCards");

// Login / Logout
loginBtn.addEventListener("click", async () => {
  try {
    await loginWithGoogle();
  } catch (err) {
    console.error("Login failed:", err);
  }
});

logoutBtn.addEventListener("click", async () => {
  try {
    await logoutUser();
  } catch (err) {
    console.error("Logout failed:", err);
  }
});

// Helper to create a card
function createCard(title, content) {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
  return div;
}

// Populate profiles
async function populateProfiles(role) {
  const container = role === "business" ? businessCards : investorCards;
  container.innerHTML = "";
  const profiles = await getProfiles(role);
  profiles.forEach(p => {
    let content = role === "business" ? p.description : p.investmentFocus;
    const card = createCard(p.name, content);
    container.appendChild(card);
  });
}

// Form submissions
businessForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("businessName").value;
  const desc = document.getElementById("businessDesc").value;
  try {
    await registerProfile("business", { name, description: desc });
    businessForm.reset();
    await populateProfiles("business");
  } catch (err) {
    console.error(err);
  }
});

investorForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("investorName").value;
  const focus = document.getElementById("investmentFocus").value;
  try {
    await registerProfile("investor", { name, investmentFocus: focus });
    investorForm.reset();
    await populateProfiles("investor");
  } catch (err) {
    console.error(err);
  }
});

// Observe authentication
observeAuth(async (user) => {
  const isLoggedIn = !!user;
  loginBtn.classList.toggle("hidden", isLoggedIn);
  logoutBtn.classList.toggle("hidden", !isLoggedIn);

  businessForm.style.display = isLoggedIn ? "block" : "none";
  investorForm.style.display = isLoggedIn ? "block" : "none";

  if (isLoggedIn) {
    await populateProfiles("business");
    await populateProfiles("investor");
  } else {
    businessCards.innerHTML = "<p>Please login to view business profiles.</p>";
    investorCards.innerHTML = "<p>Please login to view investor profiles.</p>";
  }
});
