CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE categorias (
	id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL
);

INSERT INTO categorias (descricao)
VALUES
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  cpf VARCHAR(11) NOT NULL UNIQUE,
  cep VARCHAR(8),
  rua VARCHAR(255),
  numero VARCHAR(20),
  bairro VARCHAR(100),
  cidade VARCHAR(100),
  estado VARCHAR(2)
);

CREATE TABLE produtos (
	id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  quantidade_estoque INTEGER NOT NULL,
  valor INTEGER NOT NULL,
  categoria_id INTEGER REFERENCES categorias(id)
);

CREATE TABLE pedidos (
	id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id),
  observacao TEXT,
  valor_total INTEGER NOT NULL
);

CREATE TABLE pedido_produtos (
	id SERIAL PRIMARY KEY,
  pedido_id INTEGER NOT NULL REFERENCES pedidos(id),
  produto_id INTEGER NOT NULL REFERENCES produtos(id),
  quantidade_produto INTEGER NOT NULL,
  valor_produto INTEGER NOT NULL
);

ALTER TABLE produtos ADD COLUMN produto_imagem TEXT


