import React from "react"
import { Stack, Button } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatPrice } from "../utilities/formatPrice";
import { CartItem as CartItemProps } from '../interfaces/CartItemModel';

export function CartItem({ id, quantity } : CartItemProps) {

  const { removeFromCart, cartData, 
    decreaseCartQuantity, increaseCartQuantity } = useShoppingCart();

  const item = cartData.find( item => item.id === id );
  if ( item == null ) return null;
  
  function cartItemTitle() {
    const words = item?.title.split(" ");
    const shortTitle = words?.slice(0, 2).join(' ');
    return shortTitle;
  }  

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center"> 
      <img 
        src={item.image}
        style={{ width: '125px', height: '75px', objectFit: 'contain' }}
        alt={item.image}
      />

      <div className="me-auto">
        <div>
          {cartItemTitle()} 
          { quantity > 1 && <span className="text-muted" style={{ fontSize: '.65rem'}}> x{quantity} </span> }
        </div>
        <div className="text-muted" style={{ fontSize: '.75rem' }}>
          {formatPrice(item.price)}
        </div>
      </div>

      <div 
        className="d-flex align-items-center justify-content-center m-1" 
        style={{ gap: '.3rem' }}
      >
        <Button size="sm" variant="outline-primary" onClick={() => decreaseCartQuantity(id)}>-</Button>
          <span > {quantity} </span>
        <Button size="sm" variant="outline-primary" onClick={() => increaseCartQuantity(id)}>+</Button>
      </div>

      <div> 
        {formatPrice(item.price * quantity)} 
      </div>
      <Button variant='outline-danger' size="sm" onClick={() => removeFromCart(id)} >&times;</Button>

    </Stack>
  )
}