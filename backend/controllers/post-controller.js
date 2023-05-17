const router = require('express').Router()
const db = require('../src/db')
const Post = require('../models/post')(db.sequelize, db.DataTypes)

router.get('/', async (req, res) => {
  res.json(await Post.findAll())

})

router.get('/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id)
  return res.json(post)
})

router.post('/', async (req, res) => {
  return res.json(await Post.create(req.body))
})

router.put('/', async (req,res) => {
  const post = await Post.findByPk(req.body.id)
  Object.entries(req.body).forEach(item => {
    const [key, value] = item
    post[key] = value
  })
  await post.save()
  return res.json({ message: 'Post atualizado com sucesso' })
})

router.delete('/:id', async (req,res) => {
  const post = await Post.findByPk(req.params.id)
  post.destroy()
  return res.json({ message: 'Post excluidos com sucesso' })
})

module.exports = router