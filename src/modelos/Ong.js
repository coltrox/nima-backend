import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Ong = sequelize.define('Ong', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome_fantasia: { type: DataTypes.STRING, allowNull: false },
    cnpj: { type: DataTypes.STRING, unique: true, allowNull: true },
    telefone: { type: DataTypes.STRING },
    cidade: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.STRING(2), allowNull: false },
    whatsapp: { type: DataTypes.STRING },
    foto_perfil: { type: DataTypes.BLOB('long'), allowNull: true }
}, {
    tableName: 'ongs',
    timestamps: true
});

export default Ong;