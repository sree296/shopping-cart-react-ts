// Import Packages
import { createContext, ReactNode, useContext, useState} from "react";

// Import Components
import ShoppingCart from "../components/ShoppingCart";

// Import Hooks
import {useLocalStorage} from '../hooks/useLocalStorage';

/**
 * Shopping Cart Context Interface
 */
export interface IShoppingCartContextProps {
    getItemQuantity:(id: number) => number,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    openCart: () => void,
    closeCart: () => void,
    cartItems: ICartItem[],
    cartQuantity: number,
};

/**
 * Shopping Cart Provider Interface
 */
export interface IShoppingCartProviderProps {
    children: ReactNode
}

/**
 * Cart Item Interface
 */
export interface ICartItem {
    id: number,
    quantity: number,
}

/**
 * Create Context.
 */
const ShoppingCartContext = createContext({} as IShoppingCartContextProps);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({children} : IShoppingCartProviderProps) {

    /**
     * Initial State
     */
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cartItems, setCartItems] = useLocalStorage<ICartItem[]>(
        "shopping-cart",
        []
      );

    const openCart = () => setIsOpen(true); 
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id: number){
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    /**
     * To Calculate total Items Quantity in Cart.
     */
    const cartQuantity = cartItems.reduce( 
        (quantity, item) => quantity + item.quantity, 0);

    /**
     * To increase number items to the Cart.
     * @param id 
     */
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

    /**
     * To decrease number of items in the Cart.
     * @param id
     */
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

    /**
     * To remove item from Cart.
     * @param id 
     */
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