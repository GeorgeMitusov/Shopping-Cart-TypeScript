import React from "react";
import { Col, Row } from 'react-bootstrap';
import { StoreItem } from "../components/StoreItem";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Store() {

  const { cartData, searchFilter } = useShoppingCart();

  const arrCheck = searchFilter.length === 0 ? cartData : searchFilter;

  return (
    <>
      <h1> Store </h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {
          arrCheck.map( item => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))
        } 
      </Row>
    </>
  )
}