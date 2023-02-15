import { type Dispatch } from 'redux'
import axios from 'axios'
import { Actions } from '../Action-Types'
import { type IAction } from '../Actions'
import { type ISatellite } from '../../Interfaces'

export const updateSatellite = (satelliteId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/v1/satellites/${satelliteId}/status`)
      const satelliteList = response.data.updatedList

      dispatch({
        type: Actions.GET_LIST,
        payload: satelliteList
      })
    } catch (error) {
      console.error('Failed to get satellite list:', error)
    }
  }
}

export const addSatellite = (newSatellite: ISatellite) => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: Actions.ADD,
      payload: newSatellite
    })
  }
}

export const getSatelliteById = (satelliteId: string) => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: Actions.GET_BY_ID,
      payload: satelliteId
    })
  }
}

export const getSatelliteList = () => {
  return (dispatch: Dispatch<IAction>) => {
    axios.get('http://localhost:3001/api/v1/satellites').then((res) => {
      dispatch({
        type: Actions.GET_LIST,
        payload: res.data
      })
    }).catch(() => {
      dispatch({
        type: Actions.SET_ERROR,
        error: 'Failed to get satellite list.'
      })
    })
  }
}
