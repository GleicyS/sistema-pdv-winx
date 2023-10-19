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

const cadastrarCliente = require("./controlador/cadastrarClientes");
const clienteSchema = require("./validacoes/clienteSchema");
const cadastrarProduto = require("./controlador/cadastrarProdutos");
const produtoSchema = require("./validacoes/produtoSchema");
const listarClientes = require("./controlador/listarClientes")
const listarProdutos = require("./controlador/listarProdutos")

const editarDadosProduto = require("./controlador/produtos");

const rotas = express();

rotas.post("/usuario", validarRequisicao(usuarioSchema), cadastrarUsuario);
rotas.get("/categorias", listarCategorias);
rotas.post("/login", validarRequisicao(loginSchema), loginUsuario);

rotas.use(validarToken);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", validarRequisicao(usuarioSchema), atualizarUsuario);
rotas.put("/produto/:id", editarDadosProduto);

rotas.get("/cliente", listarClientes);
rotas.post("/cliente", validarRequisicao(clienteSchema), cadastrarCliente);
rotas.get("/cliente", listarProdutos);
rotas.post("/produto", validarRequisicao(produtoSchema), cadastrarProduto);

module.exports = rotas;
