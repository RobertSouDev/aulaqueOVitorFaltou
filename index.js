const express = require('express');
const app = express();
const port = 3000;

// Middleware para analisar JSON no corpo da solicitação
app.use(express.json());

// Dados de exemplo (substitua por um banco de dados real)
let tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
];

// Rota POST para criar uma nova tarefa
app.post('/tasks', (req, res) => {
  const newTask = req.body;

  // Adicione um novo ID à tarefa
  const maxId = Math.max(...tasks.map((task) => task.id));
  newTask.id = maxId + 1;

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Rota GET para listar todas as tarefas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Rota GET para buscar uma tarefa por ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
});

// Rota PUT para atualizar uma tarefa por ID
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };

  res.json(tasks[taskIndex]);
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

