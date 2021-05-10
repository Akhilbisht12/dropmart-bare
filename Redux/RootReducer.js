import { combineReducers } from "redux";

import CartReducer from "./Cart/Cart-Reducer";
import UserReducer from './User/User-Reducer';
import WishlistReducer from './Wishlist/Wishlist-reducer'
const RootReducer = combineReducers({
  cart: CartReducer,
  user : UserReducer,
  wishlist : WishlistReducer
});

export default RootReducer;