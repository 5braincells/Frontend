import authReducer from './authReducer'
import { combineReducers, createStore } from 'redux'

const rootReducer = combineReducers({
  jwt: authReducer,
})

export const store = createStore(rootReducer)
