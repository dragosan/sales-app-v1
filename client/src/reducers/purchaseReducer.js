import {
  CREATE_PURCHASE_FAIL,
  CREATE_PURCHASE_REQUEST,
  CREATE_PURCHASE_SUCCESS,
  GET_PURCHASES_FAIL,
  GET_PURCHASES_REQUEST,
  GET_PURCHASES_SUCCESS,
} from "../actions/types"

export const getPurchasesReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_PURCHASES_REQUEST:
      return { loading: true }
    case GET_PURCHASES_SUCCESS:
      return { loading: false, purchases: payload }
    case GET_PURCHASES_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const createPurchaseReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_PURCHASE_REQUEST:
      return { loading: true }
    case CREATE_PURCHASE_SUCCESS:
      return { loading: false, purchase: payload }
    case CREATE_PURCHASE_FAIL:
      return { loading: false, errors: payload }
    default:
      return state
  }
}
