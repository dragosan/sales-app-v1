import axios from "axios"
import {
  GET_CATEGS_FAIL,
  GET_CATEGS_REQUEST,
  GET_CATEGS_SUCCESS,
} from "./types"

export const getCategs = () => async (dispatch, getState) => {
  dispatch({
    type: GET_CATEGS_REQUEST,
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

    const { data } = await axios.get(`/api/categs`, config)

    dispatch({
      type: GET_CATEGS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_CATEGS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
