const knex = require("../../conexao");

const listarPedidos = async (req, res) => {
  try {
    const { cliente_id } = req.query;

    let consultaDePedidos = knex("pedidos")
      .select(
        "pedidos.id as pedido_id",
        "pedidos.valor_total",
        "pedidos.observacao",
        "pedidos.cliente_id"
      );

    if (cliente_id) {
      consultaDePedidos = consultaDePedidos.where("cliente_id", cliente_id);
    }

    const pedidosDoCliente = await consultaDePedidos;

    const listaDePedidos = [];

    for (const pedido of pedidosDoCliente) {
      const pedidoComProdutos = {
        pedido: {
          id: pedido.pedido_id,
          valor_total: pedido.valor_total,
          observacao: pedido.observacao,
          cliente_id: pedido.cliente_id,
        },
        pedido_produtos: [],
      };

      const produtosDoPedido = await knex("pedido_produtos")
        .select(
          "id",
          "quantidade_produto",
          "valor_produto",
          "pedido_id",
          "produto_id"
        )
        .where("pedido_id", pedido.pedido_id);

      pedidoComProdutos.pedido_produtos = produtosDoPedido;

      listaDePedidos.push(pedidoComProdutos);
    }

    return res.json(listaDePedidos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = listarPedidos
