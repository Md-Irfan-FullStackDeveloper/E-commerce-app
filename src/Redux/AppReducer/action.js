import axios from "axios";
import { useState } from "react";
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

export const url = "https://e-commmerce-api.onrender.com";

export const getData = (category, queryParams) => (dispatch) => {
  dispatch({ type: GET_DATA_REQUEST });

  return axios
    .get(`${url}${category}`, queryParams)
    .then((res) => {
      // console.log(res.data)
      dispatch({ type: GET_DATA_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_DATA_FAILURE });
    });
};

export const addProduct = (category, productdata) => (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST });
  return axios
    .post(`${url}${category}`, productdata)
    .then((res) => {
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data });
    })
    .then(() => dispatch(getData(category)))
    .catch((err) => {
      console.log(err);
      dispatch({ type: ADD_PRODUCT_FAILURE });
    });
};

export const deleteProduct = (category, id) => (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  return axios
    .delete(`${url}${category}/${id}`)
    .then(() => {
      dispatch({ type: DELETE_PRODUCT_SUCCESS });
    })
    .then(() => {
      dispatch(getData(category));
    })
    .catch((e) => {
      console.log(e);
      dispatch({ type: DELETE_PRODUCT_FAILURE });
    });
};

// export const addToCart = (productdata) => (dispatch) => {
//   dispatch({ type: ADDTOCART_REQUEST });
//   const [cartData, setCartData] = useState([]);

//   setCartData([...cartData, cartData]);

//   localStorage.setItem("cartData", JSON.stringify(cartData));
//   dispatch({ type: ADDTOCART_SUCCESS });
// };

// export const addToWishlist = (productdata) => (dispatch) => {
//   dispatch({ type: ADDTOWISHLIST_REQUEST });
//   return axios
//     .post(`${url}/WishList`, productdata)
//     .then(() => {
//       dispatch({ type: ADDTOWISHLIST_SUCCESS });
//     })
//     .catch((e) => {
//       dispatch({ type: ADDTOWISHLIST_FAILURE });
//     });
// };
