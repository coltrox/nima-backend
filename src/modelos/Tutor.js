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
    cargo: {
        type: DataTypes.STRING,
        defaultValue: 'tutor'
    },
    // Token para recuperação de senha
    reset_token: { type: DataTypes.STRING, allowNull: true },
    reset_token_expira: { type: DataTypes.DATE, allowNull: true }
}, {
    tableName: 'tutores',
    timestamps: false // MUDANÇA AQUI: Desativado para evitar o erro de ALTER TABLE
});

export default Tutor;