import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Tutor = sequelize.define('Tutor', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    // ID vinculado ao Auth do Supabase
    usuario_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    // --- Controle de Acesso ---
    cargo: {
        type: DataTypes.ENUM('tutor', 'admin_ong', 'admin'),
        defaultValue: 'tutor',
        allowNull: false
    },
    // --- Dados do Perfil (Preenchidos via questionário/IA) ---
    nome: { type: DataTypes.STRING, allowNull: true },
    telefone: { type: DataTypes.STRING, allowNull: true },
    tipo_residencia: { 
        type: DataTypes.ENUM('casa', 'apartamento'), 
        allowNull: true 
    },
    possui_telas: { type: DataTypes.BOOLEAN, defaultValue: false },
    estilo_vida: { 
        type: DataTypes.ENUM('sedentario', 'moderado', 'ativo'), 
        allowNull: true 
    },
    tempo_disponivel: { 
        type: DataTypes.ENUM('pouco', 'medio', 'muito'), 
        allowNull: true 
    }
}, {
    tableName: 'tutores',
    timestamps: true
});

export default Tutor;