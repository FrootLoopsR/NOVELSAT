import { type ISatellite } from '../../Interfaces/satellite.interface'
import { Actions } from '../Action-Types'
import { type IAction } from '../Actions'

export interface IState {
  satelliteList: ISatellite[]
}

const initialState: IState = {
  satelliteList: []
}
export const satelliteReducer = (state: IState = initialState, action: IAction): IState | undefined => {
  switch (action.type) {
    case Actions.GET_LIST:
      return {
        ...state,
        satelliteList: action.payload
      }
  }
}
