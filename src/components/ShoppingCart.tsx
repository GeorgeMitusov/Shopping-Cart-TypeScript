import React from 'react';
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from '../context/ShoppingCartContext';

interface ShoppingCartProps {
  isOpen: Boolean
}

export function ShoppingCart({ isOpen } : ShoppingCartProps) {

  const { closeCart } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>

      <Offcanvas.Header closeButton>
        <Offcanvas.Title> Cart </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Stack gap={3}>
          

          <div className="ms-auto fw-bold fs-5">
            
          </div>
        </Stack>
      </Offcanvas.Body>

    </Offcanvas>
  )
}