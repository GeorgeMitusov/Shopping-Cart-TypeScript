import React from 'react';
import { Card } from 'react-bootstrap';
import { StarFill, Star } from 'react-bootstrap-icons';

type StarRatingProps = {
  rate: number
  count: number
}

export function StarRating({ rate, count } : StarRatingProps) {

  const maxRating = 5;
  const stars = [];

  for (let i = 0; i < maxRating; i++) {
    if (i < rate) {
      stars.push(<StarFill key={i} className="text-warning" />);
    } else {
      stars.push(<Star key={i} className="text-warning" />);
    }
  }

  return (
    <Card.Body className='d-flex align-content-center justify-content-between'>
      <span className='d-flex align-content-center'>
        <span className="d-flex align-items-center">{stars}</span>
        <span className="text-muted ms-2"> - {rate}</span> 
      </span>
      <span> Rate: <span className="text-muted ms-1"> {count} </span></span>
    </Card.Body>
  );
}










