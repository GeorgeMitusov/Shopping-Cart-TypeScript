import React from 'react';
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatPrice } from '../utilities/formatPrice';
import { CartItem } from './CartItem';

interface ShoppingCartProps {
  isOpen: Boolean
}

export function ShoppingCart({ isOpen } : ShoppingCartProps) {

  const { closeCart, cartItems, cartData, darkMode } = useShoppingCart();

  return (
    <Offcanvas 
      show={isOpen} 
      placement="end" 
      onHide={closeCart}
      className={`
        bg-${darkMode ? 'dark' : 'white'}
        ${darkMode ? 'text-light' : 'text-dark'}
      `}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title> Cart </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>

        <Stack gap={3}>
          { cartItems.length === 0 ? (<h3 className="text-muted"> Cart is empty. </h3>) : (
              cartItems.map( item => (
                <CartItem key={item.id} {...item} />
              ))
          )}
          <div className="ms-auto fw-bold fs-5">
            Total {" "}
            { formatPrice(
              cartItems.reduce(( total, cartItem) => {
                const item = cartData.find( item => item.id === cartItem.id);
                return total + ( item?.price || 0 ) * cartItem.quantity
              }, 0) 
            )}
          </div>
        </Stack>
      </Offcanvas.Body>

    </Offcanvas>
  )
}