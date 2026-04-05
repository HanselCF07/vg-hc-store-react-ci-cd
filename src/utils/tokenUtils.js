// Unique key to store the token
const TOKEN_KEY = "vg_hc_store_token";

/**
 * Save the token to localStorage or sessionStorage
 * @param {string} token - The JWT received from the backend
 * @param {boolean} keepSession - If true, it is saved in localStorage (persistent)
 *                                If false, it is saved in sessionStorage (only during the session)
 */
export const saveToken = (token, keepSession = false) => {
  if (keepSession) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * It obtains the token from localStorage or sessionStorage.
 * @returns {string|null} - The token if it exists, or null
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

/**
 * Remove the token from both storages
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};

