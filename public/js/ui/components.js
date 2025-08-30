// components.js — Reusable UI components

/**
 * Create a card
 */
export function createCard(title, body) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p>${body}</p>
    </div>
  `;
}

/**
 * Create a button
 */
export function createButton(label, id) {
  return `<button id="${id}" class="btn">${label}</button>`;
}
