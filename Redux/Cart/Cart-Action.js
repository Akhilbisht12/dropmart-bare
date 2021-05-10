import * as actionTypes from "./Cart-Types";

export const addToCart = (item) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      item: item,
    },
  };
};

export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};

export const adjustItemQty = (itemID, qty) => {
  return {
    type: actionTypes.ADJUST_ITEM_QTY,
    payload: {
      id: itemID,
      qty,
    },
  };
};

export const adjustItemMargin = (itemID, finalPrice) => {
  return {
      type : actionTypes.ADJUST_ITEM_MARGIN,
      payload : {
        id : itemID,
        finalPrice
      }
  }
}