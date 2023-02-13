import fs from 'fs'
import { ResponseMessages } from './utils'
import { type ISatellite } from './data'

export const getSatellitesData = async (): Promise<ISatellite[]> => {
  try {
    const data = fs.readFileSync('satellites.json', 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    throw new Error(ResponseMessages.GET_DATA_ERROR)
  }
}

export const getSatelliteById = async (satelliteId: string): Promise<ISatellite> => {
  const satellites = await getSatellitesData()
  const satellite = satellites.find((stl) => stl.id === satelliteId)

  if (satellite) {
    return satellite
  } else {
    throw new Error(ResponseMessages.NOT_FOUND)
  }
}

export const updateSatelliteStatus = (satellite: ISatellite): ISatellite => {
  return {
    ...satellite,
    status: satellite.status === 'active' ? 'inactive' : 'active'
  }
}

export const updateSatellitesData = (satellites: ISatellite[]): void => {
  try {
    fs.writeFileSync('satellites.json', JSON.stringify(satellites), 'utf-8')
  } catch (error) {
    throw new Error(ResponseMessages.UPDATE_DATA_ERROR)
  }
}

export const addSatellite = async (newSatellite: ISatellite): Promise<void> => {
  const existingSatellite = await getSatelliteById(newSatellite.id)
  if (existingSatellite) {
    throw new Error(`Satellite "${newSatellite.id}" ${ResponseMessages.SATELLITE_ALREADY_EXISTS}`)
  }
  const satellites = await getSatellitesData()
  updateSatellitesData([...satellites, newSatellite])
}
