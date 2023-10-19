const knex = require("../conexao");

const listarProdutos = async (req, res) => {
    const { categoria_id } = req.query;
    try {
        let produtos;

        if (categoria_id) {
            produtos = await knex('produtos').where({ categoria_id: categoria_id })
        } else {
            produtos = await knex('produtos')
        }

        if (produtos.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum produto encontrado." })
        } else {
            return res.status(200).json(produtos)
        }

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = listarProdutos;
