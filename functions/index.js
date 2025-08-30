/**
 * Firebase Functions — Backend entry
 * Handles logging + placeholder APIs for users, advisors, bankers, etc.
 */
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * Simple HTTP endpoint to log actions.
 * Frontend will POST logs here.
 */
exports.logAction = functions.https.onRequest(async (req, res) => {
  try {
    const { ts, action, targetType, targetId, details } = req.body;

    // Save in Firestore
    await db.collection("logs").add({
      ts: ts || Date.now(),
      action,
      targetType,
      targetId,
      details,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Error logging:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * Example: Get all users (for admin panel later)
 */
exports.getUsers = functions.https.onCall(async (data, context) => {
  const snapshot = await db.collection("users").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});
