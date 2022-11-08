import {
  ADDTO_WISHLIST_REQUEST,
  ADDTO_WISHLIST_SUCCESS,
  DELETE_WISHLIST_LOADING,
  DELETE_WISHLIST_SUCCESS,
  DUPLICATE,
} from "./actionType";

export const addToWishlist = (product) => (dispatch) => {
  dispatch({ type: ADDTO_WISHLIST_REQUEST });

  const wishlist = localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [];

  const duplicate = wishlist.filter((el) => el.id === product.id);

  if (duplicate.length === 0) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    dispatch({ type: ADDTO_WISHLIST_SUCCESS, payload: wishlist });
  } else {
    dispatch({ type: DUPLICATE });
  }
};

export const deleteWishlistItem = (product) => (dispatch) => {
  dispatch({ type: DELETE_WISHLIST_LOADING });

  let wishlist = JSON.parse(localStorage.getItem("wishlist"));
  wishlist = wishlist.filter((el) => el.id !== product.id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  dispatch({ type: DELETE_WISHLIST_SUCCESS, payload: wishlist });
};
