import express from 'express';
import { salvarQuestionario } from '../controladores/questionarioController.js';
import { verificarToken as authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Define o endpoint protegido por autenticação JWT
router.post('/complete-profile', authMiddleware, salvarQuestionario);

export default router;