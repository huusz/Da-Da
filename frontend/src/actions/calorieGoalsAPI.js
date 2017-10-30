import * as types from './ActionTypes'
import { API_HOST } from '../config'

export const getCalorieGoalFromDB = date => {
  return dispatch => {
    dispatch({
      type: types.KCAL_GOALS_REQUEST,
    })
    fetch(`${API_HOST}/diary/kcal?date=${date}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${window
          .localStorage.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: types.KCAL_GOALS_SUCCESS,
          payload: data,
        })
      })
      .catch(error => {
        type: types.KCAL_GOALS_FAILED,
          console.error(error)
      })
  }
}
