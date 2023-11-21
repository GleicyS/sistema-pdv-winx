# Sistema PDV Winx

Bem-vindo ao projeto da API para o PDV (Ponto de Venda). Este repositório contém uma API desenvolvida para um sistema de frente de caixa, com funcionalidades relacionadas a categorias, clientes, pedidos, produtos e usuários.

## Descrição do Projeto

Este projeto foi desenvolvido como parte do desafio do Módulo 5. O objetivo é criar uma API robusta para um PDV, sendo este um projeto piloto com a possibilidade de implementação de outras funcionalidades no futuro.

## Banco de Dados

### 1ª Sprint

Na primeira etapa, o foco está na criação do banco de dados PostgreSQL chamado "pdv" com as tabelas "usuarios" e "categorias". O arquivo SQL necessário para a criação das tabelas e inserção das categorias está disponível no projeto.

#### Tabelas:

- `usuarios`:
  - id
  - nome
  - email (único)
  - senha

- `categorias`:
  - id
  - descricao

### 2ª Sprint

A segunda sprint adiciona as tabelas "produtos" e "clientes" ao banco de dados.

#### Tabelas:

- `produtos`:
  - id
  - descricao
  - quantidade_estoque
  - valor
  - categoria_id

- `clientes`:
  - id
  - nome
  - email (único)
  - cpf (único)
  - cep
  - rua
  - numero
  - bairro
  - cidade
  - estado

## Requisitos Obrigatórios

- A API deve acessar o banco de dados "pdv" para persistir e manipular dados.
- Os campos `id` das tabelas devem ser autoincremento, chave primária e não editáveis após a criação.
- Valores monetários devem ser representados em centavos.
- Utilização de status codes padrão para respostas da API.

## Funcionalidades

### 1ª Sprint

- **Listar Categorias**
  - `GET /categoria`: Retorna a lista de todas as categorias cadastradas.

- **Cadastrar Usuário**
  - `POST /usuario`: Rota para cadastrar um novo usuário no sistema.

- **Efetuar Login do Usuário**
  - `POST /login`: Permite que um usuário cadastrado faça login no sistema.

- **Detalhar Perfil do Usuário Logado**
  - `GET /usuario`: Permite ao usuário logado visualizar os dados do seu próprio perfil.

- **Editar Perfil do Usuário Logado**
  - `PUT /usuario`: Permite ao usuário logado atualizar informações do seu próprio cadastro.

- **Efetuar Deploy da Aplicação**
  - Fazer deploy do projeto e disponibilizar a URL.

### 2ª Sprint

- **Cadastrar Produto**
  - `POST /produto`: Permite ao usuário logado cadastrar um novo produto no sistema.

- **Editar Dados do Produto**
  - `PUT /produto/:id`: Permite ao usuário logado atualizar as informações de um produto cadastrado.

- **Listar Produtos**
  - `GET /produto`: Retorna a lista de todos os produtos cadastrados.

- **Detalhar Produto**
  - `GET /produto/:id`: Permite ao usuário logado obter informações detalhadas de um produto cadastrado.

- **Excluir Produto por ID**
  - `DELETE /produto/:id`: Permite ao usuário logado excluir um produto cadastrado.

- **Cadastrar Cliente**
  - `POST /cliente`: Permite ao usuário logado cadastrar um novo cliente no sistema.

- **Editar Dados do Cliente**
  - `PUT /cliente/:id`: Permite ao usuário logado atualizar informações de um cliente cadastrado.

- **Listar Clientes**
  - `GET /cliente`: Retorna a lista de todos os clientes cadastrados.

- **Detalhar Cliente**
  - `GET /cliente/:id`: Permite ao usuário logado obter informações detalhadas de um cliente cadastrado.

### 3ª Sprint

- **Cadastrar Pedido**
  - `POST /pedido`: Permite cadastrar um novo pedido no sistema.

- **Listar Pedidos**
  - `GET /pedido`: Retorna a lista de todos os pedidos cadastrados.

- **Aplicar Validação na Exclusão de Produto**
  - Valida se o produto a ser excluído está vinculado a algum pedido.

- **Aprimorar Cadastro/Atualização de Produto**
  - Permite vincular uma imagem a um produto, armazenando a URL no banco de dados.

- **Aprimorar Exclusão de Produto**
  - Remove a imagem vinculada ao produto do servidor de armazenamento durante a exclusão.

# Link da API:
 https://drab-cyan-drill-fez.cyclic.app/

Este projeto é uma base sólida para um sistema de PDV e pode ser expandido com novas funcionalidades de acordo com as necessidades do negócio. Fique à vontade para contribuir e melhorar este projeto!


## Colaboradores

Este projeto foi desenvolvido em colaboração por:

- [Gleicy](https://github.com/GleicyS)
- [Lauane](https://github.com/lauanegcsilva)
- [Rafaele](https://github.com/rafaellecriistine)
- [Mariana](https://github.com/mar1tomaz)

