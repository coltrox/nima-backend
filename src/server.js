import app from './app.js'; // ou a importação correspondente do seu Express
import sequelize from './config/database.js';
import './modelos/Tutor.js'; // Garante que o modelo do Tutor seja carregado

const PORT = process.env.PORT || 3000;

async function iniciar() {
    try {
        console.log('[BANCO] Sincronizando tabelas com o banco de dados...');
        
        // CORREÇÃO: Usamos o { force: true } temporariamente se houver quebra estrutural no SQLite.
        // Mude para { alter: true } ou remova os parâmetros após a primeira inicialização bem-sucedida.
        await sequelize.sync({ force: true }); 
        console.log('✅ Banco de dados sincronizado e limpo com sucesso!');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
            console.log(`🔗 API base: http://192.168.0.247:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Falha crítica ao iniciar banco:', error);
        process.exit(1);
    }
}

iniciar();