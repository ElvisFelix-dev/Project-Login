import express from 'express'
import Item from '../models/Item.js'

const router = express.Router()

// Criar novo item
router.post('/add', async (req, res) => {
  const { name, quantity, category, userId } = req.body

  try {
    const newItem = new Item({ name, quantity, category, userId })
    const savedItem = await newItem.save()
    res.status(201).json(savedItem)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar item', error: err.message })
  }
})

// Listar itens por usuário
router.get('/:userId', async (req, res) => {
  try {
    const items = await Item.find({ userId: req.params.userId })
    res.status(200).json(items)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar itens', error: err.message })
  }
})

// Atualizar item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedItem) return res.status(404).json({ message: 'Item não encontrado' })
    res.status(200).json(updatedItem)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar item', error: err.message })
  }
})

// Deletar item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id)
    if (!deletedItem) return res.status(404).json({ message: 'Item não encontrado' })
    res.status(200).json({ message: 'Item deletado com sucesso' })
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar item', error: err.message })
  }
})

export default router
