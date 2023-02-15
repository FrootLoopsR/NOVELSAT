import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './Reducers'

export const satelliteStore = createStore(
  reducers,
  {},
  applyMiddleware(thunk)
)
