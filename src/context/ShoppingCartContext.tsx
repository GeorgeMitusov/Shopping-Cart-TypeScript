import React, { createContext, ReactNode, useContext, useReducer, useState } from 'react';
import { cartReducer } from '../reducer/reducer';
import { CartItem } from '../interfaces/CartItemModel';
import { CartDataModel } from '../interfaces/CartDataModel';
import { ACTION_NAME } from '../actions/action-name';
import { ShoppingCart } from '../components/ShoppingCart';
import { FetchData } from '../data/FetchData';

type ShoppingCartProviderProps = {
  children: ReactNode
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id:number) => number
  increaseCartQuantity: (id:number) => void
  decreaseCartQuantity: (id:number) => void
  removeFromCart: (id:number) => void
  cartQuantity: number
  isOpen: boolean
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  cartItems: CartItem[]
  cartData: CartDataModel[]
  setCartData: React.Dispatch<React.SetStateAction<CartDataModel[]>>;
}

const ShoppingCartContex = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContex);
}

export function ShoppingCartProvider({ children } : ShoppingCartProviderProps) {

  const [ cartItems, dispatch ] = useReducer(cartReducer, [] as CartItem[]);
  const [ cartData, setCartData ] = useState<CartDataModel[]>([]);
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const { INCREASE_QUANTITY, DECREASE_QUANTITY, REMOVE_FROM_CART } = ACTION_NAME;

  function getItemQuantity(id: number) {
    return cartItems.find( item => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    dispatch({ type: INCREASE_QUANTITY, payload: id })
  }

  function decreaseCartQuantity(id: number) {
    dispatch({ type: DECREASE_QUANTITY, payload: id })
  }

  function removeFromCart(id: number) {
    dispatch({ type: REMOVE_FROM_CART, payload: id })
  }

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);
  
  const cartQuantity = cartItems.reduce(( quantity, item ) => item.quantity + quantity, 0)
  
  return (
    <ShoppingCartContex.Provider 
      value={{ 
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        openCart, closeCart,
        isOpen, cartItems,
        cartData, setCartData,
        isLoading, setIsLoading 
      }}
    >
      { children }
      <ShoppingCart isOpen={isOpen} />
      <FetchData />
    </ShoppingCartContex.Provider>
  )
}
