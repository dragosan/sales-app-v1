import {
  CREATE_VENDOR_FAIL,
  CREATE_VENDOR_REQUEST,
  CREATE_VENDOR_SUCCESS,
  DELETE_VENDOR_FAIL,
  DELETE_VENDOR_REQUEST,
  DELETE_VENDOR_SUCCESS,
  GET_USERS_FAIL,
  GET_VENDORS_REQUEST,
  GET_VENDORS_SUCCESS,
  GET_VENDOR_FAIL,
  GET_VENDOR_REQUEST,
  GET_VENDOR_SUCCESS,
} from "../actions/types"

export const getVendorsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_VENDORS_REQUEST:
      return { loading: true }
    case GET_VENDORS_SUCCESS:
      return { loading: false, vendors: payload }
    case GET_USERS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const getVendorReducer = (state = { vendor: {} }, { type, payload }) => {
  switch (type) {
    case GET_VENDOR_REQUEST:
      return { loading: true }
    case GET_VENDOR_SUCCESS:
      return { loading: false, vendor: payload }
    case GET_VENDOR_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const createVendorReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_VENDOR_REQUEST:
      return { loading: true }
    case CREATE_VENDOR_SUCCESS:
      return { loading: false, success: true, vendor: payload }
    case CREATE_VENDOR_FAIL:
      return { loading: false, errors: payload }
    default:
      return state
  }
}

export const deleteVendorReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case DELETE_VENDOR_REQUEST:
      return { ...state, loading: true }
    case DELETE_VENDOR_SUCCESS:
      return { loading: false, success: true }
    case DELETE_VENDOR_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
