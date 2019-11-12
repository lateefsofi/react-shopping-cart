import React from 'react';
import './selected-items.css';

export const SelectedItems = props => {
  const { items, updateQuantity, addToCart } = props;
  const getItems = ()=>items.map((item, index )=> 
    <li key={`selected-items-${item.productId}`} className="selected-item">
      <img src={item.imageUrl} />
      <div className="add-quantity">
        <button onClick={()=>updateQuantity(item, index, -1)}>-</button>
        {item.quantityToBuy}
        <button disabled={item.quantityToBuy==item.quantity} onClick={()=>updateQuantity(item, index, 1)}>+</button>
      </div>
    </li>);
    
  return (
    <>
      {items && items.length>0 ?
        (<div className="selected-items-container">
          <ul>
            {getItems()}
          </ul>
          <button className="add-to-cart" onClick={addToCart}>Add to Cart</button>
        </div>) : null    
      }
    </>
  )
}

export default SelectedItems;