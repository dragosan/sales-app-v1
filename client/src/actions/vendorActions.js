import axios from "axios"
import {
  CREATE_VENDOR_FAIL,
  CREATE_VENDOR_REQUEST,
  CREATE_VENDOR_SUCCESS,
  DELETE_VENDOR_FAIL,
  DELETE_VENDOR_REQUEST,
  DELETE_VENDOR_SUCCESS,
  GET_VENDORS_FAIL,
  GET_VENDORS_REQUEST,
  GET_VENDORS_SUCCESS,
} from "./types"

export const getVendors = () => async (dispatch, getState) => {
  dispatch({
    type: GET_VENDORS_REQUEST,
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

    const { data } = await axios.get(`/api/vendors`, config)

    dispatch({
      type: GET_VENDORS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_VENDORS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const createVendor = (vendor) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_VENDOR_REQUEST,
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

    const { data } = await axios.post(`/api/vendors`, vendor, config)
    // console.log(data)
    if (data.errors) {
      dispatch({
        type: CREATE_VENDOR_FAIL,
        payload: data.errors,
      })
      return
    }

    dispatch({
      type: CREATE_VENDOR_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: CREATE_VENDOR_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const deleteVendor = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_VENDOR_REQUEST,
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

    await axios.delete(`/api/vendors/${id}`, config)

    dispatch({
      type: DELETE_VENDOR_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: DELETE_VENDOR_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
