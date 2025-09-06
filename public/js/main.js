import { loginUser, registerUser, logoutUser, observeAuth } from "./auth.js";
import { registerProfile, getProfiles } from "./api/users.js";
import { db } from "./firebaseConfig.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const logoutBtn = document.getElementById("btnLogout");

const authSection = document.getElementById("authSection");
const appSection = document.getElementById("app");

const businessForm = document.getElementById("businessForm");
const investorForm = document.getElementById("investorForm");
const businessCards = document.getElementById("businessCards");
const investorCards = document.getElementById("investorCards");

let currentUserRole = null;

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  try {
    await loginUser(email, password);
    loginForm.reset();
  } catch (err) {
    console.error("Login failed:", err.message);
    alert("Login failed: " + err.message);
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const role = document.getElementById("regRole").value;
  try {
    const user = await registerUser(email, password);
 
    await setDoc(doc(db, "users", user.uid), { role });
    registerForm.reset();
    alert("Account created! You can now log in.");
  } catch (err) {
    console.error("Registration failed:", err.message);
    alert("Registration failed: " + err.message);
  }
});

logoutBtn.addEventListener("click", async () => {
  try {
    await logoutUser();
  } catch (err) {
    console.error("Logout failed:", err.message);
  }
});


function createCard(title, content) {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
  return div;
}

async function populateProfiles(role) {
  const container = role === "business" ? businessCards : investorCards;
  container.innerHTML = "";
  const profiles = await getProfiles(role);
  profiles.forEach((p) => {
    let content = role === "business" ? p.description : p.investmentFocus;
    const card = createCard(p.name, content);
    container.appendChild(card);
  });
}

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


observeAuth(async (user) => {
  if (!user) {
    currentUserRole = null;
    authSection.classList.remove("hidden");
    appSection.classList.add("hidden");
    logoutBtn.classList.add("hidden");
    return;
  }

  // get user role from Firestore
  const snap = await getDoc(doc(db, "users", user.uid));
  currentUserRole = snap.exists() ? snap.data().role : null;

  authSection.classList.add("hidden");
  appSection.classList.remove("hidden");
  logoutBtn.classList.remove("hidden");

  const businessSection = document.getElementById("businessSection");
  const investorSection = document.getElementById("investorSection");

  if (currentUserRole === "business") {
    businessSection.style.display = "none";   // hide own section
    investorSection.style.display = "block";  // show opposite
    await populateProfiles("investor");       // load investors
  } else if (currentUserRole === "investor") {
    businessSection.style.display = "block";  // show opposite
    investorSection.style.display = "none";   // hide own section
    await populateProfiles("business");       // load businesses
  } else {
    businessSection.style.display = "none";
    investorSection.style.display = "none";
  }
});

