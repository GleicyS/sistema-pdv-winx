const knex = require("../../conexao");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos, categoria_id } = req.body;

  try {
    const cpfEncontrado = await knex("clientes").where({ cpf }).first();

    if (cpfEncontrado) {
      return res.status(400).json({ mensagem: "O cpf já existe" });
    }

    await knex("produtos").insert({
      cliente_id,
      observacao,
      pedido_produtos,
      categoria_id,
    });

    return res.status(201).json({ mensagem: "Produto cadastrado com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", error: error.message });
  }
};

module.exports = cadastrarPedido;
