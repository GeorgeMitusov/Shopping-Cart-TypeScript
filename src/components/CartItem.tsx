import React from "react"
import { Stack, Button } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from '../data/items.json';
import { formatPrice } from "../utilities/formatPrice";

interface CartItemProps {
  id: number
  quantity: number
}

export function CartItem({ id, quantity } : CartItemProps) {

  // const { removeFromCart } = useShoppingCart();
  // const item = storeItems.find( item => item.id === id );
  // if ( item == null ) return null;  

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center"> 
      <img 
        // src={item.imgUrl}
        style={{ width: '125px', height: '75px', objectFit: 'cover' }}
        src='item.imgUrl'
        alt='item.imgUrl'
        // alt={item.imgUrl}
      />


      <div className="me-auto">
        <div>
          {/* {item.name}  */}
          name 
          { quantity > 1 && <span className="text-muted" style={{ fontSize: '.65rem'}}> x{quantity} </span> }
        </div>
        <div className="text-muted" style={{ fontSize: '.75rem' }}>
          price
          {/* {formatPrice(item.price)} */}
        </div>
      </div>
      <div> 
        quantity
        {/* {formatPrice(item.price * quantity)}  */}
      </div>
      <Button variant='outline-danger' size="sm">&times;</Button>

    </Stack>
  )
}