import axios from "axios"

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
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types"

export const login = (username, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  })
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(
      "/api/users/login",
      { username, password },
      config
    )
    // console.log(data)
    if (data.errors) {
      dispatch({
        type: LOGIN_FAIL,
        payload: data.errors,
      })
      return
    }

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (err) {
    localStorage.removeItem("userInfo")
    dispatch({
      type: LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const getUsers = () => async (dispatch, getState) => {
  dispatch({
    type: GET_USERS_REQUEST,
  })

  const {
    auth: { userInfo },
  } = getState()

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users`, config)

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_USERS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  })
}

export const createUser = (user) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_USER_REQUEST,
  })

  const {
    auth: { userInfo },
  } = getState()

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/users`, user, config)
    // console.log(data)
    if (data.errors) {
      dispatch({
        type: CREATE_USER_FAIL,
        payload: data.errors,
      })
      return
    }

    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_USER_REQUEST,
  })

  const {
    auth: { userInfo },
  } = getState()

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch({
      type: DELETE_USER_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
