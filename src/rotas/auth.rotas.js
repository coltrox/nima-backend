import { Router } from 'express';
import { AuthController } from '../controladores/AuthController.js';

const router = Router();

// Rota de Registro
router.post('/register', AuthController.register);

// Rota de Login
router.post('/login', AuthController.login);

// Fluxo de Recuperação de Senha
router.post('/forgot-password', AuthController.forgotPassword); // Esta era a causadora do erro
router.post('/verify-code', AuthController.verifyCode);
router.post('/reset-password', AuthController.resetPassword);

export default router;