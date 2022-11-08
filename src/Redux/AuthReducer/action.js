import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTRATION_FAILURE,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
} from "./actionType";

export const url = "https://masai-api-mocker.herokuapp.com";

export const login = (loginDetails) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post(`${url}/auth/login`, loginDetails)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOGIN_FAILURE });
    });
};

export const createAccount = (loginDetails) => (dispatch) => {
  
  dispatch({ type: REGISTRATION_REQUEST });
  return axios
    .post(`${url}/auth/register`, loginDetails)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: REGISTRATION_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: REGISTRATION_FAILURE });
    });
};

