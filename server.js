require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes') // ✅ Importa rotas de auth
const jogoRoutes = require('./routes/jogoRoutes') // ✅ Importa rotas de jogos

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 Conectado ao MongoDB Atlas'))
  .catch(err => console.error('🔴 Erro ao conectar ao MongoDB', err))

// ✅ Rotas de autenticação (registro e login)
app.use('/auth', authRoutes)

// ✅ Rotas de jogos (algumas protegidas por token)
app.use('/', jogoRoutes)

app.listen(port, () => {
  console.log(` Servidor rodando na porta ${port}`)
})
