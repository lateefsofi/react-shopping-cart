import React from 'react';
import './cart-link.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

export const CartLink = (props) => {
    const history = useHistory();
    const navigate= ()=>{
        history.push('/cart')
    }
    return (<button className="cart-btn" onClick={navigate}>
         Cart
        {` ${props.itemsInCart.length}`} 
         <i className="icon cart" />
    </button>);
} 

const mapStateToProps = state =>({
    itemsInCart: state.cartReducer.cart  
})

export default connect(mapStateToProps)(CartLink);