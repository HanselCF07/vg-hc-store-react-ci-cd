// Unique key to store the shopping cart
const CART_KEY = "vg_hc_store_cart";

/**
 * Save the cart to localStorage or sessionStorage
 * @param {Array} cart - Product Array
 * @param {boolean} keepSession - true = localStorage, false = sessionStorage
 */
export const saveCart = (cart, keepSession = false) => {
  const data = JSON.stringify(cart);
  if (keepSession) {
    localStorage.setItem(CART_KEY, data);
  } else {
    sessionStorage.setItem(CART_KEY, data);
  }
};

/**
 * Get the cart from storage
 * @returns {Array} - Product Array o []
 */
export const getCart = () => {
  const data = localStorage.getItem(CART_KEY) || sessionStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Remove the cart from both storages
 */
export const removeCart = () => {
  localStorage.removeItem(CART_KEY);
  sessionStorage.removeItem(CART_KEY);
};

