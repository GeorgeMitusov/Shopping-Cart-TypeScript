import { useEffect } from "react"
import { useShoppingCart } from "../context/ShoppingCartContext";

export function FetchData() {

  const { setCartData, setIsLoading } = useShoppingCart();

  useEffect(() => {

    const getAllProducts = async () => {

        setIsLoading(true);

        const productsFromServer = await fetchAllProducts();
        
        setCartData(productsFromServer);

        setIsLoading(false);
    }

    getAllProducts();
  
}, [])

  const fetchAllProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');

    const data = await res.json();

    return data;
  }

  return null;
}