import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import './cart.css';  

export const Cart = props => {

  const getCartItems = () => {
    if(!props.cartData || props.cartData.length<=0) {
      return <p className="cart-empty-msg">Oops your cart is empty!</p>
    }
    return(props.cartData.map(item =>(
    <li key={item.productId}>
      <img src={item.imageUrl} />
      <span className="name">{item.productName}</span>
      <span>Rs. {item.price}/item</span>
      <div className="quantity">
        <button disabled={item.quantityToBuy==1} onClick={()=>props.changeItemQuantity(item.productId, -1)}>-</button>
          <span>{item.quantityToBuy}</span>
        <button disabled={item.quantityToBuy==item.quantity} onClick={()=>props.changeItemQuantity(item.productId, 1)}>+</button>
      </div>
      <span className="total-price">{item.quantityToBuy}x{item.price}={item.quantityToBuy*item.price} Rs.</span>
      <button className="remove" onClick={()=>{props.deleteItemFromCart(item.productId)}}>Remove</button>
    </li>
  )))
};

  return (
    <div className="cart-container">
      <h3>Your cart</h3>
      <ul>
        { getCartItems() }
      </ul>
    </div>
  );
}

const mapStateToProps = state => ({
  cartData: state.cartReducer.cart || []
});


export default connect(mapStateToProps, { ...actions })(Cart) ;