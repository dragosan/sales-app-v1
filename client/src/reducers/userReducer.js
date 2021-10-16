import {
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../actions/types"

export const getUsersReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_USERS_REQUEST:
      return { loading: true }
    case GET_USERS_SUCCESS:
      return { loading: false, users: payload }
    case GET_USERS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const authReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { loading: true }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { loading: false, userInfo: payload }
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      console.log(state)
      return { loading: false, errors: payload }
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export const getUserReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case GET_USER_REQUEST:
      return { loading: true }
    case GET_USER_SUCCESS:
      return { loading: false, user: payload }
    case GET_USER_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const createUserReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_USER_REQUEST:
      return { loading: true }
    case CREATE_USER_SUCCESS:
      return { loading: false, success: true, user: payload }
    case CREATE_USER_FAIL:
      return { loading: false, errors: payload }
    default:
      return state
  }
}

export const deleteUserReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case DELETE_USER_REQUEST:
      return { ...state, loading: true }
    case DELETE_USER_SUCCESS:
      return { loading: false, success: true }
    case DELETE_USER_FAIL:
      return { loading: false, success: false, error: payload }
    default:
      return state
  }
}
