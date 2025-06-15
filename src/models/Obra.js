const mongoose = require('mongoose');

const obraSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome da obra é obrigatório'],
    trim: true
  },
  responsavel: {
    type: String,
    required: [true, 'Responsável é obrigatório'],
    trim: true
  },
  dataInicio: {
    type: Date,
    required: [true, 'Data de início é obrigatória']
  },
  dataFim: {
    type: Date,
    required: [true, 'Data de fim é obrigatória'],
    validate: {
      validator: function(value) {
        return value > this.dataInicio;
      },
      message: 'Data de fim deve ser posterior à data de início'
    }
  },
  localizacao: {
    lat: {
      type: Number,
      required: [true, 'Latitude é obrigatória'],
      min: -90,
      max: 90
    },
    long: {
      type: Number,
      required: [true, 'Longitude é obrigatória'],
      min: -180,
      max: 180
    }
  },
  descricao: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    trim: true
  },
  foto: {
    type: String, // URL ou base64
    default: null
  }
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

// Índice para busca por localização
obraSchema.index({ 'localizacao.lat': 1, 'localizacao.long': 1 });

module.exports = mongoose.model('Obra', obraSchema);