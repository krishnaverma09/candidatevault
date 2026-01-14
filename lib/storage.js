const STORAGE_KEY = "candidates";

export function getCandidates() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addCandidate(candidate) {
  const candidates = getCandidates();
  candidates.push(candidate);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
}

export function deleteCandidate(id) {
  const candidates = getCandidates().filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
}

export function getCandidateById(id) {
  return getCandidates().find(c => c.id === id);
}

export function updateCandidate(updated) {
  const candidates = getCandidates().map(c =>
    c.id === updated.id ? updated : c
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
}
