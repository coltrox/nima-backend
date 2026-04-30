import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false, // Define como true se quiser ver as queries no console
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Necessário para conexões externas com o Supabase
            }
        }
    }
);

export default sequelize;