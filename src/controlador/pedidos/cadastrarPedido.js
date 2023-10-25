const knex = require("../../conexao");
const transportador = require("../../servicos/nodemailer");
const compiladorHTML = require("../../utils/compiladorHTML");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const clienteExiste = await knex("clientes")
      .where({ id: cliente_id })
      .first();

    if (!clienteExiste) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    const produtosValidos = [];
    let valorTotal = 0;

    for (const pedido_produto of pedido_produtos) {
      const { produto_id, quantidade_produto } = pedido_produto;

      const produtoExiste = await knex("produtos")
        .where({ id: produto_id })
        .first();

      if (!produtoExiste) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
      }

      if (quantidade_produto > produtoExiste.quantidade_estoque) {
        return res.status(400).json({
          mensagem: `Quantidade em estoque insuficiente do produto de id ${produtoExiste.id}`,
        });
      }

      produtosValidos.push({
        produto_id: produtoExiste.id,
        quantidade_produto,
        valor_produto: produtoExiste.valor,
      });
      valorTotal += produtoExiste.valor * quantidade_produto;
    }

    const cadastroPedido = await knex("pedidos")
      .insert({
        cliente_id,
        observacao,
        valor_total: valorTotal,
      })
      .returning("*");

    const pedidoId = Array.isArray(cadastroPedido)
      ? cadastroPedido[0]
      : cadastroPedido;

    if (!pedidoId) {
      //aqui que está dando erro, ao inserir o pedido_id na tabela pedido_produtos
      return res.status(500).json({
        mensagem: "Erro interno do servidor ao criar o pedido",
      });
    }

    for (const produto of produtosValidos) {
      await knex("pedido_produtos").insert({
        pedido_id: pedidoId,
        produto_id: produto.produto_id,
        quantidade_produto: produto.quantidade_produto,
        valor_produto: produto.valor_produto,
      });
    }

    const html = await compiladorHTML("./src/templates/pedidoEfetuado.html", {
      nomeCliente: clienteExiste.nome,
      numeroPedido,
      valorTotal,
      observacao,
    });

    transportador.sendMail({
      from: `${process.env.EMAIL_NAME} <$process.env.EMAIL_FROM>`,
      to: `${clienteExiste.nome} <$clienteExiste.email>`,
      subject: "Pedido realizado com sucesso",
      html,
    });

    return res.status(201).json({ mensagem: "Pedido realizado com sucesso" });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno do servidor",
      error: error.message,
    });
  }
};

module.exports = cadastrarPedido;
