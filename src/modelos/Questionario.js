import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Ajuste o caminho para seu arquivo de config do Sequelize
import Tutor from './Tutor.js';

const Questionario = sequelize.define('Questionario', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    tempoSozinho: { type: DataTypes.STRING, allowNull: false },
    nivelEnergia: { type: DataTypes.STRING, allowNull: false },
    frequenciaPasseios: { type: DataTypes.STRING, allowNull: false },
    principalResponsavel: { type: DataTypes.STRING, allowNull: false },
    tipoResidencia: { type: DataTypes.STRING, allowNull: false },
    ambienteSeguroFugas: { type: DataTypes.STRING, allowNull: false },
    acessoInteriorCasa: { type: DataTypes.STRING, allowNull: false },
    existemCriancas: { type: DataTypes.STRING, allowNull: false },
    faixaEtariaCriancas: { type: DataTypes.STRING, defaultValue: 'Não se aplica' },
    outrosAnimais: { type: DataTypes.STRING, allowNull: false },
    preferenciaEspecie: { type: DataTypes.STRING, allowNull: false },
    portePreferido: { type: DataTypes.STRING, allowNull: false },
    idadePreferida: { type: DataTypes.STRING, allowNull: false },
    alergiaPelos: { type: DataTypes.STRING, allowNull: false },
    reservaCustosVet: { type: DataTypes.STRING, allowNull: false },
    planejamentoViagens: { type: DataTypes.STRING, allowNull: false },
    jaTeveAnimais: { type: DataTypes.STRING, allowNull: false },
    classificacaoExperiencia: { type: DataTypes.STRING, allowNull: false },
    motivoAdocao: { type: DataTypes.STRING, allowNull: false },
    cienteResponsabilidade: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'questionarios' });

// Relacionamento: Um Tutor tem um Questionário
Tutor.hasOne(Questionario, { foreignKey: 'tutorId' });
Questionario.belongsTo(Tutor, { foreignKey: 'tutorId' });

export default Questionario;