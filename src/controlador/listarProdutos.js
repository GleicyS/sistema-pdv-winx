const knex = require("../conexao");

const listarProdutos = async (req, res) => {
    const { categoria_id } = req.query;

    try {
        const produtos = await knex('produtos').where((query) => {
            if (categoria_id) {
                const { categoria_id } = req.params;
                return query.where('categoria_id', 'ilike', `%${categoria_id}%`)
            }
        })
        return res.status(200).json(produtos);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = listarProdutos;