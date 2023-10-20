const joi = require('joi')

const clienteSchema = joi.object({
    nome: joi.string().trim().required().pattern(/^[^0-9]*$/).messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório',
        'string.pattern.base': 'O campo nome não pode conter números',
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'O campo email é precisa ter um formato válido',
    }),
    cpf: joi.string().trim().min(11).max(11).required().messages({
        'any.required': "O campo 'CPF' é obrigatório",
        'string.empty': "O campo 'CPF' é obrigatório",
        'string.min': "Campo 'CPF' deve ter no minimo 11 caracteres",
        'string.max': "Campo 'CPF' deve ter no máximo 11 caracteres",
    }),
    cep: joi.string().trim().min(8).max(8).allow(null).messages({
        'string.base': 'O campo rua deve ser uma string',
        'string.empty': "O campo 'CEP' é opcional. Se você deseja informar um cep, por favor, escreva uma opção válida. Caso contrário, você pode deixá-lo null.",
        'string.min': "Campo 'CEP' deve ter no mínimo 8 caracteres",
        'string.max': "Campo 'CEP' deve ter no máximo 8 caracteres",
    }),
    rua: joi.string().trim().pattern(/^[^0-9]*$/).allow(null).messages({
        'string.base': 'O campo rua deve ser uma string',
        'string.empty': "O campo 'rua' é opcional. Se você deseja informar um rua, por favor, escreva uma opção válida. Caso contrário, você pode deixá-lo null.",
        'string.pattern.base': 'O campo rua não pode conter números'
    }),
    numero: joi.string().trim().allow(null).messages({
        'string.base': 'O campo número deve ser do tipo string',
        'string.empty': "O campo 'número' é opcional. Se você deseja informar um número, por favor, escreva uma opção válida. Caso contrário, você pode deixá-lo null."
    }),
    bairro: joi.string().trim().pattern(/^[^0-9]*$/).allow(null).messages({
        'string.base': 'O campo bairro deve ser uma string',
        'string.pattern.base': 'O campo bairro não pode conter números',
        'string.empty': "O campo 'bairro' é opcional. Se você deseja informar um bairro, por favor, escreva uma opção válida. Caso contrário, você pode deixá-lo null."
    }),
    cidade: joi.string().trim().pattern(/^[^0-9]*$/).allow(null).messages({
        'string.base': 'O campo cidade deve ser uma string',
        'string.pattern.base': 'O campo cidade não pode conter números',
        'string.empty': "O campo 'cidade' é opcional. Se você deseja informar um cidade, por favor, escreva uma opção válida. Caso contrário, você pode deixá-lo null."
    }),
    estado: joi.string().trim().min(2).max(2).pattern(/^[^0-9]*$/).allow(null).messages({
        'string.base': 'O campo estado deve ser uma string',
        'string.pattern.base': 'O campo estado não pode conter números',
        'string.empty': "O campo 'Estado' é opcional. Se você deseja informar um estado, por favor, escreva uma opção válida. Caso contrário, você pode deixá-lo null.",
        'string.min': "Campo 'estado' deve ter no mínimo 2 caracteres",
        'string.max': "Campo 'estado' deve ter no máximo 2 caracteres",
    }),
})

module.exports = clienteSchema
