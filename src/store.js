import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./ducks/userReducer";
import productReducer from "./ducks/productReducer";
// REDUX STORE
// TAKES IN REDUCER and MIDDLEWARES TO APPLY TO ACTIONS
// PROMISE MIDDLEWARE ENABLES ASYNC REDUX ACTIONS

// combineReducers allows us to have a reducer for each subject, encouraging a seperation of concerns
const store = createStore(
  combineReducers({ userReducer, productReducer }),
  applyMiddleware(promiseMiddleware())
);

export default store;
