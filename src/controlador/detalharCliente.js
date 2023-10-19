const knex = require('../conexao')


const detalharCliente = async (req, res) => {
    const { id } = req.params

    try {
        const clienteEncontrado = await knex('clientes').select('nome', 'email', 'cpf', knex.raw(`COALESCE(cep, 'Não informado') as cep, 
         COALESCE(rua, 'Não informado') as rua,
        COALESCE(numero, 'Não informado') as numero, COALESCE(bairro, 'Não informado') as bairro, COALESCE(cidade, 'Não informado') as cidade, 
        COALESCE(estado, 'Não informado') as estado`)).where({ id }).first()

        if (!clienteEncontrado) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' })
        }

        return res.status(200).json(clienteEncontrado)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

module.exports = detalharCliente