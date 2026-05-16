import Tutor from '../modelos/Tutor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

const JWT_SECRET = process.env.JWT_SECRET || 'nima_secret_key_2026';

export const AuthController = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            console.log(`[BACKEND] Tentativa de registro: ${email}`);

            const existe = await Tutor.findOne({ where: { email } });
            if (existe) return res.status(400).json({ message: "E-mail já cadastrado" });

            const hashedPassword = await bcrypt.hash(password, 10);
            const novoTutor = await Tutor.create({
                nome: username,
                email,
                senha: hashedPassword,
                cargo: 'tutor'
            });

            res.status(201).json({ message: "Conta criada!", id: novoTutor.id });
        } catch (error) {
            console.error("ERRO NO REGISTRO:", error);
            res.status(500).json({ message: "Erro interno no servidor", error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Busca por email ou pelo nome de usuário
            const tutor = await Tutor.findOne({ 
                where: {
                    [Op.or]: [{ email: email }, { nome: email }]
                } 
            });

            if (!tutor || !(await bcrypt.compare(password, tutor.senha))) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }

            const token = jwt.sign(
                { id: tutor.id, cargo: tutor.cargo },
                JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.json({ 
                token, 
                user: { id: tutor.id, nome: tutor.nome, email: tutor.email } 
            });
        } catch (error) {
            console.error("ERRO NO LOGIN:", error);
            res.status(500).json({ error: "Erro interno no login" });
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const tutor = await Tutor.findOne({ where: { email } });
            if (!tutor) return res.status(404).json({ message: "E-mail não encontrado" });

            const code = Math.floor(100000 + Math.random() * 900000).toString();
            const expiracao = new Date(Date.now() + 15 * 60000);

            await tutor.update({ reset_token: code, reset_token_expira: expiracao });
            console.log(`🔑 Código para ${email}: ${code}`);
            res.json({ message: "Código enviado!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao gerar código" });
        }
    },

    verifyCode: async (req, res) => {
        try {
            const { email, code } = req.body;
            const tutor = await Tutor.findOne({ where: { email, reset_token: code } });

            if (!tutor || tutor.reset_token_expira < new Date()) {
                return res.status(400).json({ message: "Código inválido ou expirado" });
            }

            res.json({ message: "Código válido" });
        } catch (error) {
            res.status(500).json({ error: "Erro na verificação" });
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { email, code, password } = req.body;
            const tutor = await Tutor.findOne({ where: { email, reset_token: code } });

            if (!tutor || tutor.reset_token_expira < new Date()) {
                return res.status(400).json({ message: "Dados inválidos" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await tutor.update({
                senha: hashedPassword,
                reset_token: null,
                reset_token_expira: null
            });

            res.json({ message: "Senha redefinida!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao resetar senha" });
        }
    }
};