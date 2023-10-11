const bcrypt = require("bcrypt");
const knex = require("../conexao");

const atualizarUsuario = async (req, res) => {
    const userId = req.userId;
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json
            ({ mensagem: "Todos os campos são obrigatórios" });
    }

    try {
        const usuarioExiste = await knex("usuarios").where({ email }).first();

        if (usuarioExiste && usuarioExiste.id !== userId) {
            return res.status(400).json
                ({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuarioAtualizado = await knex("usuarios")
            .update({ nome, email, senha: senhaCriptografada })
            .where({ id: userId })
            .returning(["id", "nome", "email"]);

        return res.status(200).json(usuarioAtualizado);
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = atualizarUsuario;