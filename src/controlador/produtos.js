const knex = require("../conexao");

const editarDadosProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.usuario;

  try {
    const existeProduto = await knex("produtos").where({ id }).first();

    if (!existeProduto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    const produtoAtualizado = await knex("produtos").where({ id }).update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    if (produtoAtualizado === 0) {
      return res.status(400).json("O produto não foi atualizado");
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = editarDadosProduto;
