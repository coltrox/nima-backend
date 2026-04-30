import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Animal = sequelize.define('Animal', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: { type: DataTypes.STRING, allowNull: false },
    especie: { type: DataTypes.STRING, allowNull: false }, // cao, gato
    porte: { 
        type: DataTypes.ENUM('pequeno', 'medio', 'grande'), 
        allowNull: false 
    },
    // --- Relacionamento ---
    ong_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'ongs',
            key: 'id'
        }
    },
    // --- Campos para o Match de IA ---
    nivel_energia: { 
        type: DataTypes.ENUM('baixo', 'moderado', 'alto'), 
        allowNull: false 
    },
    bom_com_criancas: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    bom_com_outros_pets: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    idade_grupo: { 
        type: DataTypes.ENUM('filhote', 'adulto', 'idoso'), 
        allowNull: false 
    },
    // --------------------------------
    temperamento: { type: DataTypes.STRING, allowNull: true },
    castrado: { type: DataTypes.BOOLEAN, defaultValue: false },
    vacinado: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { 
        type: DataTypes.ENUM('disponivel', 'adotado', 'pendente'), 
        defaultValue: 'disponivel'
    },
    descricao: { type: DataTypes.TEXT },
    foto: { type: DataTypes.BLOB('long'), allowNull: true }
}, {
    tableName: 'animais',
    timestamps: true
});

export default Animal;