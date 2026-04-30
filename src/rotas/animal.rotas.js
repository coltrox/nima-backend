import { Router } from 'express';
import { verificarToken } from '../middlewares/autenticacao.js';
import { permitirCargos } from '../middlewares/autorizacao.js';
import { 
    listarAnimais, 
    cadastrarAnimal, 
    detalharAnimal, 
    deletarAnimal 
} from '../controladores/AnimalController.js';

const router = Router();

// Qualquer usuário logado pode ver a lista e detalhes
router.get('/', verificarToken, listarAnimais);
router.get('/:id', verificarToken, detalharAnimal);

// Apenas ONGs e Admins podem inserir ou remover animais
router.post('/', 
    verificarToken, 
    permitirCargos('admin_ong', 'admin'), 
    cadastrarAnimal
);

router.delete('/:id', 
    verificarToken, 
    permitirCargos('admin_ong', 'admin'), 
    deletarAnimal
);

export default router;