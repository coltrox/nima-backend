import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Importação das rotas
import animalRotas from './rotas/animal.rotas.js';
import iaRotas from './rotas/ia.rotas.js';
import tutorRotas from './rotas/tutor.rotas.js';

// Importação do middleware de erro
import { tratadorErros } from './middlewares/erroMiddleware.js';

dotenv.config();

const app = express();

// Middlewares de Segurança e Parsing
app.use(helmet());
app.use(cors());
app.use(express.json());

// Definição das Rotas
app.use('/animais', animalRotas);
app.use('/ia', iaRotas);
app.use('/tutores', tutorRotas);

// Middleware de Erro (Deve ser o último)
app.use(tratadorErros);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor Nima rodando na porta ${PORT}`);
});

export default app;