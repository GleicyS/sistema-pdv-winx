const express = require("express");

const cadastrarUsuario = require("./controlador/usuarios/cadastroUsuarios");
const listarCategorias = require("./controlador/listarCategorias");
const loginUsuario = require("./controlador/usuarios/loginUsuario");
const validarToken = require("./intermediarios/validarToken");
const atualizarUsuario = require("./controlador/usuarios/atualizarUsuario");
const detalharUsuario = require("./controlador/usuarios/detalharUsuario");
const validarRequisicao = require("./intermediarios/validarRequisicao");
const usuarioSchema = require("./validacoes/usuarioSchema");
const loginSchema = require("./validacoes/loginSchema");
const editarCliente = require("./controlador/clientes/editarCliente");
const detalharCliente = require("./controlador/clientes/detalharCliente");
const clienteSchema = require("./validacoes/clienteSchema");
const cadastrarCliente = require("./controlador/clientes/cadastrarClientes");
const listarClientes = require("./controlador/clientes/listarClientes");
const produtoSchema = require("./validacoes/produtoSchema");
const cadastrarProduto = require("./controlador/produtos/cadastrarProdutos");
const listarProdutos = require("./controlador/produtos/listarProdutos")
const multer = require("./intermediarios/multer")

const {
  editarDadosProduto,
  detalharProduto,
  excluirProduto,
  atualizarImagemProduto,
} = require("./controlador/produtos/produtos");
const listarPedidos = require("./controlador/listarPedidos");
const pedidoSchema = require("./validacoes/pedidoSchema");
const cadastrarPedido = require("./controlador/pedidos/cadastrarPedido");

const rotas = express();

rotas.post("/usuario", validarRequisicao(usuarioSchema), cadastrarUsuario);
rotas.get("/categoria", listarCategorias);
rotas.post("/login", validarRequisicao(loginSchema), loginUsuario);

rotas.use(validarToken);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", validarRequisicao(usuarioSchema), atualizarUsuario);

rotas.post("/produto", multer.single('imagem'), validarRequisicao(produtoSchema), cadastrarProduto);
rotas.get("/produto", listarProdutos);
rotas.put("/produto/:id", validarRequisicao(produtoSchema), editarDadosProduto);
rotas.patch('/produto/:id/imagem', multer.single('imagem'), atualizarImagemProduto);

rotas.get("/produto/:id", detalharProduto);
rotas.delete("/produto/:id", excluirProduto);

rotas.post("/cliente", validarRequisicao(clienteSchema), cadastrarCliente);
rotas.get("/cliente", listarClientes);
rotas.put("/cliente/:id", validarRequisicao(clienteSchema), editarCliente);
rotas.get("/cliente/:id", detalharCliente);

rotas.post("/pedido", validarRequisicao(pedidoSchema), cadastrarPedido);

rotas.get("/pedido", listarPedidos)

module.exports = rotas;
