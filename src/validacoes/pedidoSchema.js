const joi = require("joi");

const pedidoSchema = joi.object({
  cliente_id: joi.number().required().messages({
    "any.required": "O campo categoria_id é obrigatório",
    "number.base": "O campo categoria_id deve ser uma number",
  }),
  observacao: joi.string().messages({
    "string.empty": "O campo observação está vazio",
  }),
  pedido_produtos: joi
    .array()
    .items(
      joi.object({
        produto_id: joi.number().required().messages({
          "any.required": "O campo produto_id é obrigatório",
          "number.base": "O campo produto_idd deve ser um número",
        }),
        quantidade_produto: joi.number().required().messages({
          "any.required": "O campo quantidade_produto é obrigatório",
          "number.base": "O campo quantidade_produto deve ser um número",
        }),
      })
    )
    .required(),
});

module.exports = pedidoSchema;
