-- Criação do banco (opcional, caso ainda não exista)
CREATE DATABASE IF NOT EXISTS backend_final;
USE backend_final;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    idade INT NOT NULL CHECK (idade > 0 AND idade < 120)
);

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL CHECK (preco > 0),
    data_atualizado DATETIME NOT NULL CHECK (data_atualizado BETWEEN '2000-01-01' AND '2025-06-20')
);
