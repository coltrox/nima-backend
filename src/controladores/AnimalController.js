import Animal from '../modelos/Animal.js';

// Listar todos os animais (disponíveis primeiro)
export const listarAnimais = async (req, res, next) => {
    try {
        const animais = await Animal.findAll({
            order: [['status', 'ASC'], ['createdAt', 'DESC']]
        });
        res.status(200).json(animais);
    } catch (erro) {
        next(erro);
    }
};

// Detalhar um animal específico
export const detalharAnimal = async (req, res, next) => {
    try {
        const { id } = req.params;
        const animal = await Animal.findByPk(id);

        if (!animal) {
            return res.status(404).json({ mensagem: "Animal não encontrado." });
        }

        res.status(200).json(animal);
    } catch (erro) {
        next(erro);
    }
};

// Cadastrar um novo animal
export const cadastrarAnimal = async (req, res, next) => {
    try {
        // No futuro, se usar Multer, a foto virá em req.file
        const { 
            nome, especie, porte, nivel_energia, 
            bom_com_criancas, bom_com_outros_pets, 
            idade_grupo, temperamento, descricao, ong_id 
        } = req.body;

        const novoAnimal = await Animal.create({
            nome,
            especie,
            porte,
            nivel_energia,
            bom_com_criancas,
            bom_com_outros_pets,
            idade_grupo,
            temperamento,
            descricao,
            ong_id,
            status: 'disponivel'
        });

        res.status(201).json({
            mensagem: "Animal cadastrado com sucesso!",
            animal: novoAnimal
        });
    } catch (erro) {
        next(erro);
    }
};

// Deletar um animal
export const deletarAnimal = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletado = await Animal.destroy({ where: { id } });

        if (!deletado) {
            return res.status(404).json({ mensagem: "Animal não encontrado para exclusão." });
        }

        res.status(200).json({ mensagem: "Animal removido com sucesso." });
    } catch (erro) {
        next(erro);
    }
};