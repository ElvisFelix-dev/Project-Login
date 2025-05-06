import express from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import User from '../models/User.js'

import { sendEmail } from '../utils/sendEmail.js'
import { generateToken, isAuth } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    })

    const user = await newUser.save()
    const token = generateToken(user)
    res.status(200).json({ _id: user._id, userName: user.userName, email: user.email, token })
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user', message: err.message })
  }
})

// Login.
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })

    if (!user) {
      return res.status(400).json({ message: 'Usuário ou senha incorretos' })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
      return res.status(400).json({ message: 'Usuário ou senha incorretos' })
    }

    const token = generateToken(user)
    res.status(200).json({ _id: user._id, userName: user.userName, email: user.email, token })
  } catch (err) {
    res.status(500).json({ error: 'Failed to log in', message: err.message })
  }
})

// ROTA PARA SOLICITAR RESET DE SENHA
// ROTA PARA SOLICITAR RESET DE SENHA
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = Date.now() + 3600000 // 1 hora
    await user.save()

    const resetLink = `${process.env.FRONTEND_URL}/reset/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: 'Recuperação de Senha',
      text: `Você solicitou a redefinição de senha. Acesse: ${resetLink}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Olá, ${user.userName}!</h2>
          <p>Você solicitou a redefinição da sua senha.</p>
          <p>Clique no botão abaixo para criar uma nova senha:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #1e88e5; color: #fff; text-decoration: none; border-radius: 4px;">
            Redefinir Senha
          </a>
          <p>Esse link é válido por 1 hora. Se você não solicitou isso, ignore este e-mail.</p>
          <br />
          <p style="font-size: 12px; color: #999;">Project One • Não responda esta mensagem</p>
        </div>
      `,
    })

    res.status(200).json({ message: 'E-mail de recuperação enviado.' })
  } catch (err) {
    res.status(500).json({ message: 'Erro ao enviar e-mail', error: err.message })
  }
})

// ROTA PARA RESETAR A SENHA
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params
  const { newPassword } = req.body

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!user) return res.status(400).json({ message: 'Token inválido ou expirado' })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save()

    res.status(200).json({ message: 'Senha atualizada com sucesso.' })
  } catch (err) {
    res.status(500).json({ message: 'Erro ao redefinir senha', error: err.message })
  }
})

// Exemplo de rota protegida
router.get('/profile', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar dados do usuário', error: err.message })
  }
})

export default router
