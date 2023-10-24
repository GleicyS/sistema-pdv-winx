const knex = require("../../conexao");

const cadastrarPedido = async (req, res) => {
  const { id } = req.usuario;
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const clienteExiste = await knex("clientes")
      .where({ id: cliente_id })
      .first();

    if (!clienteExiste) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    const produtosValidos = [];
    for (const pedido_produto of pedido_produtos) {
      const { produto_id, quantidade_produto } = pedido_produto;

      const produto = await knex("produtos").where({ id: produto_id }).first();
      if (!produto) {
        return res
          .status(404)
          .json({ message: `Produto com ID ${produto_id} não encontrado.` });
      }

      if (quantidade_produto > produto.estoque) {
        return res.status(400).json({
          message: `Quantidade em estoque insuficiente para o produto com ID ${produto_id}.`,
        });
      }

      produtosValidos.push({
        produto_id,
        quantidade_produto,
      });
    }

    await knex("pedidos").insert({
      cliente_id,
      observacao,
      pedido_produtos,
    });

    return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", error: error.message });
  }
};

module.exports = cadastrarPedido;
