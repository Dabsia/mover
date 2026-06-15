import { incrementHouseSize } from "../utils";
import { actionTypes } from "./actionTypes";

const initialState = {
  userMoveInfo: {},
  items: [],
  moreInfo: {},
  moversData: {},
  paymentSuccessful: false,
  houseSize: "",
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return {
        ...state,
        userMoveInfo: action.payload,
      };
    case actionTypes.SET_USER_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case actionTypes.SET_USER_MORE_INFO:
      return {
        ...state,
        moreInfo: action.payload,
      };
    case actionTypes.SET_MOVERS_DATA:
      return {
        ...state,
        moversData: action.payload,
      };
    case actionTypes.SET_HOUSE_SIZE:
      return {
        ...state,
        houseSize: action.payload,
      };
    case actionTypes.INCREMENT_HOUSE_SIZE: // Add this case
      return {
        ...state,
        houseSize: incrementHouseSize(state.houseSize),
      };
    case actionTypes.SET_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentSuccessful: true,
      };
    case actionTypes.RESET_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentSuccessful: false,
      };
    case actionTypes.RESET_MOVERS_DATA:
      return {
        ...state,
        moversData: {},
      };
    case actionTypes.RESET_USER_INFO:
      return {
        ...state,
        moreInfo: {},
        userMoveInfo: {},
        items: [],
      };
    default:
      return state;
  }
};

export default UserReducer;
