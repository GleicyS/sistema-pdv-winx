const bcrypt = require("bcrypt");
const knex = require("../conexao");

const detalharUsuario = async (req, res) => {
    const userId = req.userId;

    try {
        const usuario = await knex("usuarios")
            .select("id", "nome", "email")
            .where("id", userId)
            .first();

        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao buscar o usuário." });
    }
};

module.exports = detalharUsuario;