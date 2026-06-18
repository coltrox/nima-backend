import Questionario from '../modelos/Questionario.js';

export const salvarQuestionario = async (req, res) => {
  try {
    // O authMiddleware injeta o userId no req
    const tutorId = req.userId;

    if (!tutorId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const incomingAnswers = req.body;

    if (!incomingAnswers || Object.keys(incomingAnswers).length === 0) {
      return res.status(400).json({ message: "Nenhuma resposta enviada." });
    }

    // Mapeamento dos IDs numéricos do front para os campos do Sequelize
    const dadosMapeados = {
      tutorId: tutorId,
      tempoSozinho: incomingAnswers['1'],
      nivelEnergia: incomingAnswers['2'],
      frequenciaPasseios: incomingAnswers['3'],
      principalResponsavel: incomingAnswers['4'],
      tipoResidencia: incomingAnswers['5'],
      ambienteSeguroFugas: incomingAnswers['6'],
      acessoInteriorCasa: incomingAnswers['7'],
      existemCriancas: incomingAnswers['8'],
      faixaEtariaCriancas: incomingAnswers['9'] || 'Não se aplica',
      outrosAnimais: incomingAnswers['10'],
      preferenciaEspecie: incomingAnswers['11'],
      portePreferido: incomingAnswers['12'],
      idadePreferida: incomingAnswers['13'],
      alergiaPelos: incomingAnswers['14'],
      reservaCustosVet: incomingAnswers['15'],
      planejamentoViagens: incomingAnswers['16'],
      jaTeveAnimais: incomingAnswers['17'],
      classificacaoExperiencia: incomingAnswers['18'],
      motivoAdocao: incomingAnswers['19'],
      cienteResponsabilidade: incomingAnswers['20']
    };

    // Lógica para Criar ou Atualizar (Upsert) usando Sequelize
    const [questionario, criado] = await Questionario.findOrCreate({
      where: { tutorId: tutorId },
      defaults: dadosMapeados
    });

    if (!criado) {
      // Se já existia, atualiza os dados
      await questionario.update(dadosMapeados);
    }

    return res.status(200).json({
      message: "Questionário processado e salvo com sucesso!",
      success: true,
      data: questionario
    });

  } catch (error) {
    console.error("Erro no controlador do questionário:", error);
    return res.status(500).json({ 
      message: "Erro interno no servidor ao salvar respostas.",
      error: error.message 
    });
  }
};