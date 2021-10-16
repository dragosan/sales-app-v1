import {
  CREATE_ITEMS_FAIL,
  CREATE_ITEMS_REQUEST,
  CREATE_ITEMS_SUCCESS,
  DELETE_ITEM_FAIL,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  GET_ITEMS_FAIL,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEM_FAIL,
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
} from "../actions/types"

export const getItemsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_ITEMS_REQUEST:
      return { loading: true }
    case GET_ITEMS_SUCCESS:
      return { loading: false, items: payload }
    case GET_ITEMS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const getItemReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_ITEM_REQUEST:
      return { loading: true }
    case GET_ITEM_SUCCESS:
      return { loading: false, item: payload }
    case GET_ITEM_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const searchItemsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_ITEMS_REQUEST:
      return { loading: true }
    case GET_ITEMS_SUCCESS:
      return { loading: false, _items: payload }
    case GET_ITEMS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const createItemsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_ITEMS_REQUEST:
      return { loading: true }
    case CREATE_ITEMS_SUCCESS:
      return { loading: false, success: true, item: payload }
    case CREATE_ITEMS_FAIL:
      return { loading: false, errors: payload }
    default:
      return state
  }
}

export const deleteItemReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case DELETE_ITEM_REQUEST:
      return { ...state, loading: true }
    case DELETE_ITEM_SUCCESS:
      return { loading: false, success: true }
    case DELETE_ITEM_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
