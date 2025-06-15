const express = require('express');
const router = express.Router();
const {
  listarFiscalizacoes,
  buscarFiscalizacaoPorId,
  criarFiscalizacao,
  atualizarFiscalizacao,
  deletarFiscalizacao
} = require('../controllers/fiscalizacaoController');

// Rotas básicas CRUD
router.get('/', listarFiscalizacoes); // GET /fiscalizacoes
router.get('/:id', buscarFiscalizacaoPorId); // GET /fiscalizacoes/:id
router.post('/', criarFiscalizacao); // POST /fiscalizacoes
router.put('/:id', atualizarFiscalizacao); // PUT /fiscalizacoes/:id
router.delete('/:id', deletarFiscalizacao); // DELETE /fiscalizacoes/:id

module.exports = router;
