const express = require("express");

const cadastrarUsuario = require("./controlador/cadastroUsuarios");
const listarCategorias = require("./controlador/listarCategorias");
const loginUsuario = require("./controlador/login");
const validarToken = require("./intermediarios/validarToken");
const atualizarUsuario = require("./controlador/atualizarUsuario");
const detalharUsuario = require("./controlador/detalharUsuario");
const validarRequisicao = require("./intermediarios/validarRequisicao");
const usuarioSchema = require("./validacoes/usuarios");
const loginSchema = require("./validacoes/loginSchema");
const editarCliente = require("./controlador/editarCliente");
const detalharCliente = require("./controlador/detalharCliente");


const editarDadosProduto = require("./controlador/produtos");

const rotas = express();

rotas.post("/usuario", validarRequisicao(usuarioSchema), cadastrarUsuario);
rotas.get("/categorias", listarCategorias);
rotas.post("/login", validarRequisicao(loginSchema), loginUsuario);

rotas.use(validarToken);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", validarRequisicao(usuarioSchema), atualizarUsuario);
rotas.put("/produto/:id", editarDadosProduto);

rotas.put('/cliente/:id', validarRequisicao(clienteSchema), editarCliente)
rotas.get('/cliente/:id', detalharCliente)

module.exports = rotas;
