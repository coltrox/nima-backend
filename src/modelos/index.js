import sequelize from '../config/database.js';
import Animal from './Animal.js';
import Tutor from './Tutor.js';
import Ong from './Ong.js';
import Adocao from './Adocao.js';
import Questionario from './Questionario.js';

// --- 1. Relacionamento ONG <-> ANIMAL ---
// Uma ONG pode ter muitos animais cadastrados[cite: 9, 10]
Ong.hasMany(Animal, { foreignKey: 'ong_id', as: 'animais' });
Animal.belongsTo(Ong, { foreignKey: 'ong_id', as: 'ong' });

// --- 2. Relacionamento TUTOR <-> QUESTIONÁRIO ---
// Um Tutor tem um único questionário de perfil (1:1)[cite: 11, 12]
Tutor.hasOne(Questionario, { foreignKey: 'TutorId', as: 'questionario' });
Questionario.belongsTo(Tutor, { foreignKey: 'TutorId' });

// --- 3. Relacionamentos da ADOÇÃO (Tabela de Junção/Match) ---
// Uma adoção conecta um Tutor a um Animal[cite: 8]
Tutor.hasMany(Adocao, { foreignKey: 'tutor_id', as: 'solicitacoes' });
Adocao.belongsTo(Tutor, { foreignKey: 'tutor_id', as: 'tutor' });

Animal.hasMany(Adocao, { foreignKey: 'animal_id', as: 'processos_adocao' });
Adocao.belongsTo(Animal, { foreignKey: 'animal_id', as: 'animal' });

export {
    sequelize,
    Animal,
    Tutor,
    Ong,
    Adocao,
    Questionario
};