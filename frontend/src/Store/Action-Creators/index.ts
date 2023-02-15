import { type Dispatch } from 'redux'
import axios from 'axios'
import { Actions } from '../Action-Types'
import { type IAction } from '../Actions'
import { type ISatellite } from '../../Interfaces/satellite.interface'

export const updateSatellite = (satelliteId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('/api/v1/satellites') // Replace with your API endpoint
      const satelliteList = response.data // Assuming the API returns the satellite list as an array

      dispatch({
        type: Actions.GET_LIST,
        payload: satelliteList
      })
    } catch (error) {
      console.error('Failed to get satellite list:', error)
      // You can dispatch an error action here if needed
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
    try {
      let satelliteList: ISatellite[]
      axios.get('/api/satellites').then((res) => {
        satelliteList = res.data
        dispatch({
          type: Actions.GET_LIST,
          payload: satelliteList
        })
      }
      ).catch((error) => {
        throw new Error(error)
      }) // Replace with your API endpoint
      // Assuming the API returns the satellite list as an array
    } catch (error) {
      console.error('Failed to get satellite list:', error)
      // You can dispatch an error action here if needed
    }
  }
}
