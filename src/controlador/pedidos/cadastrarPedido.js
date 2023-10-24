const knex = require("../../conexao");

const cadastrarPedido = async (req, res) => {
  const { id } = req.usuario;
  const { cliente_id, observacao, pedido_produtos } = req.body;

  if (!Array.isArray(pedido_produtos)) {
    return res
      .status(400)
      .json({ mensagem: "O campo 'pedido_produtos' deve ser um array." });
  }

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
        return res.status(404).json({ mensagem: "Produto não encontrado. " });
      }

      if (quantidade_produto > produto.estoque) {
        return res.status(400).json({
          mensagem: "Quantidade em estoque insuficiente",
        });
      }

      produtosValidos.push({
        produto_id,
        quantidade_produto,
      });
    }

    // await knex("pedidos").insert({
    //   cliente_id,
    //   observacao,
    //   pedido_produtos,
    // });

    const pedido = {
      cliente_id,
      observacao,
      valor_total: 0,
    };

    const [pedidoId] = await knex("pedidos").insert(pedido);

    // Insira os produtos no pedido
    for (const produtoValido of produtosValidos) {
      await knex("pedido_produtos").insert({
        pedido_id: pedidoId,
        produto_id: produtoValido.produto_id,
        quantidade_produto: produtoValido.quantidade_produto,
      });
    }
    return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", error: error.mensagem });
  }
};

module.exports = cadastrarPedido;
