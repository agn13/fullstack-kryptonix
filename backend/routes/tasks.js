const express = require('express');
const router = express.Router();

// In-memory storage for development/testing
let tasks = [];
let idCounter = 1;

router.get('/', (req, res) => {
  res.json(tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

router.post('/', (req, res) => {
  const task = {
    _id: (idCounter++).toString(),
    title: req.body.title,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(task);
  res.status(201).json(task);
});

router.put('/:id', (req, res) => {
  const task = tasks.find(t => t._id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Not found' });

  task.title = req.body.title ?? task.title;
  if (typeof req.body.completed === 'boolean') {
    task.completed = req.body.completed;
  }
  task.updatedAt = new Date();

  res.json(task);
});

router.delete('/:id', (req, res) => {
  const idx = tasks.findIndex(t => t._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  
  tasks.splice(idx, 1);
  res.json({ message: 'Task removed' });
});

module.exports = router;
