const API_URL = 'http://localhost:3000/api/notas';

const form = document.getElementById('notaForm');
const lista = document.getElementById('listaNotas');
const cancelarBtn = document.getElementById('cancelar');
const notaIdInput = document.getElementById('notaId');

async function carregarNotas() {
  const res = await fetch(API_URL);
  const notas = await res.json();
  lista.innerHTML = '';
  notas.forEach(nota => {
    const li = document.createElement('li');
    li.className = 'nota-item';
    li.innerHTML = `
      <div class="nota-info">
        <h3>${nota.titulo}</h3>
        <p>${nota.descricao}</p>
        <p><strong>Nota:</strong> ${nota.nota}</p>
      </div>
      <div class="nota-acoes">
        <button class="editar" onclick="editarNota(${nota.id})">Editar</button>
        <button class="excluir" onclick="excluirNota(${nota.id})">Excluir</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = notaIdInput.value;
  const dados = {
    titulo: document.getElementById('titulo').value,
    descricao: document.getElementById('descricao').value,
    nota: parseFloat(document.getElementById('nota').value)
  };

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
  }

  form.reset();
  notaIdInput.value = '';
  cancelarBtn.style.display = 'none';
  carregarNotas();
});

window.editarNota = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  const nota = await res.json();
  document.getElementById('titulo').value = nota.titulo;
  document.getElementById('descricao').value = nota.descricao;
  document.getElementById('nota').value = nota.nota;
  notaIdInput.value = nota.id;
  cancelarBtn.style.display = 'inline-block';
};

window.excluirNota = async (id) => {
  if (confirm('Deseja realmente excluir esta nota?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    carregarNotas();
  }
};

cancelarBtn.addEventListener('click', () => {
  form.reset();
  notaIdInput.value = '';
  cancelarBtn.style.display = 'none';
});

carregarNotas();
