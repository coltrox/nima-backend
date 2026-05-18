import { Router } from 'express';
import { AuthController } from '../controladores/AuthController.js';
import { verificarToken } from '../middlewares/authMiddleware.js'; // Importação necessária para proteger a rota

const router = Router();

// Rota de Registro - Agora permite enviar o 'cargo' no JSON
router.post('/register', AuthController.register);

// Rota de Login - Retorna o 'cargo' para o frontend redirecionar para a tela certa
router.post('/login', AuthController.login);

/**
 * Nova Rota para buscar o perfil logado.
 * O frontend (homeService.js) já está configurado para chamar esta rota.
 * É essencial usar o 'verificarToken' para garantir que req.userId seja preenchido.
 */
router.get('/profile', verificarToken, AuthController.getProfile);

// Fluxo de Recuperação de Senha
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/verify-code', AuthController.verifyCode);
router.post('/reset-password', AuthController.resetPassword);

export default router;