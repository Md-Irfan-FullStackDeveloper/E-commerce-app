import React from "react";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTRATION_FAILURE,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  SIGNOUT,
} from "./actionType";

const initialState = {
  token: "",
  isLoading: false,
  isError: false,
  isAdminAuth: false,
  isCreated: false,
  isCreatedError: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAdminAuth: true,
        token: payload,
        isError: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isError: true,
        isAdminAuth: false,
        isLoading: false,
      };
    case REGISTRATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isCreated: true,
      };
    case REGISTRATION_FAILURE:
      return {
        ...state,
        isCreatedError: true,
        isLoading: false,
      };
    case SIGNOUT:
      return {
        ...state,
        isAdminAuth: false,
        isCreated: false,
        token: "",
      };

    default:
      return state;
  }
};

export { reducer };
