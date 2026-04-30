import axios from 'axios';
import Tutor from '../modelos/Tutor.js';
import Animal from '../modelos/Animal.js';
import Adocao from '../modelos/Adocao.js';

export const realizarMatchIA = async (req, res, next) => {
    try {
        const { animal_id } = req.body;
        const supabaseId = req.usuarioId;

        // 1. Busca dados completos do Tutor e do Animal
        const tutor = await Tutor.findOne({ where: { usuario_id: supabaseId } });
        const animal = await Animal.findByPk(animal_id);

        if (!tutor || !animal) {
            return res.status(404).json({ mensagem: "Tutor ou Animal não encontrado." });
        }

        // 2. Envia para o n8n (Substitua pela sua URL do n8n)
        const respostaN8N = await axios.post(process.env.N8N_WEBHOOK_URL, {
            tutor: {
                nome: tutor.nome,
                estilo_vida: tutor.estilo_vida,
                tipo_residencia: tutor.tipo_residencia,
                possui_telas: tutor.possui_telas,
                tempo_disponivel: tutor.tempo_disponivel
            },
            animal: {
                nome: animal.nome,
                especie: animal.especie,
                nivel_energia: animal.nivel_energia,
                idade_grupo: animal.idade_grupo
            }
        });

        // 3. Salva o rastro da solicitação na tabela Adocao
        const novaAdocao = await Adocao.create({
            tutor_id: tutor.id,
            animal_id: animal.id,
            status: 'analise',
            pontuacao_match: respostaN8N.data.score || 0, // Exemplo de retorno do n8n
            justificativa_ia: respostaN8N.data.justificativa || "Processando análise..."
        });

        res.status(200).json({
            mensagem: "Análise de match iniciada!",
            detalhes: novaAdocao
        });

    } catch (erro) {
        console.error("Erro ao conectar com n8n:", erro.message);
        next(erro);
    }
};