const knex = require("../../conexao");

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {

        const categoriaExiste = await knex('categorias').where({ id: categoria_id })

        if (categoriaExiste.length === 0) {
            return res.status(404).json({ mensagem: 'Categoria não existe' })
        }

        await knex('produtos').
            insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            })

        return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso' })
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor", error: error.message });
    }

}

module.exports = cadastrarProduto