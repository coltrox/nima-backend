import Tutor from '../modelos/Tutor.js';

export const permitirCargos = (...cargosPermitidos) => {
    return async (req, res, next) => {
        try {
            // Buscamos o registro no nosso banco usando o ID do Supabase
            const perfil = await Tutor.findOne({ where: { usuario_id: req.usuarioId } });

            if (!perfil) {
                return res.status(404).json({ mensagem: "Perfil não encontrado no sistema." });
            }

            if (!cargosPermitidos.includes(perfil.cargo)) {
                return res.status(403).json({ 
                    mensagem: `Acesso negado. Esta função é restrita a: ${cargosPermitidos.join(', ')}` 
                });
            }

            // Anexamos o perfil completo para usar nos controladores se precisar (ex: pegar o tutor_id)
            req.perfilAtivo = perfil;
            next();
        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro ao verificar permissões." });
        }
    };
};