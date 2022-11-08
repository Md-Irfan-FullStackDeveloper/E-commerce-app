import React from "react";
import {
  ADDTO_CART_FAILURE,
  ADDTO_CART_REQUEST,
  ADDTO_CART_SUCCESS,
  DELETE_CARTITEM_FAILURE,
  DELETE_CARTITEM_REQUEST,
  DELETE_CARTITEM_SUCCESS,
  DUPLICATE,
} from "./actionType";

const initialState = {
  cartData: [],
  addToCartLoading: false,
  addToCartError: false,
  addToCartSuccess: false,
  duplicate: false,

  deleteCartItemLoading: false,
  deleteCartItemSuccess: false,
  deleteCartItemError: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADDTO_CART_REQUEST:
      return {
        ...state,
        addToCartLoading: true,
      };
    case ADDTO_CART_SUCCESS:
      return {
        ...state,
        addToCartLoading: false,
        addToCartSuccess: true,
        cartData: [...payload],
      };
    case ADDTO_CART_FAILURE:
      return {
        ...state,
        addToCartError: true,
      };
    case DUPLICATE:
      return {
        ...state,
        duplicate: true,
      };
    case DELETE_CARTITEM_REQUEST:
      return {
        ...state,
        deleteCartItemLoading: true,
      };
    case DELETE_CARTITEM_SUCCESS:
      return {
        ...state,
        deleteCartItemLoading: false,
        deleteCartItemSuccess: true,
        cartData: [...payload]
      };
    case DELETE_CARTITEM_FAILURE:
      return {
        ...state,
        deleteCartItemError: true,
        deleteCartItemSuccess: false,
      };
    default:
      return state;
  }
};

export { reducer };
