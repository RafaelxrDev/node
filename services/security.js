const jwt = require('jsonwebtoken')

// Middleware de verificação de token
const authorized = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não fornecido' })
  }

  const token = authHeader.split(' ')[1] // pega só o token (sem "Bearer")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = decoded
    next()
  } catch (err) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' })
  }
}

// Função para criar token JWT
const createToken = (id, nome) => {
  return jwt.sign({ id, nome }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}

module.exports = {
  authorized,
  createToken
}
