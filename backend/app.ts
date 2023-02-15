import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ResponseMessages } from './Utils'
import { type ISatellite } from './Data'
import { addSatellite, getSatelliteById, getSatellitesData, updateSatelliteStatus } from './app.service'

const PREFIX = '/api/v1'

dotenv.config({ path: '.env.local' })
const app = express()
app.use(cors())

app.get(`${PREFIX}`, (req, res) => {
  res.status(401).json({ message: ResponseMessages.FORBIDDEN })
})
app.get(`${PREFIX}/satellites`, (req, res) => {
  getSatellitesData()
    .then((satellites) => {
      if (satellites) {
        return res.status(200).json(satellites)
      } else {
        return res.status(404).json({ message: ResponseMessages.GET_DATA_ERROR })
      }
    }
    )
    .catch(() => {
      res.status(500).json({ message: ResponseMessages.INTERNAL_SERVER_ERROR })
    })
})

app.post(`${PREFIX}/satellites`, (req, res) => {
  try {
    const newSatellite = req.body as ISatellite
    addSatellite(newSatellite).then(
      (satellite) => {
        res.status(200).json({ message: ResponseMessages.SUCCESS_ADD })
      }
    ).catch(() => {
      res.status(500).json({ message: ResponseMessages.INTERNAL_SERVER_ERROR })
    })
  } catch (error) {
    res.status(400).json({ message: ResponseMessages.FAIL_ADD })
  }
})

app.get(`${PREFIX}/satellites/:id`, (req, res) => {
  getSatelliteById(req.params.id)
    .then((satellite) => {
      if (satellite) {
        return res.status(200).json(satellite)
      } else {
        return res.status(404).json({ message: ResponseMessages.NOT_FOUND })
      }
    })
    .catch(() => {
      return res.status(500).json({ message: ResponseMessages.INTERNAL_SERVER_ERROR })
    })
})

app.put(`${PREFIX}/satellites/:id/status`, (req, res) => {
  const satelliteId = req.params.id
  updateSatelliteStatus(satelliteId).then(async () => {
    return await getSatellitesData().then((satellites) => {
      return res.status(200).json({ message: ResponseMessages.UPDATE_DATA_SUCCESS, updatedList: satellites })
    }).catch(() => {
      return res.status(500).json({ message: ResponseMessages.INTERNAL_SERVER_ERROR })
    })
  }).catch((error) => {
    if (error.message === ResponseMessages.NOT_FOUND) {
      return res.status(404).json({ message: ResponseMessages.UPDATE_DATA_ERROR })
    } else {
      return res.status(500).json({ message: ResponseMessages.INTERNAL_SERVER_ERROR })
    }
  })
})

const port = process.env.PORT || 3002
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
