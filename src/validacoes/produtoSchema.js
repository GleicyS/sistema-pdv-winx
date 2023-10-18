const joi = require('joi')

const produtoSchema = joi.object({
    descricao: joi.string().trim().required().messages({
        'any.required': 'O campo descrição é obrigatório',
        'string.empty': 'O campo descrição é obrigatório',
    }),
    quantidade_estoque: joi.number().required().messages({
        'any.required': 'O campo quantidade em estoque é obrigatório',
        'string.empty': 'O campo quantidade em estoque é obrigatório',
    }),
    valor: joi.number().required().messages({
        'any.required': 'O campo valor é obrigatório',
        'string.empty': 'O campo valor é obrigatório'
    }),
    categoria_id: joi.number().required().messages({
        'any.required': 'O campo categoria é obrigatório',
        'string.empty': 'O campo categoria é obrigatório'
    })
})

module.exports = produtoSchema