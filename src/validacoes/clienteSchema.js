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
    cep: joi.string().allow(''),
    rua: joi.string().allow(''),
    numero: joi.string().allow(''),
    bairro: joi.string().allow(''),
    cidade: joi.string().allow(''),
    estado: joi.string(),
})

module.exports = clienteSchema
