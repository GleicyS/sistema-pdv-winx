const knex = require("../../conexao");
const { uploadImagem } = require("../../servicos-upload/uploadImagens");


const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;


    const categoriaExiste = await knex('categorias').where({ id: categoria_id })

    if (categoriaExiste.length === 0) {
        return res.status(404).json({ mensagem: 'Categoria não existe' })
    }

    let imagem = { url: null };
    try {
        let produto = await knex('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }).returning('*')

        if (!produto) {
            return res.status(400).json('O produto não foi cadastrado');
        }

        const id = produto[0].id

        if (req.file) {
            const { originalname, mimetype, buffer } = req.file
            imagem = await uploadImagem(
                `produtos/${id}/${originalname}`,
                buffer,
                mimetype
            )
        }

        produto = await knex('produtos').update({
            produto_imagem: imagem.url
        }).where({ id }).returning('*')

        produto[0].urlImagem = imagem.url


        return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso' })
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor", error: error.message });
    }

}

module.exports = cadastrarProduto