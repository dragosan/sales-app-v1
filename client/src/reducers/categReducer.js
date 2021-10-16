import {
  GET_CATEGS_FAIL,
  GET_CATEGS_REQUEST,
  GET_CATEGS_SUCCESS,
} from "../actions/types"

export const getCategsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_CATEGS_REQUEST:
      return { loading: true }
    case GET_CATEGS_SUCCESS:
      return { loading: false, categs: payload }
    case GET_CATEGS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
