import app from './app.js';
import sequelize from './config/database.js';
import './modelos/Tutor.js';


const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    await sequelize.authenticate();
    // alter: true sincroniza as colunas sem apagar os dados existentes
    await sequelize.sync({ alter: true }); 
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Nima Backend rodando em http://192.168.0.233:${PORT}`);
    });
  } catch (e) { 
    console.error("❌ Falha crítica ao iniciar banco:", e); 
  }
}
iniciar();