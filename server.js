require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes') 
const jogoRoutes = require('./routes/jogoRoutes') 

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 Conectado ao MongoDB Atlas'))
  .catch(err => console.error('🔴 Erro ao conectar ao MongoDB', err))


app.use('/auth', authRoutes)


app.use('/', jogoRoutes)

app.listen(port, () => {
  console.log(` Servidor rodando na porta ${port}`)
})
