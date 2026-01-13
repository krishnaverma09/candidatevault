const STORAGE_KEY = "decisions";

export function getDecisions() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveDecisions(decisions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
}

export function addDecision(decision) {
  const decisions = getDecisions();
  decisions.push(decision);
  saveDecisions(decisions);
}

export function deleteDecision(id) {
  const decisions = getDecisions().filter(d => d.id !== id);
  saveDecisions(decisions);
}

export function getDecisionById(id) {
  return getDecisions().find(d => d.id === id);
}

export function updateDecision(updated) {
  const decisions = getDecisions().map(d =>
    d.id === updated.id ? updated : d
  );
  saveDecisions(decisions);
}
