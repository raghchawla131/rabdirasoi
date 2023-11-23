export function getCartItemsFromStorage() {
    const storedItems = localStorage.getItem("cartItems");
    return storedItems ? JSON.parse(storedItems) : [];
}

export function setCartItemsToStorage(cartItems) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
