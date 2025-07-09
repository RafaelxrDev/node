const Jogo = require('../models/Jogo')

// Listar todos os jogos
exports.listarJogos = async (req, res) => {
  try {
    const jogos = await Jogo.find()
    res.json(jogos)
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar jogos' })
  }
}

// Criar um novo jogo
exports.criarJogo = async (req, res) => {
  try {
    const { titulo, categoria, plataformas, preco } = req.body
    const novoJogo = new Jogo({ titulo, categoria, plataformas, preco })
    const jogoSalvo = await novoJogo.save()
    res.status(201).json(jogoSalvo)
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar jogo' })
  }
}

// Atualizar jogo por ID
exports.atualizarJogo = async (req, res) => {
  try {
    const { id } = req.params
    const { titulo, categoria, plataformas, preco } = req.body

    const jogoAtualizado = await Jogo.findByIdAndUpdate(
      id,
      { titulo, categoria, plataformas, preco },
      { new: true, runValidators: true }
    )

    if (!jogoAtualizado) {
      return res.status(404).json({ mensagem: 'Jogo não encontrado' })
    }

    res.json(jogoAtualizado)
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao atualizar jogo' })
  }
}

// Deletar jogo por ID
exports.deletarJogo = async (req, res) => {
  try {
    const { id } = req.params
    const jogoDeletado = await Jogo.findByIdAndDelete(id)

    if (!jogoDeletado) {
      return res.status(404).json({ mensagem: 'Jogo não encontrado' })
    }

    res.json({ mensagem: 'Jogo deletado com sucesso' })
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao deletar jogo' })
  }
}

// Buscar jogos com filtros opcionais
exports.buscarJogos = async (req, res) => {
  try {
    const { categoria, precoMax, titulo } = req.query
    const filtro = {}

    if (categoria) filtro.categoria = categoria
    if (precoMax) filtro.preco = { $lte: Number(precoMax) }
    if (titulo) filtro.titulo = { $regex: titulo, $options: 'i' }

    const jogos = await Jogo.find(filtro)
    res.json(jogos)
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar jogos' })
  }
}
