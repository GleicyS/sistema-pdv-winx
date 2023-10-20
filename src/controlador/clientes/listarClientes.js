const knex = require("../../conexao");

const listarClientes = async (req, res) => {
  try {
    const clientes = await knex('clientes').select('id', 'nome', 'email', 'cpf', knex.raw(`COALESCE(cep, 'Não informado') as cep, 
    COALESCE(rua, 'Não informado') as rua,
   COALESCE(numero, 'Não informado') as numero, COALESCE(bairro, 'Não informado') as bairro, COALESCE(cidade, 'Não informado') as cidade, 
   COALESCE(estado, 'Não informado') as estado`))
    return res.json(clientes);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = listarClientes;

