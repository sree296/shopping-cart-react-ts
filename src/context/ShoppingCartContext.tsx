import { createContext, ReactNode, useContext, useState} from "react";
import ShoppingCart from "../components/ShoppingCart";
import {useLocalStorage} from '../hooks/useLocalStorage';

type ShoppingCartContextProps = {
    getItemQuantity:(id: number) => number,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    openCart: () => void,
    closeCart: () => void,
    cartItems: CartItem[],
    cartQuantity: number,
};

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number,
    quantity: number,
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({children} : ShoppingCartProviderProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
      );

    function getItemQuantity(id: number){
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    const openCart = () => setIsOpen(true); 
    const closeCart = () => setIsOpen(false);

    const cartQuantity = cartItems.reduce( 
        (quantity, item) => quantity + item.quantity, 0);

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
          if (currItems.find(item => item.id === id) == null) {
            return [...currItems, { id, quantity: 1 }]
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
              } else {
                return item
              }
            })
          }
        })
    }

    function decreaseCartQuantity(id: number){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
              return currItems.filter(item => item.id !== id)
            } else {
              return currItems.map(item => {
                if (item.id === id) {
                  return { ...item, quantity: item.quantity - 1 }
                } else {
                  return item
                }
              })
            }
          })
    }

    function removeFromCart(id: number){
        setCartItems(cartItems => {
            return cartItems.filter( item => item.id !== id);
        })
    }
    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity,
            }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}