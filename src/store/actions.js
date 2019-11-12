    import { ADD_TO_CART } from './action-types';
    import { addToLocalStorage } from '../services/storage.service';


    export const addItemsToCart = (data) => {
        const selectedItemsObj = {};
        data.forEach(element => {
            selectedItemsObj[element.productId] = element;
        });
        return (dispatch, getState)=>{
            let cartItems = [...getState().cartReducer.cart];
            for(let i=0; i<cartItems.length; i++) {
                if(selectedItemsObj[cartItems[i].productId] ) {
                    cartItems[i] = {...selectedItemsObj[cartItems[i].productId]};
                    delete selectedItemsObj[cartItems[i].productId];
                }
            }
            const distinctData =  Object.keys(selectedItemsObj).map(key=>selectedItemsObj[key]);
            cartItems = [...cartItems, ...distinctData];
            addToLocalStorage('cart', cartItems);
            dispatch({
                type: ADD_TO_CART,
                data: [...cartItems]
            })
        }
    }

    export const deleteItemFromCart = (productId) => {
        return function(dispatch, getState) {
            const cartItems = [...getState().cartReducer.cart].filter(item => item.productId != productId);
            addToLocalStorage('cart', cartItems);
            dispatch({
                type: ADD_TO_CART,
                data: [...cartItems]
            })
        }
    }

    export const changeItemQuantity = (productId, val) => {
        return function(dispatch, getState) {
            const cartItems = [...getState().cartReducer.cart]
            for(let i=0; i<cartItems.length; i++) {
                if(cartItems[i].productId === productId) {
                    cartItems[i].quantityToBuy += val;
                    break;
                }
            }
            addToLocalStorage('cart', cartItems);
            dispatch({
                type: ADD_TO_CART,
                data: [...cartItems]
            })
        }
    }