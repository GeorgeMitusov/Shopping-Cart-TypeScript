import React, { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatPrice } from "../utilities/formatPrice";
import { CartDataModel } from "../interfaces/CartDataModel";
import { Tooltip, OverlayTrigger, Button, Collapse, Card } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';
import { StarRating } from "./StarRating";

export function StoreItem({ id, title, description, price, image, rating } : CartDataModel ) {

  const [ openItem, setOpenItem ] = useState<number | null>(null);

  const { getItemQuantity, increaseCartQuantity, 
    decreaseCartQuantity, removeFromCart } = useShoppingCart();

  const quantity = getItemQuantity(id);

  const infoTooltip = (
    <Tooltip id="tooltip-top">
      Info
    </Tooltip>
  );

  const renderTitle = () => {
    const words = title.split(' ');

    const titleTooltip = (
      <Tooltip id="tooltip-top">
        { title }
      </Tooltip>
    );
  
    if (words.length > 3) { 
      const shortTitle = words.slice(0, 3).join(' ');
      return (
        <>
          <OverlayTrigger placement="top" overlay={titleTooltip}>
            <span className="fs-3" style={{ cursor: 'pointer' }}>
              {shortTitle}...
            </span>
          </OverlayTrigger>
        </>
      );
    } else {
      return (
        <span className="fs-3" style={{ cursor: 'pointer' }}>
          {title}
        </span>
      );
    }
  };

  const toggleOpen = (itemId: number) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={image}
        className="rounded mt-4"
        height="250px"
        style={{ objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-2 mt-2">
          {renderTitle()}

          <OverlayTrigger placement="top" overlay={infoTooltip}>
            <span 
              style={{ cursor: 'pointer' }}
              onClick={() => toggleOpen(id)}
              aria-controls="example-collapse-text"
              aria-expanded={openItem === id}
            >
              <InfoCircle size={16} color="blue" />
            </span>
          </OverlayTrigger>

          <span className="ms-2 text-muted"> {formatPrice(price)} </span>
        </Card.Title>

        <Card.Text>
          <Collapse in={openItem === id}>
            <div>
                <div id={`example-collapse-text-${id}`} className="p-1 mt-3">
                  { description }
                </div>
                <StarRating rate={rating.rate} count={rating.count} />
            </div>
            </Collapse>
        </Card.Text>

        <div className="mt-auto">
          { quantity === 0 ? (
              <Button className="w-100 mb-2" onClick={() => increaseCartQuantity(id)}> Add </Button>
            ) : (
              <div 
                className="d-flex align-items-center flex-column" 
                style={{ gap: '.5rem'}}
              >
                <div 
                  className="d-flex align-items-center justify-content-center" 
                  style={{ gap: '.5rem' }}
                >
                  <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                  <div>
                    <span className="fs-3"> {quantity} </span>
                    in cart
                  </div>
                  <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                </div>
                <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}> remove </Button>
              </div>
            )}
        
        </div>
      </Card.Body>
    </Card>
  )
}