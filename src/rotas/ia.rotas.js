import { Router } from 'express';
import { verificarToken } from '../middlewares/autenticacao.js';
import { permitirCargos } from '../middlewares/autorizacao.js';
import { realizarMatchIA } from '../controladores/IAController.js';

const router = Router();

// Dispara a análise de compatibilidade (Tutor ou Admin)
router.post('/analisar', 
    verificarToken, 
    permitirCargos('tutor', 'admin'), 
    realizarMatchIA
);

export default router;