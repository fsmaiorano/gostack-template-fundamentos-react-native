import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      // TODO LOAD ITEMS FROM ASYNC STORAGE
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async (product: Product) => {
      const hasProduct = products.filter(p => p.id === product.id);
      if (hasProduct.length > 0) {
        hasProduct[0].quantity = hasProduct[0].quantity + 1;
      } else {
        product.quantity = 1;
        setProducts([...products, product]);
      }
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      products.forEach((product: Product) => {
        if (product.id === id) {
          product.quantity = product.quantity + 1;
        }
      });

      setProducts([...products]);
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      products.forEach((product: Product, index) => {
        if (product.id === id) {
          if (product.quantity === 1) {
            products.splice(index, 1);
          } else {
            product.quantity = product.quantity - 1;
          }
        }
      });

      setProducts([...products]);
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
