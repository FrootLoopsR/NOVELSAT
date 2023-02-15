import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import SatelliteReducers from './Reducers'

export const store = createStore(
  SatelliteReducers,
  {},
  applyMiddleware(thunk)
)
