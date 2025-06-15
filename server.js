const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/config/database');

const app = express();

//Conectando com o banco de dados
connectDB();

//Middlewares para conexão com serviços externos
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Limite para imagens em base 64
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/obras', require('./src/routes/obraRoutes'));
app.use('/fiscalizacoes', require('./src/routes/fiscalizacaoRoutes'));

// Rota teste inicial
app.get('/', (req, res) => {
  res.json({ message: 'API de obras está funcionando!' });
});

// Erro na Api
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'API de obras não está funcionando!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodadando na porta ${PORT}`);
});
