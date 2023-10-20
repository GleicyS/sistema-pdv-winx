const knex = require("../../conexao");

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {

        const cpfEncontrado = await knex("clientes").where({ cpf }).first();

        if (cpfEncontrado) {
            return res.status(400).json({ mensagem: "O cpf já existe" });
        }

        const emailEncontrado = await knex("clientes").where({ email }).first();

        if (emailEncontrado) {
            return res.status(400).json({ mensagem: "O email já existe" });
        }

        await knex("clientes")
            .insert({
                nome,
                email,
                cpf,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                estado
            });

        return res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso' });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor", error: error.message });
    }
};

module.exports = cadastrarCliente;

