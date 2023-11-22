import React from "react";
import { Container } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Home() {

  const { cartData, isLoading } = useShoppingCart();

  return (
    <Container>
      <h1> Home </h1> 

    </Container>
  )
}