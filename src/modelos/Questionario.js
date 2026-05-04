import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Questionario = sequelize.define('Questionario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    TutorId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    },

    // --- 1. Perfil de Rotina ---
    tempo_sozinho: {
        type: DataTypes.ENUM('menos_4h', '4_8h', 'mais_8h'),
        allowNull: false
    },

    nivel_energia: {
        type: DataTypes.ENUM('baixo', 'moderado', 'alto'),
        allowNull: false
    },

    rotina_exercicio: {
        type: DataTypes.ENUM('nenhum', 'leve', 'moderado', 'intenso'),
        allowNull: false
    },

    responsavel_principal: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // --- 2. Ambiente ---
    tipo_residencia: {
        type: DataTypes.ENUM(
            'casa_quintal_grande',
            'casa_quintal_pequeno',
            'apto_com_tela',
            'apto_sem_tela'
        ),
        allowNull: false
    },

    ambiente_seguro: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    acesso_interno: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    // --- 3. Família ---
    criancas_residencia: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    faixa_etaria_criancas: {
        type: DataTypes.STRING,
        allowNull: true
    },

    outros_animais: {
        type: DataTypes.JSONB,
        allowNull: true
        // exemplo:
        // [{ tipo: 'cao', porte: 'medio', comportamento: 'docil' }]
    },

    // --- 4. Preferências ---
    especie_preferencia: {
        type: DataTypes.ENUM('cao', 'gato', 'indiferente'),
        allowNull: false
    },

    porte_preferencia: {
        type: DataTypes.ENUM('pequeno', 'medio', 'grande', 'indiferente'),
        allowNull: false
    },

    idade_preferencia: {
        type: DataTypes.ENUM('filhote', 'adulto', 'idoso'),
        allowNull: false
    },

    // --- 5. Saúde e Finanças ---
    alergia_pelos: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    reserva_financeira: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    plano_viagens: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    // --- 6. Experiência ---
    ja_teve_pet: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    experiencia_animais: {
        type: DataTypes.ENUM('nenhuma', 'basica', 'experiente'),
        allowNull: false
    },

    // --- 7. Intenção ---
    motivo_adocao: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    compromisso_longo_prazo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

}, {
    tableName: 'questionarios',
    timestamps: true
});

export default Questionario;
