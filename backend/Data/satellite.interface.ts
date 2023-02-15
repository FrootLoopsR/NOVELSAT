export interface ISatellite {
  id: string
  name: string
  position: {
    latitude: number
    longitude: number
  }
  temperature: number
  status: string
}
