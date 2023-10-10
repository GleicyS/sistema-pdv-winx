const express = require("express");

const cadastrarUsuario = require("./controlador/cadastroUsuarios");
const listarCategorias = require("./controlador/listarCategorias");

const rotas = express();

rotas.post("/usuarios", cadastrarUsuario);
rotas.get("/categorias", listarCategorias);

module.exports = rotas;
