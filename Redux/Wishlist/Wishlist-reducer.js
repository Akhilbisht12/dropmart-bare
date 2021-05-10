import * as actionTypes from "./Wishlist-types";

const INITIAL_STATE = {
  wishlist: [],
};

const WishlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_WISHLIST:
      // creating item from payload
      const item = action.payload.item
      // Check if Item is in cart already
      const inCart = state.wishlist.find((item) =>
        item.id === action.payload.item.id ? true : false
      );

      return {
        ...state,
        wishlist: inCart
          ? state.wishlist.map((item) =>
              item.id === action.payload.item.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.wishlist, { ...item, qty: 1}],
      };
    case actionTypes.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default WishlistReducer;