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