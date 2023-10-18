const jwt = require("jsonwebtoken");
const knex = require("../conexao");
const senha_JWT = require("../senha_JWT");

const validarToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não autorizado." });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, senha_JWT);

    const usuarioEncontrado = await knex("usuarios").where({ id }).first();

    if (!usuarioEncontrado) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    const { senha, ...usuario } = usuarioEncontrado;

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = validarToken;
