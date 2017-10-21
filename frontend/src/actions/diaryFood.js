import * as types from '../actions/ActionTypes'
import rootApi from '../config'

// 1. db 값 받는 action
export const getFoodLogsFromDB = date => {
  return dispatch => {
    fetch(`${rootApi}/eat-logs?date=${date}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${window
          .localStorage.token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: types.FETCHED_FOOD_LOGS_SUCCESS,
          payload: data,
        })
      })
      .catch(error => {
        console.log('fetchFoodLogsToDB error')
      })
  }
}

// 2. input에서 받은 값을 db로 보내는 action(post)
export const postFoodToDB = payload => {
  return dispatch => {
    // console.log(payload)
    fetch(`${rootApi}/eat-logs`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${window
          .localStorage.token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    }) // 원래는 응답값을 바로 추가했지만, 현재 칼로리 계산등을 백엔드에서 처리하므로 다시 fetch로 get하였다.
      .then(result => result.json())
      .then(result => {
        // console.log(result, '<<')
        if (result) {
          // console.log(payload.food_id)
          return fetch(
            `${rootApi}/eat-logs/${result[0]
              .eat_log_id}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${window
                  .localStorage.token}`,
              },
            },
          )
            .then(res => res.json())
            .then(data => {
              dispatch({
                type: types.POST_FOOD_TO_DATABASE,
                payload: data,
              })
            })
            .catch(error => {
              console.log(
                'fetchFoodLogsToDB error',
              )
            })
        }
      })
      .catch(error => {
        console.log('postFoodToDB error')
      })
  }
}

// 3. deleteFood
export const deleteFoodOfDB = id => {
  return dispatch => {
    fetch(`${rootApi}/eat-logs/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${window
          .localStorage.token}`,
      },
    })
      .then(result => {
        if (result) {
          // console.log(id)
          return dispatch({
            type: types.DELETE_FOOD_OF_DATABASE,
            payload: id,
          })
        }
      })
      .catch(error => {
        console.log('deleteFoodOfDB error')
      })
  }
}
