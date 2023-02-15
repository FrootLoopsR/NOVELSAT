import { combineReducers } from 'redux'
import satelliteReducer from './satellite.reducer'

export * from './satellite.reducer'
const reducers = combineReducers({
  satellite: satelliteReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>
