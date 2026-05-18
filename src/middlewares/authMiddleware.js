import jwt from 'jsonwebtoken';

// Use a mesma chave que está no seu AuthController
const JWT_SECRET = process.env.JWT_SECRET || 'nima_secret_key_2026';

export const verificarToken = (req, res, next) => {
    // Busca o token no cabeçalho Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        // Verifica se o token é válido e decodifica os dados (id e cargo)
        const decodificado = jwt.verify(token, JWT_SECRET);
        
        // Salva os dados no objeto da requisição para os controladores usarem
        req.userId = decodificado.id; 
        req.userCargo = decodificado.cargo; 

        next(); // Autoriza a continuação para a rota
    } catch (error) {
        return res.status(403).json({ message: "Token inválido ou expirado." });
    }
};