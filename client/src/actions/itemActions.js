import axios from "axios"
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
  SEARCH_ITEMS_FAIL,
  SEARCH_ITEMS_REQUEST,
  SEARCH_ITEMS_SUCCESS,
} from "./types"

export const getItems = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ITEMS_REQUEST,
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

    const { data } = await axios.get(`/api/items`, config)

    dispatch({
      type: GET_ITEMS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_ITEMS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const getItem = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_ITEM_REQUEST,
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

    const { data } = await axios.get(`/api/items/${id}`, config)

    dispatch({
      type: GET_ITEM_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_ITEM_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const searchItems = (itemArticle) => async (dispatch, getState) => {
  dispatch({
    type: SEARCH_ITEMS_REQUEST,
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
    const { data } = await axios.post(`/api/items/search`, itemArticle, config)
    // console.log(data)
    dispatch({
      type: SEARCH_ITEMS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: SEARCH_ITEMS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const createItem = (item) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_ITEMS_REQUEST,
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

    const { data } = await axios.post(`/api/items`, item, config)
    // console.log(data)
    if (data.errors) {
      dispatch({
        type: CREATE_ITEMS_FAIL,
        payload: data.errors,
      })
      return
    }

    dispatch({
      type: CREATE_ITEMS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: CREATE_ITEMS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const deleteItem = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_ITEM_REQUEST,
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

    await axios.delete(`/api/items/${id}`, config)

    dispatch({
      type: DELETE_ITEM_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: DELETE_ITEM_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
