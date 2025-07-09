const mongoose = require('mongoose')

const JogoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  categoria: { type: String, required: true },
  plataformas: [{ type: String }],
  preco: { type: Number, required: true }
})

module.exports = mongoose.model('Jogo', JogoSchema)
