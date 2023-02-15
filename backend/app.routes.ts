import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ResponseMessages } from './Utils'
import { type ISatellite } from './Data'
import {
  addSatellite,
  getSatelliteById,
  getSatellitesData,
  updateSatellitesData,
  updateSatelliteStatus
} from './app.service'

const PREFIX = '/api/v1'

dotenv.config({ path: '.env.local' })
const app = express()

app.use(cors())
app.get(`/${PREFIX}`, (req, res) => {
  res.status(404).json({ message: ResponseMessages.FORBIDDEN })
})
app.get(`/${PREFIX}/satellites`, (req, res) => {
  getSatellitesData()
    .then((satellites) => {
      res.status(200).json(satellites)
    })
    .catch(error => {
      res.status(500).json({ message: error })
    })
})

app.post(`/${PREFIX}/satellites`, (req, res) => {
  try {
    const newSatellite = req.body as ISatellite
    addSatellite(newSatellite).then(
      (satellite) => {
        res.status(200).json({ message: ResponseMessages.SUCCESS_ADD })
      }
    ).catch((error) => {
      res.status(500).json({ message: error })
    })
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

app.get(`/${PREFIX}/satellites/:id`, (req, res) => {
  getSatelliteById(req.params.id)
    .then((satellite) => {
      if (satellite) {
        return res.status(200).json(satellite)
      } else {
        return res.status(404).json({ message: ResponseMessages.NOT_FOUND })
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: error
      })
    })
})

app.put(`/${PREFIX}/satellites/:id/status`, (req, res) => {
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
      res.status(404).json({ message: error })
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
