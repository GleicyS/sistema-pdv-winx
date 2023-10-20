const knex = require('../../conexao')

const editarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body
    const { id } = req.params
    try {

        const clienteEncontrado = await knex('clientes').where({ id }).first()

        if (!clienteEncontrado) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' })
        }

        const emailDuplicado = await knex('clientes').where({ email }).whereNot({ id }).first()

        if (emailDuplicado) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' })
        }

        const cpfDuplicado = await knex('clientes').where({ cpf }).whereNot({ id }).first()

        if (cpfDuplicado) {
            return res.status(400).json({ mensagem: 'CPF já cadastrado' })
        }

        const atualizarCliente = await knex('clientes').where({ id }).update({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        })

        if (!atualizarCliente) {
            return res.status(400).json({ mensagem: 'Cliente não foi atualizado.' })
        }

        return res.status(200).json({ mensagem: 'Dados atualizados com sucesso.' })

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}


module.exports = editarCliente
