import { type ISatellite } from '../../Interfaces'
import { Actions } from '../Action-Types'
import { type IAction } from '../Actions'

export interface IState {
  satelliteList: ISatellite[]
  error?: string
}

const initialState: IState = {
  satelliteList: [],
  error: ''
}
export const satelliteReducer = (state: IState = initialState, action: IAction): IState => {
  switch (action.type) {
    case Actions.GET_LIST:
      return {
        ...state,
        satelliteList: action.payload
      }
    case Actions.SET_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default satelliteReducer
