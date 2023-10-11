const jwt = require("jsonwebtoken");
const passwordJWT = require("../passwordJWT");
const knex = require("../conexao");

const validarToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json
            ({ mensagem: "Não autorizado." });
    }

    const token = authorization.split(" ")[1];

    try {
        const { id } = jwt.verify(token, passwordJWT);

        const usuario = await knex("usuarios").where({ id }).first();

        if (!usuario) {
            return res.status(404).json
                ({ mensagem: "Usuário não encontrado." });
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(401).json
            ({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }
};

module.exports = validarToken;