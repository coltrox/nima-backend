import { Router } from 'express';
import { verificarToken } from '../middlewares/autenticacao.js';
import { obterPerfil, atualizarPerfil } from '../controladores/TutorController.js';

const router = Router();

// O próprio usuário gerencia seu perfil
router.get('/perfil', verificarToken, obterPerfil);
router.put('/perfil', verificarToken, atualizarPerfil);

export default router;