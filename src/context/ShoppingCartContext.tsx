import React, { createContext, ReactNode, useContext, useState } from 'react';
import { ShoppingCart } from '../components/ShoppingCart';

interface ShoppingCartProviderProps {
  children: ReactNode
} 

interface CartItem {
  id: number
  quantity: number
}

interface ShoppingCartContex {
  getItemQuantity: (id:number) => number
  increaseCartQuantity: (id:number) => void
  decreaseCartQuantity: (id:number) => void
  removeFromCart: (id:number) => void
  openCart: () => void
  closeCart: () => void
  cartQuantity: number
  cartItems: CartItem[]
  isOpen: Boolean
}

const ShoppingCartContex = createContext({} as ShoppingCartContex);

export function useShoppingCart() {
  return useContext(ShoppingCartContex); 
}

export function ShoppingCartProvider({ children }: 
  ShoppingCartProviderProps) {

  const [ cartItems, setCartItems ] = useState<CartItem[]> ([]);
  const [ isOpen, setIsOpen ] = useState<Boolean> (false);

  function getItemQuantity(id:number) {
    return cartItems.find( item => item.id === id)?.quantity || 0 ;
  }

  function increaseCartQuantity(id:number) {
    setCartItems( currItems => {
      if ( currItems.find( item => item.id === id ) == null) {
        return [ ...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map( item => {
          if ( item.id === id ) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item;
          }
        })
      }
    })
  }

  function decreaseCartQuantity (id:number) {
    setCartItems( currItems => {
      if ( currItems.find( item => item.id === id )?.quantity === 1) {
        return currItems.filter( item => item.id !== id )
      } else {
        return currItems.map( item => {
          if ( item.id === id ) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item;
          }
        })
      }
    })
  }

  function removeFromCart(id:number) {
    setCartItems( currItems => {
      return currItems.filter( item => item.id !== id ) 
    })
  }

  const cartQuantity = cartItems.reduce(( quantity, item ) => item.quantity + quantity, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <ShoppingCartContex.Provider 
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart, closeCart,
        cartItems, isOpen,
        cartQuantity
      }}
    >
      { children }
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContex.Provider>
  )
}


