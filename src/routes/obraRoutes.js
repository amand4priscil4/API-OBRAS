const express = require('express');
const router = express.Router();
const {
  listarObras,
  buscarObraPorId,
  criarObra,
  atualizarObra,
  deletarObra,
  listarFiscalizacoesPorObra,
  enviarEmailObra
} = require('../controllers/obraController');

// Rotas básicas CRUD
router.get('/', listarObras); // GET /obras
router.get('/:id', buscarObraPorId); // GET /obras/:id
router.post('/', criarObra); // POST /obras
router.put('/:id', atualizarObra); // PUT /obras/:id
router.delete('/:id', deletarObra); // DELETE /obras/:id

// Rota para listar fiscalizações atreladas a obra selecionada
router.get('/:id/fiscalizacoes', listarFiscalizacoesPorObra); // GET /obras/:id/fiscalizacoes
// Rota para enviar detalhes da obra por e-mail
router.post('/:id/enviar-email', enviarEmailObra); // POST /obras/:id/enviar-email

module.exports = router;
