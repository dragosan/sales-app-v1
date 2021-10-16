import axios from "axios"
import { GET_TYPES_FAIL, GET_TYPES_REQUEST, GET_TYPES_SUCCESS } from "./types"

export const getTypes = () => async (dispatch, getState) => {
  dispatch({
    type: GET_TYPES_REQUEST,
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

    const { data } = await axios.get(`/api/types`, config)

    dispatch({
      type: GET_TYPES_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_TYPES_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
