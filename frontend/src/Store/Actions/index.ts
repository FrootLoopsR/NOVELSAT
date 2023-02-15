import { type Actions } from '../Action-Types'
import { type ISatellite } from '../../Interfaces/satellite.interface'

interface IUpdateSatellite {
  type: Actions.UPDATE
  payload: string
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

export type IAction = IUpdateSatellite | IAddSatellite | IGetSatelliteById | IGetSatelliteList
