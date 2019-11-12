import React from 'react';
import CartLink from './cart-link';
import { Link } from 'react-router-dom'
import './header.css';

export const Header = () => 
  <header className="app-header">
    <Link to="/">Home</Link>
    <CartLink />
  </header>

  export default Header;