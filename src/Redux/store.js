import {
  compose,
  legacy_createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { reducer as AppReducer } from "./AppReducer/reducer";
import { reducer as AuthReducer } from "./AuthReducer/reducer";
import { reducer as CartReducer } from "./CartReducer/reducer";
import { reducer as WishlistReducer } from './WishlistReducer/reducer'

const rootReducer = combineReducers({
  AppReducer,
  AuthReducer,
  CartReducer,
  WishlistReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
