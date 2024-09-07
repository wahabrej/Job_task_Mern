import { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      const parseData = JSON.parse(data);
      setCart(JSON.parse(data));
    }
    //eslint-disable-next-line
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);
export { useCart };
