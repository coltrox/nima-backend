// src/modelos/Tutor.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Tutor = sequelize.define('Tutor', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true,
        validate: { isEmail: true }
    },
    senha: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    // ATUALIZAÇÃO: Uso de ENUM para definir papéis fixos no sistema
    cargo: {
        type: DataTypes.ENUM('tutor', 'ong', 'admin'),
        defaultValue: 'tutor',
        allowNull: false
    },
    // Token para recuperação de senha
    reset_token: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    reset_token_expira: { 
        type: DataTypes.DATE, 
        allowNull: true 
    }
}, {
    tableName: 'tutores',
    timestamps: false // Mantido desativado conforme sua última alteração
});

export default Tutor;