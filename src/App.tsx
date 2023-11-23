import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Store } from './pages/Store';

import './style/App.css';

import { ShoppingCartProvider, useShoppingCart } from './context/ShoppingCartContext';

function App() {

  return (
    <ShoppingCartProvider>
      <AppContent />
    </ShoppingCartProvider>
  );
}

function AppContent() {

  const { darkMode } = useShoppingCart();

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Navbar />
      <Container className='mb-3'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;