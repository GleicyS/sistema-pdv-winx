const express = require("express");

const cadastrarUsuario = require("./controlado/cadastrarUsuarios.js");
const listarCategorias = require("./controlado/istarCategorias.js");

const rotas = express();

rotas.post("/usuarios", cadastrarUsuario);
rotas.get("/categorias", listarCategorias);

module.exports = rotas;
