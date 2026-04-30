import app from './app.js';
import sequelize from './config/database.js';

// Importação dos modelos para garantir que o Sequelize os registre no PostgreSQL
import './modelos/Tutor.js';
import './modelos/Animal.js';
import './modelos/Questionario.js';

const PORT = process.env.PORT || 3000;

async function iniciarSistema() {
    try {
        // Valida as credenciais do .env
        await sequelize.authenticate();
        console.log('✅ Conexão com PostgreSQL estabelecida com sucesso!');

        // Cria as tabelas. O 'alter: true' é fundamental aqui para que o Postgres 
        // crie os tipos ENUM e a coluna JSONB corretamente[cite: 4, 8].
        await sequelize.sync({ alter: true });
        console.log('✅ Tabelas sincronizadas (Tutor, Animal e Questionário)!');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor nima rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Erro ao conectar ao banco de dados:', error);
    }
}

iniciarSistema();