import React, { createContext, ReactNode, useContext, useReducer, useState, useEffect } from 'react';
import { cartReducer } from '../reducer/reducer';
import { CartItem } from '../interfaces/CartItemModel';
import { CartDataModel } from '../interfaces/CartDataModel';
import { ACTION_NAME } from '../actions/action-name';
import { ShoppingCart } from '../components/ShoppingCart';
import { FetchData } from '../data/FetchData';
import { useLocalStorage } from '../hooks/useLocalStorage';

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
  toggleTheme: () => void
  toggleSearch: () => void
  cartQuantity: number
  isOpen: boolean
  isLoading: boolean
  isSearch: boolean
  darkMode: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  cartItems: CartItem[]
  items: CartItem[]
  cartData: CartDataModel[]
  setCartData: React.Dispatch<React.SetStateAction<CartDataModel[]>>;
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  searchData: CartDataModel[]
  setSearchData: React.Dispatch<React.SetStateAction<CartDataModel[]>>;
  searchFilter: CartDataModel[]
}

const ShoppingCartContex = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContex);
}

export function ShoppingCartProvider({ children } : ShoppingCartProviderProps) {

  const [ cartItems, setCartItems ] = useLocalStorage<CartItem[]>('shopping-cart', [] as CartItem[]);
  const [ cartData, setCartData ] = useState<CartDataModel[]>([]);
  const [ searchData, setSearchData ] = useState<CartDataModel[]>([]);
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ darkMode, setDarkMode ] = useLocalStorage<boolean>('dark-mode', false);
  const [ isSearch, setIsSearch ] = useState<boolean>(false);
  const [ searchValue, setSearchValue ] = useState<string>('');
  const [ items, dispatch ] = useReducer(cartReducer, cartItems);

  const { INCREASE_QUANTITY, DECREASE_QUANTITY, REMOVE_FROM_CART } = ACTION_NAME;

  function getItemQuantity(id: number) {
    return items.find( item => item.id === id)?.quantity || 0;
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

  const searchFilter = cartData.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);
  
  const cartQuantity = items.reduce(( quantity, item ) => item.quantity + quantity, 0)

  const toggleTheme = () => setDarkMode(!darkMode);

  const toggleSearch = () => setIsSearch(!isSearch);

  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(items));
  }, [items]);
  
  return (
    <ShoppingCartContex.Provider 
      value={{ 
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart, items,
        cartQuantity, isSearch,
        openCart, closeCart,
        isOpen, cartItems,
        cartData, setCartData,
        isLoading, setIsLoading,
        toggleTheme, darkMode,
        toggleSearch, searchValue,
        setSearchValue, searchData,
        setSearchData, searchFilter
      }}
    >
      { children }
      <ShoppingCart isOpen={isOpen} />
      <FetchData />
    </ShoppingCartContex.Provider>
  )
}