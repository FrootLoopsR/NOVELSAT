import { combineReducers } from 'redux'
import { satelliteReducer } from './satellite.reducer'

export type { IState } from './satellite.reducer'
export const SatelliteReducers = combineReducers({
  satellite: satelliteReducer
})

export default SatelliteReducers

export type RootState = ReturnType<typeof SatelliteReducers>
