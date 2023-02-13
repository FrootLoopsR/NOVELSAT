import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
const app = express()

app.use(cors())
app.get('/satellite', (req, res) => {
  res.send('Hello, World!')
})
app.post('/satellite', (req, res) => {
  res.send('Hello, World!')
})

app.get('/satellite/{id}', (req, res) => {
  res.send('Hello, World!')
})

app.put('/', (req, res) => {
  res.send('Hello, World!')
})

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
