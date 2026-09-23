const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'notas.json');

app.use(cors());
app.use(express.json());

async function lerNotas() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function salvarNotas(notas) {
  await fs.writeFile(DATA_FILE, JSON.stringify(notas, null, 2), 'utf8');
}

app.get('/api/notas', async (req, res) => {
  try {
    const notas = await lerNotas();
    res.json(notas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao ler notas' });
  }
});

app.get('/api/notas/:id', async (req, res) => {
  try {
    const notas = await lerNotas();
    const nota = notas.find(n => n.id === parseInt(req.params.id));
    if (!nota) {
      return res.status(404).json({ erro: 'Nota não encontrada' });
    }
    res.json(nota);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar nota' });
  }
});

app.post('/api/notas', async (req, res) => {
  try {
    const notas = await lerNotas();
    const novaNota = {
      id: Date.now(),
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      nota: req.body.nota
    };
    notas.push(novaNota);
    await salvarNotas(notas);
    res.status(201).json(novaNota);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar nota' });
  }
});

app.put('/api/notas/:id', async (req, res) => {
  try {
    const notas = await lerNotas();
    const index = notas.findIndex(n => n.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ erro: 'Nota não encontrada' });
    }
    notas[index] = {
      ...notas[index],
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      nota: req.body.nota
    };
    await salvarNotas(notas);
    res.json(notas[index]);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar nota' });
  }
});

app.delete('/api/notas/:id', async (req, res) => {
  try {
    const notas = await lerNotas();
    const index = notas.findIndex(n => n.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ erro: 'Nota não encontrada' });
    }
    notas.splice(index, 1);
    await salvarNotas(notas);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir nota' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
