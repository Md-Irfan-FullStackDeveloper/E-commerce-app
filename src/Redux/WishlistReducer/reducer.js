import React from "react";
import {
  ADDTO_WISHLIST_FAILURE,
  ADDTO_WISHLIST_REQUEST,
  ADDTO_WISHLIST_SUCCESS,
  DELETE_WISHLIST_FAILURE,
  DELETE_WISHLIST_LOADING,
  DELETE_WISHLIST_SUCCESS,
  DUPLICATE,
} from "./actionType";

const initialState = {
  wishlistData: [],
  addToWishListLoading: false,
  addToWishListError: false,
  addToWishListSuccess: false,
  duplicate: false,

  deleteWishlistLoading: false,
  deleteWishlistSuccess: false,
  deleteWishlistError: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADDTO_WISHLIST_REQUEST:
      return {
        ...state,
        addToWishListLoading: true,
      };
    case ADDTO_WISHLIST_SUCCESS:
      return {
        ...state,
        addToWishListLoading: false,
        wishlistData: [...payload],
        addToWishListSuccess: true,
      };
    case ADDTO_WISHLIST_FAILURE:
      return {
        ...state,
        addToWishListError: true,
        addToWishListSuccess: false,
      };
    case DUPLICATE:
      return {
        ...state,
        duplicate: true,
        addToWishListSuccess: false,
      };
    case DELETE_WISHLIST_LOADING:
      return {
        ...state,
        deleteWishlistLoading: true,
      };
    case DELETE_WISHLIST_SUCCESS:
      return {
        ...state,
        deleteWishlistLoading: false,
        deleteWishlistSuccess: true,
        wishlistData: [...payload],
      };
    case DELETE_WISHLIST_FAILURE:
      return {
        ...state,
        deleteWishlistError: true,
        deleteWishlistSuccess: false,
      };
    default:
      return state;
  }
};

export { reducer };
