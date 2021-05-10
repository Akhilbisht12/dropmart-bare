import * as actionTypes from "./Cart-Types";

const INITIAL_STATE = {
  cart: [],
};

const CartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // creating item from payload
      const item = action.payload.item
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.item.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.item.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1, final_price : item.price }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case actionTypes.ADJUST_ITEM_MARGIN :
      return {
        ...state,
        cart : state.cart.map((item)=>
          item.id === action.payload.id
          ? {...item, final_price : action.payload.finalPrice}
          : item
        )
      }
    default:
      return state;
  }
};

export default CartReducer;