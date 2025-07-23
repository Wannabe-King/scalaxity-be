const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

let tasks = [];

// GET /tasks – List all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks – Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, dueDate, status } = req.body;
  if (!title || !status || !['pending', 'done'].includes(status)) {
    return res.status(400).json({ error: 'Invalid task data' });
  }
  const newTask = {
    id: uuidv4(),
    title,
    description: description || '',
    dueDate: dueDate || null,
    status
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id – Update a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (dueDate !== undefined) task.dueDate = dueDate;
  if (status !== undefined && ['pending', 'done'].includes(status)) task.status = status;
  res.json(task);
});

// DELETE /tasks/:id – Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(idx, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Task manager API running on port ${PORT}`);
});
