import app from './app.js';
import sequelize from './config/database.js';
import './modelos/Usuario.js'; // Atualizado para carregar a estrutura correta
import { executarSeed } from '../seed.js'; // Puxando o seed da raiz do projeto

const PORT = process.env.PORT || 3000;

async function iniciar() {
    try {
        console.log('[BANCO] Sincronizando tabelas com o banco de dados...');
        
        // Sincroniza limpando as tabelas antigas e gerando a nova estrutura de 'usuarios'
        await sequelize.sync({ force: true }); 
        console.log('✅ Banco de dados sincronizado e limpo com sucesso!');

        // Executa o seed injetando os dados de teste
        await executarSeed();

        // Inicializa o servidor Express
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
            console.log(`🔗 API base ativa em: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Falha crítica ao iniciar banco:', error);
        process.exit(1);
    }
}

iniciar();