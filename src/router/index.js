import React from 'react';
import { Route } from "react-router-dom";
import Products from "../pages/products";
import Cart from "../pages/cart";

export const AppRoutes = () => {
  return (
    <>
      <Route exact path="/" component={Products}/>
      <Route exact path="/cart" component={Cart}/>
    </>
  )
}

export default AppRoutes;