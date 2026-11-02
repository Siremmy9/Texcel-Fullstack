const KEY = "ew_admin_token";

export function getToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(KEY) || localStorage.getItem(KEY);
}

export function setToken(token: string, remember: boolean) {
  sessionStorage.removeItem(KEY);
  localStorage.removeItem(KEY);
  (remember ? localStorage : sessionStorage).setItem(KEY, token);
}

export function clearToken() {
  sessionStorage.removeItem(KEY);
  localStorage.removeItem(KEY);
}
