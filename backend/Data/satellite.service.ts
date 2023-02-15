import { faker } from '@faker-js/faker'
import { type ISatellite } from './satellite.interface'
import fs from 'fs'

export const createSatelliteDataJson = async (satellitesData: ISatellite[], filePath: string): Promise<void> => {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(satellitesData))
  } catch (error) {
    throw new Error('Failed to save satellites data.')
  }
}

export const fakeSatellitesData = async (filePath: string): Promise<void> => {
  const satellites: ISatellite[] = []
  const generatedIds = new Set()

  // Generate 10 satellite objects
  for (let i = 0; i < 10; i++) {
    let randomNumber = faker.datatype.number({ min: 100, max: 999 })
    let customId = `STL-${randomNumber}`

    // Generate a new random number if the current one has already been used
    while (generatedIds.has(customId)) {
      randomNumber = faker.datatype.number({ min: 100, max: 999 })
      customId = `STL-${randomNumber}`
    }
    const satellitesData: ISatellite = {
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      position: {
        latitude: parseInt(faker.address.latitude(90, -90, 4), 10),
        longitude: parseInt(faker.address.longitude(90, -90, 4), 10)
      },
      temperature: faker.datatype.number({ min: 10, max: 99 }),
      status: faker.datatype.boolean()
    }
    satellites.push(satellitesData)
  }

  await createSatelliteDataJson(satellites, filePath)
}
