// A REDUCER FOR JUST PRODUCTS
// normally I would break cart out into it's own reducer as well

import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_TO_CART = "ADD_TO_CART";

export function getProducts() {
  return {
    type: GET_PRODUCTS,
    payload: axios
      .get("/api/products")
      .then(response => response.data)
      .catch(err => err)
  };
}

export function addToCart(id) {
  return {
    type: ADD_TO_CART,
    payload: axios
      .post(`/api/cart/${id}`)
      .then(response => response.data)
      .catch(err => err)
  };
}
const initialState = {
  products: [],
  cart: [],
  cartSize: 0,
  isLoading: false
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_PRODUCTS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_PRODUCTS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        products: action.payload
      };
    case `${ADD_TO_CART}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_TO_CART}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
        cartSize: Array.isArray(action.payload) ? action.payload.length : 0
      };
    default:
      return state;
  }
}
