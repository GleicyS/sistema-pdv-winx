const joi = require('joi')

const produtoSchema = joi.object({
    descricao: joi.string().trim().required().pattern(/^[^0-9]*$/).messages({
        'any.required': 'O campo descrição é obrigatório',
        'string.base': 'O campo descrição deve ser uma string',
        'string.empty': 'O campo descrição é obrigatório',
        'string.pattern.base': 'O campo descrição não pode conter números',
    }),
    quantidade_estoque: joi.number().required().messages({
        'any.required': 'O campo quantidade em estoque é obrigatório',
        'number.base': 'O campo quantidade em estoque deve ser um número'
    }),
    valor: joi.number().required().messages({
        'any.required': 'O campo valor é obrigatório',
        'number.base': 'O campo valor deve ser um número'
    }),
    categoria_id: joi.number().required().messages({
        'any.required': 'O campo categoria é obrigatório',
        'number.base': 'O campo categoria_id deve ser um número'
    })
})

module.exports = produtoSchema