const knex = require("../../conexao");

const listarProdutos = async (req, res) => {
    const { categoria_id } = req.query;
    try {

        if (categoria_id) {
            const categorias = Array.isArray(categoria_id) ? categoria_id : [categoria_id]
            produtos = await knex('produtos').whereIn('categoria_id', categorias)
        } else {
            produtos = await knex('produtos')
        }
        return res.status(200).json(produtos)

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = listarProdutos;