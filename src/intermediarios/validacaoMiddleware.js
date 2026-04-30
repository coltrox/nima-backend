export const validarCadastroAnimal = (req, res, next) => {
    const { nome, especie, porte, nivel_energia } = req.body;

    if (!nome || !especie || !porte || !nivel_energia) {
        return res.status(400).json({ mensagem: "Campos obrigatórios faltando para o cadastro do animal." });
    }

    // Valida se o porte está dentro do ENUM que definimos no Animal.js
    const portesValidos = ['pequeno', 'medio', 'grande'];
    if (!portesValidos.includes(porte)) {
        return res.status(400).json({ mensagem: "Porte inválido." });
    }

    next();
};