// logger.js — Client-side logging
// Each log is sent to a Cloud Function (to be implemented later).
// For now we’ll just print + simulate.

export async function log(action, targetType, targetId = null, details = {}) {
  const payload = {
    ts: Date.now(),
    action,
    targetType,
    targetId,
    details,
  };

  try {
    // Later we’ll POST this to a Firebase Function endpoint.
    console.info("[LOG]", payload);
    // Example fetch (commented until CF endpoint ready):
    // await fetch("/log", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
  } catch (err) {
    console.error("Logging failed:", err);
  }
}
