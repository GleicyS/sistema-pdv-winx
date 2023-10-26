const joi = require('joi')

const usuarioSchema = joi.object({
    nome: joi.string().trim().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório',
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'O campo email é precisa ter um formato válido',
    }),
    senha: joi.string().trim().required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha é obrigatório',
    })
})

module.exports = usuarioSchema