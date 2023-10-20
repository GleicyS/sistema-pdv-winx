const bcrypt = require("bcrypt");
const knex = require("../../conexao");

const atualizarUsuario = async (req, res) => {
    const { id } = req.usuario;
    const { nome, email, senha } = req.body;

    try {
        const usuarioExiste = await knex("usuarios").where({ email }).first();

        if (usuarioExiste && usuarioExiste.id !== id) {
            return res.status(400).json
                ({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuarioAtualizado = await knex("usuarios")
            .update({ nome, email, senha: senhaCriptografada })
            .where({ id })
            .returning(["id", "nome", "email"]);

        return res.status(200).json(usuarioAtualizado[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = atualizarUsuario;