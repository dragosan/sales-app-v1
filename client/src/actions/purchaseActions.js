import axios from "axios"
import {
  CREATE_PURCHASE_FAIL,
  CREATE_PURCHASE_REQUEST,
  CREATE_PURCHASE_SUCCESS,
} from "./types"

export const createPurchase = (purchase) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_PURCHASE_REQUEST,
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

    const { data } = await axios.post(`/api/purchases`, purchase, config)
    // console.log(data)
    if (data.errors) {
      dispatch({
        type: CREATE_PURCHASE_FAIL,
        payload: data.errors,
      })
      return
    }

    dispatch({
      type: CREATE_PURCHASE_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: CREATE_PURCHASE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
