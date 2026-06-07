const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let articles = [];
let nextId = 1;

app.get('/articles', (req, res) => {
  res.json(articles);
});

app.get('/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const article = articles.find(a => a.id === id);
  article ? res.json(article) : res.status(404).json({ error: 'Not found' });
});

app.post('/articles', (req, res) => {
  const newArticle = { id: nextId++, ...req.body };
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

app.put('/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = articles.findIndex(a => a.id === id);
  if (index !== -1) {
    articles[index] = { ...articles[index], ...req.body };
    res.json(articles[index]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  articles = articles.filter(a => a.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});s