const knex = require("../conexao");

const listarProdutos = async (req, res) => {
    const { categoria_id } = req.query;

    try {
        const produtos = await knex('produtos').where((query) => {
            if (categoria_id) {
                return query.where('categoria_id', 'ilike', `%${categoria_id}%`);
            } else {
                return query;
            }
        });

        return res.json(produtos);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = listarProdutos;
