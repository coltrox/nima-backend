import Tutor from '../modelos/Tutor.js';

// Busca ou Cria o perfil do tutor após o login no Supabase
export const obterOuCriarPerfil = async (req, res, next) => {
    try {
        const { email } = req.body; // O email pode vir do frontend após o login
        const supabaseId = req.usuarioId; // Vem do middleware verificarToken

        // Tenta encontrar, se não existir, cria
        const [perfil, criado] = await Tutor.findOrCreate({
            where: { usuario_id: supabaseId },
            defaults: {
                email: email,
                cargo: 'tutor' // Cargo padrão inicial
            }
        });

        res.status(200).json({
            mensagem: criado ? "Perfil criado com sucesso." : "Perfil recuperado.",
            perfil
        });
    } catch (erro) {
        next(erro);
    }
};

// Atualiza os dados do formulário (estilo de vida, etc)
export const atualizarPerfil = async (req, res, next) => {
    try {
        const supabaseId = req.usuarioId;
        const dadosAtualizados = req.body;

        await Tutor.update(dadosAtualizados, {
            where: { usuario_id: supabaseId }
        });

        res.status(200).json({ mensagem: "Perfil atualizado com sucesso!" });
    } catch (erro) {
        next(erro);
    }
};