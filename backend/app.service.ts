import fs from 'fs'
import { fakeSatellitesData, type ISatellite } from './Data'
import { ResponseMessages } from './Utils'

export const getSatellitesData = async (): Promise<ISatellite[]> => {
  const filePath: string = './Data/satellites.json'
  try {
    if (!fs.existsSync(filePath)) {
      await fakeSatellitesData(filePath)
    }
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    throw new Error()
  }
}

export const getSatelliteById = async (satelliteId: string): Promise<ISatellite> => {
  const satellites = await getSatellitesData()
  const satellite = satellites.find((stl) => stl.id === satelliteId)

  if (satellite) {
    return satellite
  } else {
    throw new Error()
  }
}

export const updateSatelliteStatus = async (satelliteId: string): Promise<void> => {
  try {
    const satellites = await getSatellitesData()

    const updatedSatellites = satellites.map((satellite) => {
      if (satellite.id === satelliteId) {
        return {
          ...satellite,
          status: !satellite.status
        }
      } else {
        return satellite
      }
    })

    updateSatellitesData(updatedSatellites)
  } catch (error) {
    throw new Error()
  }
}

export const updateSatellitesData = (satellites: ISatellite[]): void => {
  try {
    fs.writeFileSync('./Data/satellites.json', JSON.stringify(satellites), 'utf-8')
  } catch (error) {
    throw new Error(ResponseMessages.NOT_FOUND)
  }
}

export const addSatellite = async (newSatellite: ISatellite): Promise<void> => {
  const existingSatellite = await getSatelliteById(newSatellite.id)
  if (existingSatellite) {
    throw new Error()
  }
  const satellites = await getSatellitesData()
  updateSatellitesData([...satellites, newSatellite])
}
