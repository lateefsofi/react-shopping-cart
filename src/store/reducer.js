import * as actionTypes from './action-types';
import { getFromLocalStorage } from '../services/storage.service';

const initialState = {
    cart: getFromLocalStorage('cart') || []
}
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.ADD_TO_CART:
        return {
          ...state,
          cart: action.data
        }
      default:
        return state
    }
  }

  export default cartReducer;