import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
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
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
    },
    senha: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    cargo: {
        type: DataTypes.ENUM('usuario', 'ong', 'desenvolvedor'), // Atualizado de 'tutor' para 'usuario'
        defaultValue: 'usuario',
        allowNull: false
    },
    reset_token: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    reset_token_expira: { 
        type: DataTypes.DATE, 
        allowNull: true 
    }
}, {
    tableName: 'usuarios', // Mudado para refletir a tabela geral de usuários
    timestamps: false 
});

export default Usuario;