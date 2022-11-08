import React from "react";
import {
  ADDTO_CART_REQUEST,
  ADDTO_CART_SUCCESS,
  DELETE_CARTITEM_REQUEST,
  DELETE_CARTITEM_SUCCESS,
  DUPLICATE,
} from "./actionType";

export const addToCart = (product) => (dispatch) => {
  dispatch({ type: ADDTO_CART_REQUEST });

  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const duplicate = cart.filter((el) => el.id === product.id);

  if (duplicate.length === 0) {
    const productToAdd = {
      ...product,
      count: 1,
    };

    cart.push(productToAdd);

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({ type: ADDTO_CART_SUCCESS, payload: cart });
  } else {
    dispatch({ type: DUPLICATE });
  }
};

export const deleteCartItem = (product) => (dispatch) => {

  dispatch({ type: DELETE_CARTITEM_REQUEST });

  let cart = JSON.parse(localStorage.getItem("cart"));
  cart = cart.filter((el) => el.id !== product.id);
  localStorage.setItem('cart', JSON.stringify(cart))

  dispatch({ type: DELETE_CARTITEM_SUCCESS, payload: cart});
};
