import React, { useState, useEffect } from 'react';
import {data} from '../../data/product-data';
import { connect } from 'react-redux';
import { addItemsToCart } from '../../store/actions';
import SelectedItems from './items-selected';

import './products.css'

export const Products = props => {
    const [selectedItems, setSelectedItemsState] = useState([]);
    const [products, setProductState] = useState([...data]);

    const updateSelectedStateOfItem = (inputItem, itemState) => {
        const items = [...products];
        for(let i=0; i<items.length; i++) {
            if(items[i].productId === inputItem.productId){
                items[i].isSelected = itemState;
                setProductState(items);
                break;
            }
        }
    }

    const resetSelectionState = () => {
        const items = [...products];
        for(let i=0; i<items.length; i++) {
            items[i].isSelected = false;
        }
        setProductState(items);
    }

    const addToSelectionList= (item, itemState) => {
        const items = selectedItems.concat([{...item, quantityToBuy: 1}]);
        setSelectedItemsState(items);
        updateSelectedStateOfItem(item, itemState);
    }

    const removeFromSelectionList = (unSelectedItem, itemState) =>{
        const items = selectedItems.filter(item => unSelectedItem.productId !== item.productId);
        setSelectedItemsState(items);
        updateSelectedStateOfItem(unSelectedItem, itemState);
    }
    const updateQuantity= (unSelectedItem, index, val) => {
        const items = [...selectedItems];
        const item = items[index];
        if(item.quantityToBuy+val<=0) {
            //remove item from selection list
            removeFromSelectionList(unSelectedItem, false);
            return;
        }
        items[index].quantityToBuy += val;
        setSelectedItemsState(items);
    }

    const getProducts = () => {
        return products.map((item, index) => <li key={item.productId} className="item">
            {!item.isSelected ?
                <i className="icon radio-unchecked" onClick={()=>addToSelectionList(item, true)}/>:
                <i className="icon radio-checked" onClick={()=>removeFromSelectionList(item, false)}/>
            }
            <img src={item.imageUrl} />
            <p>
                {item.productName}
            </p>
        </li>)
    }

    const addItemsToCart = () => {
        props.addItemsToCart(selectedItems);
        setSelectedItemsState([]);
        resetSelectionState();
    }

    return (
        <>
        <div className="products-container">
            <ul>
                {getProducts()}
            </ul>
        </div>
        <SelectedItems items={selectedItems} updateQuantity={updateQuantity} addToCart={addItemsToCart}/>
        </>
    )
}

const mapDispatchToProps = {
    addItemsToCart
}

export default connect(null, mapDispatchToProps)(Products);