const express = require('express')
const router = express.Router()
const jogoController = require('../controllers/jogoController')
const { authorized } = require('../services/security')

// Rotas públicas
router.get('/', jogoController.listarJogos)
router.get('/search', jogoController.buscarJogos)

// Rotas protegidas
router.post('/', authorized, jogoController.criarJogo)
router.put('/:id', authorized, jogoController.atualizarJogo)
router.delete('/:id', authorized, jogoController.deletarJogo)

module.exports = router
