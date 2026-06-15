import { actionTypes } from "./actionTypes";

export const setUserDetails = (userFromAndToDetails) => ({
  type: actionTypes.SET_USER_INFO,
  payload: userFromAndToDetails,
});

export const setUserItems = (items) => ({
  type: actionTypes.SET_USER_ITEMS,
  payload: items,
});

export const setUserMoreInfo = (items) => ({
  type: actionTypes.SET_USER_MORE_INFO,
  payload: items,
});

export const setMoversData = (data) => ({
  type: actionTypes.SET_MOVERS_DATA,
  payload: data,
});

export const setHouseSize = (data) => ({
  type: actionTypes.SET_HOUSE_SIZE,
  payload: data,
});

export const incrementHouseSizeAction = () => ({
  type: actionTypes.INCREMENT_HOUSE_SIZE,
});

export const resetMoversInfo = () => ({
  type: actionTypes.RESET_MOVERS_DATA,
});

export const resetUserInfo = () => ({
  type: actionTypes.RESET_USER_INFO,
});

export const setPaymentStatus = () => ({
  type: actionTypes.SET_PAYMENT_SUCCESS,
});

export const resetPaymentStatus = () => ({
  type: actionTypes.RESET_PAYMENT_SUCCESS,
});
