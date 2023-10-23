const knex = require("../../conexao");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos, categoria_id } = req.body;

  try {
    const clienteExiste = await knex("clientes")
      .where({ id: cliente_id })
      .first();

    if (!clienteExiste) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    const existeProduto = await knex("produtos").where({ id }).first();

    if (!existeProduto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
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
