import React from "react";
import {
  ADDTOCART_FAILURE,
  ADDTOCART_REQUEST,
  ADDTOCART_REQUST,
  ADDTOCART_SUCCESS,
  ADDTOWISHLIST_FAILURE,
  ADDTOWISHLIST_REQUEST,
  ADDTOWISHLIST_SUCCESS,
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_DATA_FAILURE,
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
} from "./actionType";

const initialState = {
  data: [],
  cartData: [],
  wishListData: [],
  isLoading: false,
  isError: false,

  addProductLoading: false,
  addProductError: false,
  addProductSuccess: false,

  deleteProductLoading: false,
  deleteProductError: false,
  deleteProductSuccess: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: [...payload],
      };

    case GET_DATA_FAILURE:
      return {
        ...state,
        isError: true,
      };

    case ADD_PRODUCT_REQUEST:
      return {
        ...state,
        addProductLoading: true,
        addProductError: false,
      };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        addProductLoading: false,
        addProductError: false,
        addProductSuccess: true,
      };

    case ADD_PRODUCT_FAILURE:
      return {
        ...state,
        addProductLoading: false,
        addProductError: true,
      };

    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        deleteProductLoading: true,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleteProductLoading: false,
        deleteProductSuccess: true,
      };

    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        deleteProductError: true,
        deleteProductSuccess: false,
      };
    default:
      return state;
  }
};

export { reducer };
