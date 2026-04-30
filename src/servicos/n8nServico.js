import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const dispararAnaliseN8N = async (dadosTutor, listaAnimais) => {
    const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

    try {
        const resposta = await axios.post(WEBHOOK_URL, {
            tutor: dadosTutor,
            animais_disponiveis: listaAnimais
        });

        // O n8n deve retornar o JSON com o match
        return resposta.data; 
    } catch (erro) {
        console.error("Erro ao chamar o n8n:", erro.message);
        throw new Error("Falha na comunicação com o motor de IA.");
    }
};