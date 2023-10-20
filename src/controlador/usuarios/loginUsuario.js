const knex = require("../../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senha_JWT = require("../../senha_JWT");

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuarioEncontrado = await knex("usuarios").where({ email }).first();

    if (!usuarioEncontrado)
      return res
        .status(401)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });

    const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha);

    if (!senhaValida)
      return res
        .status(401)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });

    const token = jwt.sign({ id: usuarioEncontrado.id }, senha_JWT, {
      expiresIn: "1d",
    });

    const { senha: _, ...usuario } = usuarioEncontrado;

    return res.status(200).json({
      usuario,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", error: error.message });
  }
};

module.exports = loginUsuario;
