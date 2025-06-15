# API de Gestão de Obras

Backend para sistema de cadastro e acompanhamento de obras em andamento, desenvolvido com Node.js, Express e MongoDB.

## Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **Nodemailer** - Envio de emails
- **Cors** - Controle de acesso CORS

## Pré-requisitos

- Node.js (versão 16 ou superior)
- MongoDB (local ou MongoDB Atlas)
- NPM ou Yarn

## Instalação e Execução

### 1. Clone o repositório

```bash
git clone <https://github.com/amand4priscil4/API-OBRAS.git>
cd Api-obras
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

O arquivo `.env` já está configurado para desenvolvimento local. Para produção, ajuste as variáveis conforme necessário:

```env
MONGODB_URI=mongodb://localhost:27017/obras-db
PORT=3000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=colocar-o-email-aqui@gmail.com
EMAIL_PASS=sua-senha-de-app
```

### 4. Execute o projeto

**Desenvolvimento (com auto-reload):**

```bash
npm run dev
```

**Produção:**

```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## Documentação da API

### Base URL

```
http://localhost:3000
```

### Endpoint de teste

- **GET** `/` - Verifica se a API está funcionando
  ```json
  {
    "message": "API de Obras funcionando!"
  }
  ```

## Rotas de Obras

### Listar todas as obras

- **GET** `/obras`
- **Resposta:**
  ```json
  [
    {
      "_id": "65f...",
      "nome": "Construção do Prédio A",
      "responsavel": "João Silva",
      "dataInicio": "2024-01-15T00:00:00.000Z",
      "dataFim": "2024-12-31T00:00:00.000Z",
      "localizacao": {
        "lat": -8.0476,
        "long": -34.877
      },
      "descricao": "Construção de prédio residencial",
      "foto": "data:image/jpeg;base64,...",
      "createdAt": "2024-03-15T10:30:00.000Z",
      "updatedAt": "2024-03-15T10:30:00.000Z"
    }
  ]
  ```

### Buscar obra por ID

- **GET** `/obras/:id`
- **Resposta:** Objeto da obra ou erro 404

### Criar nova obra

- **POST** `/obras`
- **Body:**
  ```json
  {
    "nome": "Construção do Prédio A",
    "responsavel": "João Silva",
    "dataInicio": "2024-01-15",
    "dataFim": "2024-12-31",
    "localizacao": {
      "lat": -8.0476,
      "long": -34.877
    },
    "descricao": "Construção de prédio residencial",
    "foto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..." // opcional
  }
  ```

### Atualizar obra

- **PUT** `/obras/:id`
- **Body:** Mesma estrutura do POST (campos opcionais)

### Deletar obra

- **DELETE** `/obras/:id`
- **Resposta:**
  ```json
  {
    "message": "Obra e fiscalizações relacionadas deletadas com sucesso"
  }
  ```

### Listar fiscalizações de uma obra

- **GET** `/obras/:id/fiscalizacoes`
- **Resposta:** Array de fiscalizações da obra

### Enviar detalhes da obra por email

- **POST** `/obras/:id/enviar-email`
- **Body:**
  ```json
  {
    "email": "destinatario@email.com"
  }
  ```

## Rotas de Fiscalizações

### Listar todas as fiscalizações

- **GET** `/fiscalizacoes`
- **Resposta:**
  ```json
  [
    {
      "_id": "65f...",
      "data": "2024-03-15T14:30:00.000Z",
      "status": "Em andamento",
      "observacoes": "Obra seguindo conforme cronograma",
      "localizacao": {
        "lat": -8.0476,
        "long": -34.877
      },
      "foto": "data:image/jpeg;base64,...",
      "obraId": {
        "_id": "65f...",
        "nome": "Construção do Prédio A",
        "responsavel": "João Silva"
      },
      "createdAt": "2024-03-15T14:30:00.000Z",
      "updatedAt": "2024-03-15T14:30:00.000Z"
    }
  ]
  ```

### Buscar fiscalização por ID

- **GET** `/fiscalizacoes/:id`
- **Resposta:** Objeto da fiscalização ou erro 404

### Criar nova fiscalização

- **POST** `/fiscalizacoes`
- **Body:**
  ```json
  {
    "data": "2024-03-15T14:30:00.000Z", // opcional, padrão: data atual
    "status": "Em andamento",
    "observacoes": "Obra seguindo conforme cronograma",
    "localizacao": {
      "lat": -8.0476,
      "long": -34.877
    },
    "foto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...", // opcional
    "obraId": "65f..." // ID da obra (obrigatório)
  }
  ```

### Atualizar fiscalização

- **PUT** `/fiscalizacoes/:id`
- **Body:** Mesma estrutura do POST (campos opcionais)

### Deletar fiscalização

- **DELETE** `/fiscalizacoes/:id`
- **Resposta:**
  ```json
  {
    "message": "Fiscalização deletada com sucesso"
  }
  ```

## Status Válidos para Fiscalização

- `Em andamento`
- `Concluída`
- `Atrasada`
- `Paralisada`
- `Aprovada`
- `Reprovada`

## Upload de Imagens

As imagens podem ser enviadas como:

- **Base64:** `data:image/jpeg;base64,/9j/4AAQSkZJRgABA...`
- **URL:** `https://exemplo.com/imagem.jpg`

## 📧 Configuração de Email

Para testar o envio de emails, configure as credenciais no arquivo `.env`:

1. Para Gmail, use uma "Senha de App":
   - Acesse as configurações da conta Google
   - Ative a autenticação de 2 fatores
   - Gere uma senha de app
   - Use essa senha no `EMAIL_PASS`

## Testando a API

### Usando curl

**Criar uma obra:**

```bash
curl -X POST http://localhost:3000/obras \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste de Obra",
    "responsavel": "Amanda Alves",
    "dataInicio": "2024-01-15",
    "dataFim": "2024-12-31",
    "localizacao": {"lat": -8.0476, "long": -34.8770},
    "descricao": "Obra de teste"
  }'
```

**Criar uma fiscalização:**

```bash
curl -X POST http://localhost:3000/fiscalizacoes \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Em andamento",
    "observacoes": "Fiscalização de teste",
    "localizacao": {"lat": -8.0476, "long": -34.8770},
    "obraId": "SEU_ID_DA_OBRA_AQUI"
  }'
```

### Usando ferramentas visuais

- **Postman**
- **Insomnia**
- **Thunder Client** (extensão do VS Code)

## Estrutura do Projeto

```
Api-obras/
├── src/
│   ├── controllers/          # Lógica de negócio
│   │   ├── obraController.js
│   │   └── fiscalizacaoController.js
│   ├── models/              # Modelos do Mongoose
│   │   ├── Obra.js
│   │   └── Fiscalizacao.js
│   ├── routes/              # Definição das rotas
│   │   ├── obraRoutes.js
│   │   └── fiscalizacaoRoutes.js
│   ├── services/            # Serviços externos
│   │   └── emailService.js
│   └── config/              # Configurações
│       └── database.js
├── .env                     # Variáveis de ambiente
├── .gitignore              # Arquivos ignorados pelo Git
├── package.json            # Dependências e scripts
├── server.js               # Arquivo principal
└── README.md               # Documentação
```

## Tratamento de Erros

A API retorna erros no formato:

```json
{
  "error": "Mensagem do erro"
}
```

Ou para erros de validação:

```json
{
  "errors": ["Nome da obra é obrigatório", "Data de fim deve ser posterior à data de início"]
}
```

## Licença

Este projeto está sob a licença ISC.
