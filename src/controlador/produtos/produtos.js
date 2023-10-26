const knex = require("../../conexao");
const { uploadImagem, excluirImagem } = require("../../servicos-upload/uploadImagens");

const editarDadosProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;

  try {
    const existeProduto = await knex("produtos").where({ id }).first();

    if (!existeProduto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    const categoriaExiste = await knex('categorias').where({ id: categoria_id })
    if (categoriaExiste.length === 0) {
      return res.status(404).json({ mensagem: 'Categoria não existe' })
    }

    const produtoAtualizado = await knex("produtos").where({ id }).update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    if (produtoAtualizado === 0) {
      return res.status(400).json({ mensagem: "O produto não foi atualizado" });
    }

    return res
      .status(200)
      .json({ mensagem: "Atualização realizada com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor", error: error.message });
  }
};

const atualizarImagemProduto = async (req, res) => {
  const { id } = req.params;


  let produto;
  let imagem = { url: null }
  try {
    const produtoEncontrado = await knex('produtos').where({ id }).first();

    if (!produtoEncontrado) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    if (req.file) {
      const { originalname, mimetype, buffer } = req.file
      imagem = await uploadImagem(
        `produtos/${id}/${originalname}`,
        buffer,
        mimetype
      )

      await knex('produtos')
        .where({ id })
        .update({
          produto_imagem: imagem.url
        });
    } else if (produtoEncontrado.produto_imagem) {
      await excluirImagem(produtoEncontrado.produto_imagem);

      await knex('produtos')
        .where({ id })
        .update({
          produto_imagem: null
        });
    }

    if (produto) {
      produto[0].urlImagem = imagem.url;
    }

    return res.status(201).json({ mensagem: 'Produto atualizado com sucesso' })
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor", error: error.message });
  }

}


const detalharProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const existeProduto = await knex("produtos").where({ id }).first();

    if (!existeProduto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    const produtos = await knex("produtos").where({ id }).first();
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produtoEncontrado = await knex("produtos").where({ id }).first();

    if (!produtoEncontrado) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    const produtoComVinculoAoPedido = await knex('pedido_produtos').where('produto_id', id).first()

    if (produtoComVinculoAoPedido) {
      return res.status(400).json({ mensagem: "Não é possível excluir produto que está vinculado ao pedido" })
    }

    if (produtoEncontrado.produto_imagem) {
      await excluirImagem(produtoEncontrado.produto_imagem);
    }


    await knex('produtos').where({ id }).update({ produto_imagem: null })

    const produtoExcluido = await knex("produtos").where({ id }).del();

    if (produtoExcluido === 0) {
      return res.status(400).json({ mensagem: "O produto não foi excluido" });
    }

    return res.status(200).json({ mensagem: "Produto excluido com sucesso" });
  } catch (error) {
    return res.status(400).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  editarDadosProduto,
  detalharProduto,
  excluirProduto,
  atualizarImagemProduto
};
