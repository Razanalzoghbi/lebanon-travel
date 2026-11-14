import { API, getToken } from "./auth";

// Keeps the list of favorite ids in memory so every heart on the page
// does not need its own request.
let cache = null; // { places: Set, experiences: Set }
let loading = null;
const listeners = new Set();

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function loadFavoriteIds() {
  if (cache) return Promise.resolve(cache);
  if (loading) return loading;
  loading = fetch(`${API}/api/favorites/ids`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
    .then((res) => (res.ok ? res.json() : { place_ids: [], experience_ids: [] }))
    .then((data) => {
      cache = {
        places: new Set(data.place_ids),
        experiences: new Set(data.experience_ids),
      };
      loading = null;
      return cache;
    })
    .catch(() => {
      loading = null;
      return { places: new Set(), experiences: new Set() };
    });
  return loading;
}

// kind: "places" or "experiences". Returns the new state (true = saved), or null if it failed.
export async function toggleFavorite(kind, id) {
  const current = await loadFavoriteIds();
  const has = current[kind].has(id);
  const path = kind === "places" ? "place" : "experience";
  try {
    const res = await fetch(`${API}/api/favorites/${path}/${id}`, {
      method: has ? "DELETE" : "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) return null;
  } catch (e) {
    return null;
  }
  if (has) current[kind].delete(id);
  else current[kind].add(id);
  listeners.forEach((fn) => fn());
  return !has;
}