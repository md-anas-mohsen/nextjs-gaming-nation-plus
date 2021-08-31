import { createContext, useEffect, useState } from "react";
import { client } from "../utils/shopify";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const storage = window.localStorage;
      const checkoutId = storage.getItem("checkoutId");
      const cartData = await client.checkout.fetch(checkoutId);
      setCart(JSON.parse(JSON.stringify(cartData)));
    };
    fetchCart();
  }, []);

  const addToCart = async (variant, quantity) => {
    const storage = window.localStorage;
    let checkoutId = storage.getItem("checkoutId");
    if (!checkoutId) {
      const checkout = await client.checkout.create();
      checkoutId = checkout.id;
      storage.setItem("checkoutId", checkoutId);
    }
    const cartData = await client.checkout.addLineItems(checkoutId, [
      {
        variantId: variant,
        quantity: quantity > 0 ? quantity : 1,
      },
    ]);
    setCart(JSON.parse(JSON.stringify(cartData)));
    console.log(cartData);
  };

  const deleteFromCart = async (variant) => {
    console.log(variant);
    const storage = window.localStorage;
    const checkoutId = storage.getItem("checkoutId");
    const cartData = await client.checkout.removeLineItems(checkoutId, [
      variant,
    ]);
    setCart(JSON.parse(JSON.stringify(cartData)));
  };

  const updateInCart = () => {};

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        deleteFromCart,
        updateInCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
