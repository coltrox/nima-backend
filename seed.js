import bcrypt from 'bcrypt';
import Usuario from './src/modelos/Usuario.js'; // Caminho apontando corretamente para dentro de src/

export const executarSeed = async () => {
  console.log('[SEED] Iniciando homologação de contas padrão no ecossistema...');

  try {
    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash('Nima123*', saltRounds);

    const entidadesPadrao = [
      {
        nome: 'Desenvolvedor Nima',
        email: 'dev-nima@gmail.org',
        cpf: '00000000001',
        senha: senhaCriptografada,
        cargo: 'desenvolvedor'
      },
      {
        nome: 'ONG Patinhas Felizes',
        email: 'contato@gmail.org',
        cpf: '00000000002',
        senha: senhaCriptografada,
        cargo: 'ong'
      }
    ];

    for (const entidade of entidadesPadrao) {
      const usuarioExiste = await Usuario.findOne({
        where: { email: entidade.email }
      });

      if (!usuarioExiste) {
        await Usuario.create(entidade);
        console.log(`✅ [SEED] Usuário criado: [${entidade.cargo.toUpperCase()}] ${entidade.email}`);
      } else {
        console.log(`ℹ️ [SEED] Usuário já existente: [${entidade.cargo.toUpperCase()}] ${entidade.email}`);
      }
    }
    console.log('✅ [SEED] Processo de semente concluído com sucesso!');
  } catch (error) {
    console.error('❌ [SEED] Erro ao injetar dados padrão:', error);
  }
};