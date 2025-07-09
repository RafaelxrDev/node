const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { createToken } = require('../services/security')

// Registro de novo usuário
exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body

    const usuarioExistente = await Usuario.findOne({ email })
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: 'Email já cadastrado' })
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaHash
    })

    await novoUsuario.save()

    res.status(201).json({ mensagem: 'Usuário criado com sucesso' })
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao registrar usuário' })
  }
}

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body

    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(400).json({ mensagem: 'Email inválido' })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    if (!senhaValida) {
      return res.status(400).json({ mensagem: 'Senha inválida' })
    }

    const token = createToken(usuario._id, usuario.nome)

    res.json({ token })
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao fazer login' })
  }
}
