const Fiscalizacao = require('../models/Fiscalizacao');
const Obra = require('../models/Obra');

// GET-Listar todas as fiscalizações
const listarFiscalizacoes = async (req, res) => {
  try {
    const fiscalizacoes = await Fiscalizacao.find()
      .populate('obraId', 'nome responsavel')
      .sort({ data: -1 });

    res.json(fiscalizacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET-Buscar fiscalização por ID
const buscarFiscalizacaoPorId = async (req, res) => {
  try {
    const fiscalizacao = await Fiscalizacao.findById(req.params.id).populate(
      'obraId',
      'nome responsavel localizacao'
    );

    if (!fiscalizacao) {
      return res.status(404).json({ error: 'Fiscalização não encontrada' });
    }

    res.json(fiscalizacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST-Criar nova fiscalização
const criarFiscalizacao = async (req, res) => {
  try {
    // Verificar se a obra existe
    const obra = await Obra.findById(req.body.obraId);
    if (!obra) {
      return res.status(404).json({ error: 'Obra não encontrada' });
    }

    const fiscalizacao = new Fiscalizacao(req.body);
    const novaFiscalizacao = await fiscalizacao.save();

    // Popular os dados da obra na resposta
    await novaFiscalizacao.populate('obraId', 'nome responsavel');

    res.status(201).json(novaFiscalizacao);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: error.message });
  }
};

// PUT-Atualizar fiscalização
const atualizarFiscalizacao = async (req, res) => {
  try {
    // Se for alterar a obra, verifica se existe
    if (req.body.obraId) {
      const obra = await Obra.findById(req.body.obraId);
      if (!obra) {
        return res.status(404).json({ error: 'Obra não encontrada' });
      }
    }

    const fiscalizacao = await Fiscalizacao.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('obraId', 'nome responsavel');

    if (!fiscalizacao) {
      return res.status(404).json({ error: 'Fiscalização não encontrada' });
    }

    res.json(fiscalizacao);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: error.message });
  }
};

// DELETE-Deletar fiscalização
const deletarFiscalizacao = async (req, res) => {
  try {
    const fiscalizacao = await Fiscalizacao.findByIdAndDelete(req.params.id);

    if (!fiscalizacao) {
      return res.status(404).json({ error: 'Fiscalização não encontrada' });
    }

    res.json({ message: 'Fiscalização deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarFiscalizacoes,
  buscarFiscalizacaoPorId,
  criarFiscalizacao,
  atualizarFiscalizacao,
  deletarFiscalizacao
};
