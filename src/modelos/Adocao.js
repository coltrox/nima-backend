import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Adocao = sequelize.define('Adocao', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    // --- Chaves Estrangeiras ---
    tutor_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'tutores',
            key: 'id'
        }
    },
    animal_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'animais',
            key: 'id'
        }
    },
    // --- Status do Processo ---
    status: { 
        type: DataTypes.ENUM('analise', 'aprovado', 'rejeitado', 'concluido'), 
        defaultValue: 'analise'
    },
    // --- Dados vindos da IA (n8n) ---
    pontuacao_match: { 
        type: DataTypes.INTEGER, // Ex: 90 para 90%
        allowNull: true 
    },
    justificativa_ia: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
    // --- Registro ---
    data_solicitacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'adocoes',
    timestamps: true
});

export default Adocao;