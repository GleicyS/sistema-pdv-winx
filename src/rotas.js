const express = require("express");

const cadastrarUsuario = require("./controlador/cadastroUsuarios");
const listarCategorias = require("./controlador/listarCategorias");
const loginUsuario = require("./controlador/login");
const validarToken = require("./intermediarios/validarToken");
const atualizarUsuario = require("./controlador/atualizarUsuario");
const detalharUsuario = require("./controlador/detalharUsuario");

const rotas = express();

rotas.post("/usuarios", cadastrarUsuario);
rotas.get("/categorias", listarCategorias);
rotas.post("/login", loginUsuario);

rotas.use(validarToken);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", atualizarUsuario);

module.exports = rotas;
