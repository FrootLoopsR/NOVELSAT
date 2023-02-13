import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ResponseMessages } from './utils'
import { getSatelliteById, getSatellitesData, updateSatellitesData, updateSatelliteStatus } from './app.service'

dotenv.config({ path: '.env.local' })
const app = express()

app.use(cors())
app.get('/', (req, res) => {
  res.status(404).json({ message: ResponseMessages.PAGE_NOT_FOUND })
})
app.get('/satellites', (req, res) => {
  getSatellitesData()
    .then((satellites) => {
      res.status(200).send(satellites)
    })
    .catch(error => {
      res.status(500).send({ message: error })
    })
})

app.post('/satellite', (req, res) => {
  res.send('Hello, World!')
})

app.get('/satellite/:id', (req, res) => {
  getSatelliteById(req.params.id)
    .then((satellite) => {
      if (satellite) {
        return res.status(200).json(satellite)
      } else {
        return res.status(404).json({
          message: 'Satellite not found'
        })
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: error
      })
    })
})

app.put('/satellite/:id/status', (req, res) => {
  getSatelliteById(req.params.id)
    .then(async satellite => {
      const updatedSatellite = updateSatelliteStatus(satellite)
      await getSatellitesData()
        .then(satellites => {
          updateSatellitesData([...satellites.filter((stl) => stl.id !== satellite.id), updatedSatellite])
          res.send(updatedSatellite)
        })
    })
    .catch(error => {
      res.status(404).send({ error })
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
