const router = require('express').Router()
// const user = require('../models/user')
const db = require('../src/db')
const User = require('../models/user')(db.sequelize, db.DataTypes)
const bcrypt = require('bcryptjs')


router.get('/', async (req, res) => {
  const { login } = req.query
  const where = login ? { where: { login } } : undefined
  const users = await User.findAll(where)
  if (users.lenght === 0) {
    return res.json({ message: 'Nenhum usuário encontrado.'})
  }
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const user = await User.findByPk(id)
  if (!user) {
    return res.json({ message: 'Usuário não encontrado.'})
  }
  res.json(user || {})
})

router.post('/', async (req, res) => {
  const salt = bcrypt.genSaltSync(10)
  const { login , senha} = req.body
  const user = await User.create({
    login,
    senha: bcrypt.hashSync(senha, salt)
  })
  return res.json(user)
})

router.put('/', async (req,res) => {

})

router.delete('/:id', async (req,res) => {
  const user = await User.findByPk(req.params.id)
  if (!user) {
    return res.json({ message: 'Usuário não encontrado.' })
  }
  const { login } = user.dataValues
  await user.destroy()
  res.json({ message: `Usuário '${login}' deletado com sucesso...`})
})

module.exports = router