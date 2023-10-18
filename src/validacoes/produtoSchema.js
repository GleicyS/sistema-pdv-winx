const joi = require("joi");

const produtoSchema = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O campo descricao é obrigatório",
    "string.empty": "O campo descricao é obrigatório",
  }),
  quantidade_estoque: joi.string().email().required().messages({
    "any.required": "O campo quantidade_estoque é obrigatório",
    "number.base": "O campo quantidade_estoque é obrigatório",
  }),
  valor: joi.string().required().messages({
    "any.required": "O campo valor é obrigatório",
    "number.base": "O campo valor é obrigatório",
  }),
  categoria_id: joi.string().required().messages({
    "any.required": "O campo categoria_id é obrigatório",
    "number.base": "O campo categoria_id é obrigatório",
  }),
});

module.exports = produtoSchema;
