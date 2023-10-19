const knex = require("../conexao");

const listarClientes = async (req, res) => {
  try {
    const clientes = await knex("clientes");
    return res.json(clientes);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = listarClientes;