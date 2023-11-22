import React, { createContext, ReactNode, useContext, useReducer, useState } from 'react';
import { cartReducer } from '../reducer/reducer';
import { CartItem } from '../components/CartItemModel';
import { ACTION_NAME } from '../actions/action-name';
import { ShoppingCart } from '../components/ShoppingCart';

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
  cartItems: CartItem[]
}

const ShoppingCartContex = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContex);
}

export function ShoppingCartProvider({ children } : ShoppingCartProviderProps) {

  const [ cartItems, dispatch ] = useReducer(cartReducer, [] as CartItem[]);
  const [ isOpen, setIsOpen ] = useState<boolean>(false);

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
        isOpen, cartItems
      }}
    >
      { children }
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContex.Provider>
  )
}








// import React, { createContext, ReactNode, useContext, useState } from 'react';
// import { ShoppingCart } from '../components/ShoppingCart';

// interface ShoppingCartProviderProps {
//   children: ReactNode
// } 

// interface CartItem {
//   id: number
//   quantity: number
// }

// interface ShoppingCartContex {
//   getItemQuantity: (id:number) => number
//   increaseCartQuantity: (id:number) => void
//   decreaseCartQuantity: (id:number) => void
//   removeFromCart: (id:number) => void
//   openCart: () => void
//   closeCart: () => void
//   cartQuantity: number
//   cartItems: CartItem[]
//   isOpen: Boolean
// }

// const ShoppingCartContex = createContext({} as ShoppingCartContex);

// export function useShoppingCart() {
//   return useContext(ShoppingCartContex); 
// }

// export function ShoppingCartProvider({ children }: 
//   ShoppingCartProviderProps) {

//   const [ cartItems, setCartItems ] = useState<CartItem[]> ([]);
//   const [ isOpen, setIsOpen ] = useState<Boolean> (false);

//   function getItemQuantity(id:number) {
//     return cartItems.find( item => item.id === id)?.quantity || 0 ;
//   }

//   function increaseCartQuantity(id:number) {
//     setCartItems( currItems => {
//       if ( currItems.find( item => item.id === id ) == null) {
//         return [ ...currItems, { id, quantity: 1 }]
//       } else {
//         return currItems.map( item => {
//           if ( item.id === id ) {
//             return { ...item, quantity: item.quantity + 1 }
//           } else {
//             return item;
//           }
//         })
//       }
//     })
//   }

//   function decreaseCartQuantity (id:number) {
//     setCartItems( currItems => {
//       if ( currItems.find( item => item.id === id )?.quantity === 1) {
//         return currItems.filter( item => item.id !== id )
//       } else {
//         return currItems.map( item => {
//           if ( item.id === id ) {
//             return { ...item, quantity: item.quantity - 1 }
//           } else {
//             return item;
//           }
//         })
//       }
//     })
//   }

//   function removeFromCart(id:number) {
//     setCartItems( currItems => {
//       return currItems.filter( item => item.id !== id ) 
//     })
//   }

//   const cartQuantity = cartItems.reduce(( quantity, item ) => item.quantity + quantity, 0);

//   const openCart = () => setIsOpen(true);
//   const closeCart = () => setIsOpen(false);

//   return (
//     <ShoppingCartContex.Provider 
//       value={{
//         getItemQuantity,
//         increaseCartQuantity,
//         decreaseCartQuantity,
//         removeFromCart,
//         openCart, closeCart,
//         cartItems, isOpen,
//         cartQuantity
//       }}
//     >
//       { children }
//       {/* <ShoppingCart isOpen={isOpen} /> */}
//     </ShoppingCartContex.Provider>
//   )
// }


