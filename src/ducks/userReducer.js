import axios from "axios";

// CONSTANTS (ACTION TYPES)
const GET_USER = "GET_USER";

// ACTION CREATORS
export function getUser() {
  return {
    type: GET_USER,
    payload: axios
      .get("/api/me")
      .then(response => {
        return response.data;
      })
      .catch(err => err)
  };
}

// INITIAL STATE
const initialState = {
  user: {},
  isLoading: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    // USING OBJECT REST SPREAD TO CREATE NEW STATE
    // IF USING OBJ.ASSIGN Object.assign({}, state, { isLoading: true });

    // WAITING FOR RESPONSE
    case `${GET_USER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    // RECEIVED RESPONSE
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        user: action.payload
      };

    default:
      return state;
  }
}
