import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRotas from './rotas/auth.rotas.js';
import questionarioRotas from './rotas/questionario.rotas.js'; // 1. Importa as novas rotas do questionário

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRotas);
app.use('/api/auth', questionarioRotas); // 2. Vincula ao mesmo prefixo esperado pelo seu authService.js

export default app;