// Clave única para almacenar el token en localStorage
const USER_KEY = "vg_hc_store_user";

/**
 * Guarda el User en localStorage o sessionStorage
 * @param {string} user - El JWT recibido del backend
 * @param {boolean} keepSession - Si es true, se guarda en localStorage (persistente)
 *                                Si es false, se guarda en sessionStorage (solo durante la sesión)
 */
export const saveUser = (user, keepSession = false) => {
  if (keepSession) {
    localStorage.setItem(USER_KEY, user);
  } else {
    sessionStorage.setItem(USER_KEY, user);
  }
};

/**
 * Get the User from localStorage or sessionStorage
 * @returns {string|null} - The token if it exists, or null
 */
export const getUser = () => {
  return localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
};

/**
 * Remove the User from both storages
 */
export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);
};

