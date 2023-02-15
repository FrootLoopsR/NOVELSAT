import { type Actions } from '../Action-Types'
import { type ISatellite } from '../../Interfaces'

interface IUpdateSatellite {
  type: Actions.UPDATE
  payload: ISatellite[]
}

interface IAddSatellite {
  type: Actions.ADD
  payload: ISatellite
}

interface IGetSatelliteById {
  type: Actions.GET_BY_ID
  payload: string
}

interface IGetSatelliteList {
  type: Actions.GET_LIST
  payload: ISatellite[]
}

export interface ISetErrorAction {
  type: Actions.SET_ERROR
  error: string
}

export type IAction = IUpdateSatellite | IAddSatellite | IGetSatelliteById | IGetSatelliteList | ISetErrorAction
