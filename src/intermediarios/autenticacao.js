import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export const verificarToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token não fornecido." });
    }

    const token = authHeader.split(' ')[1];

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ mensagem: "Sessão inválida ou expirada." });
        }

        // Passamos o ID do Supabase para a requisição
        req.usuarioId = user.id;
        next();
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro na autenticação." });
    }
};