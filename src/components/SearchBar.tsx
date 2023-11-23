import React from 'react';
import { Form } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';

export function SearchBar() {

  const { searchValue, setSearchValue } = useShoppingCart();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  return (
    <Form className='me-2'>
      <Form.Control 
        type="text" 
        placeholder="Search"
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
      />
    </Form>
  ) 
}