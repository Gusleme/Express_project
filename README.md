# Aula 05 - API Express: Gerenciador de Notas

Projeto pratico da Aula 05: Criando APIs para o Front-end com Express.js.

## Descricao

API REST completa para gerenciamento de notas (CRUD) com persistencia em arquivo JSON, consumida por um front-end em JavaScript vanilla.

## Tecnologias

- **Backend**: Node.js, Express.js, CORS
- **Frontend**: HTML5, CSS3, JavaScript Vanilla (ES6+)
- **Persistencia**: Arquivo JSON (notas.json)

## Estrutura do Projeto

```
Express_project/
├── README.md
├── package-lock.json
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── notas.json
└── frontend/
    ├── index.html
    ├── styles.css
    └── app.js
```

## Instalacao

```bash
# Backend
cd backend
npm install

# Frontend (arquivos estaticos, abrir index.html no navegador)
# Ou servir com: npx serve frontend
```

## Executando

```bash
# Terminal 1 - Backend (porta 4000)
cd backend
npm start

# Terminal 2 - Frontend (abrir frontend/index.html no navegador)
# Ou usar extensao Live Server do VS Code
```

O backend roda em `http://localhost:4000`
O front-end consome a API em `http://localhost:3000` (configuravel em frontend/app.js)

## Endpoints da API

### Notas

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/api/notas` | Lista todas as notas |
| GET | `/api/notas/:id` | Busca nota por ID |
| POST | `/api/notas` | Cria nova nota |
| PUT | `/api/notas/:id` | Atualiza nota completa |
| DELETE | `/api/notas/:id` | Remove nota |

### Exemplo de nota
```json
{
  "id": 1701234567890,
  "titulo": "Estudar Express",
  "descricao": "Revisar middlewares e rotas",
  "nota": 8.5
}
```

## Funcionalidades do Front-end

- Listar notas cadastradas
- Criar nova nota (titulo, descricao, nota 0-10)
- Editar nota existente
- Excluir nota com confirmacao
- Validacao basica de formulario
- Feedback visual ao usuario

## Conceitos Aplicados (Aula 05)

- API REST com Express.js
- Metodos HTTP semanticos (GET, POST, PUT, DELETE)
- Middleware CORS para comunicacao cross-origin
- Middleware express.json() para parsing de JSON
- Persistencia em arquivo com fs.promises
- Tratamento de erros com try/catch
- Status codes HTTP apropriados (200, 201, 404, 500)
- Separacao frontend/backend
- Consumo de API com fetch() no front-end
- Manipulacao de DOM dinamica

## Melhorias Futuras

- Validacao mais robusta no backend
- Autenticacao e autorizacao
- Banco de dados real (SQLite, PostgreSQL, MongoDB)
- Testes automatizados
- Docker para containerizacao
- Deploy em Railway/Render