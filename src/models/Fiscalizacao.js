const mongoose = require('mongoose');

const fiscalizacaoSchema = new mongoose.Schema(
  {
    data: {
      type: Date,
      required: [true, 'Data da fiscalização é obrigatória'],
      default: Date.now
    },
    status: {
      type: String,
      required: [true, 'Status é obrigatório'],
      enum: {
        values: ['Em andamento', 'Concluída', 'Atrasada', 'Paralisada', 'Aprovada', 'Reprovada'],
        message:
          'Status deve ser: Em andamento, Concluída, Atrasada, Paralisada, Aprovada ou Reprovada'
      }
    },
    observacoes: {
      type: String,
      required: [true, 'Observações são obrigatórias'],
      trim: true
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
    foto: {
      type: String, // URL ou base64
      default: null
    },
    obraId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Obra',
      required: [true, 'ID da obra é obrigatório']
    }
  },
  {
    timestamps: true // Adiciona createdAt e updatedAt automaticamente
  }
);

fiscalizacaoSchema.index({ obraId: 1 });

fiscalizacaoSchema.index({ data: -1 });

module.exports = mongoose.model('Fiscalizacao', fiscalizacaoSchema);
