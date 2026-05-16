import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRotas from './rotas/auth.rotas.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRotas);

export default app;