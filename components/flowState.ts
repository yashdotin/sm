export const FLOW_KEYS = {
  unlocked: "valentine-unlocked",
  accepted: "valentine-accepted",
  memories: "valentine-memories"
};

export function setUnlocked() {
  sessionStorage.setItem(FLOW_KEYS.unlocked, "true");
}
export function isUnlocked() {
  return sessionStorage.getItem(FLOW_KEYS.unlocked) === "true";
}
export function setAccepted() {
  sessionStorage.setItem(FLOW_KEYS.accepted, "true");
}
export function isAccepted() {
  return sessionStorage.getItem(FLOW_KEYS.accepted) === "true";
}
export function setMemoriesComplete() {
  sessionStorage.setItem(FLOW_KEYS.memories, "true");
}
export function isMemoriesComplete() {
  return sessionStorage.getItem(FLOW_KEYS.memories) === "true";
}
