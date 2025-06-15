const Obra = require('../models/Obra');
const Fiscalizacao = require('../models/Fiscalizacao');
const { enviarDetalhesObra } = require('../services/emailService');

// GET-Listar todas as obras
const listarObras = async (req, res) => {
  try {
    const obras = await Obra.find().sort({ createdAt: -1 });
    res.json(obras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET-Buscar obra por ID
const buscarObraPorId = async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.id);

    if (!obra) {
      return res.status(404).json({ error: 'Obra não encontrada' });
    }

    res.json(obra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST-Criar nova obra
const criarObra = async (req, res) => {
  try {
    const obra = new Obra(req.body);
    const novaObra = await obra.save();
    res.status(201).json(novaObra);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: error.message });
  }
};

// PUT-Atualizar obra
const atualizarObra = async (req, res) => {
  try {
    const obra = await Obra.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!obra) {
      return res.status(404).json({ error: 'Obra não encontrada' });
    }

    res.json(obra);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: error.message });
  }
};

// DELETE-Deletar obra
const deletarObra = async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.id);

    if (!obra) {
      return res.status(404).json({ error: 'Obra não encontrada' });
    }

    // Deletar todas as fiscalizações relacionadas
    await Fiscalizacao.deleteMany({ obraId: req.params.id });

    // Deletar a obra
    await Obra.findByIdAndDelete(req.params.id);

    res.json({ message: 'Obra e fiscalizações relacionadas deletadas com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /obras/:id/fiscalizacoes - Listar fiscalizações de uma obra
const listarFiscalizacoesPorObra = async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.id);

    if (!obra) {
      return res.status(404).json({ error: 'Obra não encontrada' });
    }

    const fiscalizacoes = await Fiscalizacao.find({ obraId: req.params.id }).sort({ data: -1 });

    res.json(fiscalizacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /obras/:id/enviar-email - Enviar detalhes da obra por email
const enviarEmailObra = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email de destino é obrigatório' });
    }

    // Verificar se a obra existe
    const obra = await Obra.findById(req.params.id);
    if (!obra) {
      return res.status(404).json({ error: 'Obra não encontrada' });
    }

    // Enviar email
    const resultado = await enviarDetalhesObra(obra, email);

    if (resultado.success) {
      res.json({
        message: 'Email enviado com sucesso',
        email: email,
        obra: obra.nome
      });
    } else {
      res.status(500).json({
        error: 'Falha ao enviar email',
        details: resultado.message
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarObras,
  buscarObraPorId,
  criarObra,
  atualizarObra,
  deletarObra,
  listarFiscalizacoesPorObra,
  enviarEmailObra
};
