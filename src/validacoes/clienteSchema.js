const joi = require('joi')

const clienteSchema = joi.object({
    nome: joi.string().trim().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório',
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'O campo email é precisa ter um formato válido',
    }),
    cpf: joi.string().trim().min(11).max(11).required().messages({
        'any.required': 'O campo cpf é obrigatório',
        'string.empty': 'O campo cpf é obrigatório',
        'string.min': 'Campo deve ter no mínimo 11 caracteres',
        'string.max': 'Campo deve ter no mínimo 2 caracteres',
    }),
    cep: joi.string().allow(null).messages({ 'string.empty': "O campo 'CEP' é opcional. Se você deseja informar um cep, por favor, escreva uma opção válida. Caso contrário, você pode deixá-lo null." }),
    rua: joi.string().allow(null).messages({ 'string.empty': "O campo 'rua' é opcional. Se você deseja informar um rua, por favor, escreva uma opção válida. Caso contrário, você pode deixá-lo null." }),
    numero: joi.string().allow(null).messages({ 'string.empty': "O campo 'número' é opcional. Se você deseja informar um número, por favor, escreva uma opção válida. Caso contrário, você pode deixá-lo null." }),
    bairro: joi.string().allow(null).messages({ 'string.empty': "O campo 'bairro' é opcional. Se você deseja informar um bairro, por favor, escreva uma opção válida. Caso contrário, você pode deixá-lo null." }),
    cidade: joi.string().allow(null).messages({ 'string.empty': "O campo 'cidade' é opcional. Se você deseja informar um cidade, por favor, escreva uma opção válida. Caso contrário, você pode deixá-lo null." }),
    estado: joi.string().allow(null).messages({ 'string.empty': "O campo 'Estado' é opcional. Se você deseja informar um estado, por favor, escreva uma opção válida. Caso contrário, você pode deixá-lo null." }),
})

module.exports = clienteSchema
