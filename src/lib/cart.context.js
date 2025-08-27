"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const value = useMemo(() => ({ products, setProducts }), [products]);
  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedProducts = localStorage.getItem("cartProducts");
    if (storedProducts) {
        
      setProducts(JSON.parse(storedProducts));
    }
    setIsInitialized(true); // Mark as initialized after loading
  }, []);

  // Save cart to localStorage whenever products change
  useEffect(() => {
    if (isInitialized) {
        localStorage.setItem("cartProducts", JSON.stringify(products));
    }
}, [products, isInitialized]);
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
export const useCartProducts = () => useContext(CartContext);
