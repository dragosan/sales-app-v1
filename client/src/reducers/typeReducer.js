import {
  GET_TYPES_FAIL,
  GET_TYPES_REQUEST,
  GET_TYPES_SUCCESS,
} from "../actions/types"

export const getTypesReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_TYPES_REQUEST:
      return { loading: true }
    case GET_TYPES_SUCCESS:
      return { loading: false, types: payload }
    case GET_TYPES_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
