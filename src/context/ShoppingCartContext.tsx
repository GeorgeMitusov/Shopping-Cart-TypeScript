import React, { createContext, ReactNode, useContext, useState } from 'react';

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
}

const ShoppingCartContex = createContext({} as ShoppingCartContex);

export function useShoppingCart() {
  return useContext(ShoppingCartContex); 
}

export function ShoppingCartProvider({ children }: 
  ShoppingCartProviderProps) {

  const [ cartItems, setCartItems ] = useState<CartItem[]> ([]);

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

  return (
    <ShoppingCartContex.Provider 
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart
      }}
    >
      { children }
    </ShoppingCartContex.Provider>
  )
}


