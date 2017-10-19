import { combineReducers } from 'redux'
import { weigthListReducer } from './weightReducer/weight'
import authReducer from './authReducer/auth'
import navActiveItemReducer from './appReducer/navActiveItem'
import {
  shortLogReducer,
  longLogReducer,
} from './diaryReducer/diaryReview'
import todayDateReducer from './appReducer/todayDate'

const reducers = combineReducers({
  navActiveItem: navActiveItemReducer,
  today: todayDateReducer,
  auth: authReducer,
  weightList: weigthListReducer,
  shortLog: shortLogReducer,
  longLog: longLogReducer,
})

export default reducers
