import * as actionTypes from "./Wishlist-types";

export const addToWishlist = (item) => {
  return {
    type: actionTypes.ADD_TO_WISHLIST,
    payload: {
      item: item,
    },
  };
};

export const removeFromWishlist = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_WISHLIST,
    payload: {
      id: itemID,
    },
  };
};
