export const tratadorErros = (err, req, res, next) => {
    console.error(err.stack); // Log para você ver no terminal

    const status = err.status || 500;
    const mensagem = err.message || "Ocorreu um erro interno no servidor.";

    res.status(status).json({
        erro: true,
        status,
        mensagem
    });
};