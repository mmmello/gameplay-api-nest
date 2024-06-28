/* Banco de dados do sistema Gmeplay */

create database gameplay;
use gameplay;

CREATE TABLE usuario (
    idUsuario int PRIMARY KEY UNIQUE NOT NULL auto_increment,
    nome varchar(150),
    email varchar(50),
    senha varchar(60),
    telefone char(16),
    cpf char(14),
    avatar varchar(40)
);

CREATE TABLE endereco (
    idEndereco int PRIMARY KEY UNIQUE NOT NULL auto_increment,
    numero int,
    rua varchar(150),
    bairro varchar(50),
    cidade varchar(50),
    estado varchar(50),
    pais varchar(50),
    idUsuario int
);

CREATE TABLE jogo (
    idJogo int PRIMARY KEY UNIQUE NOT NULL auto_increment,
    nome varchar(150),
    imagem varchar(100),
    classIndicativa smallint,
    classIndicativaConteudo varchar(30),
    preco decimal(10,2),
    promocao decimal(10,2),
    descricao varchar(500),
    lancamento datetime,
    desenvolvedor varchar(150),
    modos smallint,
    idCategoria int
);

CREATE TABLE historico (
    idHistorico int PRIMARY KEY UNIQUE NOT NULL auto_increment,
    data datetime,
    voucher char(17),
    preco decimal(10,2),
    idUsuario int,
    idCartao int,
    idJogo int
);

CREATE TABLE cartoes (
    idCartao int PRIMARY KEY UNIQUE NOT NULL auto_increment,
    apelido varchar(20),
    numero varchar(30),
    validade char(5),
    nome varchar(150),
    codSeguranca int,
    ativo tinyint,
    idUsuario int
);

CREATE TABLE idiomas (
    idIdioma int PRIMARY KEY UNIQUE NOT NULL auto_increment,
    tipo smallint,
    alemao tinyint,
    ingles tinyint,
    espanhol tinyint,
    frances tinyint,
    japones tinyint,
    coreano tinyint,
    portugues tinyint,
    idJogo int
);

CREATE TABLE categoria (
    idCategoria int PRIMARY KEY UNIQUE NOT NULL auto_increment,
    nome varchar(30)
);

CREATE TABLE requisitos (
    idRequisito int PRIMARY KEY UNIQUE NOT NULL auto_increment,
    tipo tinyint,
    sistema varchar(30),
    versoes varchar(100),
    armazenamento varchar(20),
    processador varchar(100),
    memoria varchar(30),
    placaVideo varchar(100),
    idJogo int
);

CREATE TABLE Favoritos (
    idUsuario int,
    idJogo int,
    PRIMARY KEY (idUsuario, idJogo),
    UNIQUE (idUsuario, idJogo)
);
 
ALTER TABLE endereco ADD CONSTRAINT FK_endereco_3
    FOREIGN KEY (idUsuario)
    REFERENCES usuario (idUsuario);
 
ALTER TABLE jogo ADD CONSTRAINT FK_jogo_3
    FOREIGN KEY (idCategoria)
    REFERENCES categoria (idCategoria);
 
ALTER TABLE historico ADD CONSTRAINT FK_historico_3
    FOREIGN KEY (idUsuario)
    REFERENCES usuario (idUsuario);
 
ALTER TABLE historico ADD CONSTRAINT FK_historico_4
    FOREIGN KEY (idCartao)
    REFERENCES cartoes (idCartao);
 
ALTER TABLE historico ADD CONSTRAINT FK_historico_5
    FOREIGN KEY (idJogo)
    REFERENCES jogo (idJogo);
 
ALTER TABLE cartoes ADD CONSTRAINT FK_cartoes_3
    FOREIGN KEY (idUsuario)
    REFERENCES usuario (idUsuario);
 
ALTER TABLE idiomas ADD CONSTRAINT FK_idiomas_3
    FOREIGN KEY (idJogo)
    REFERENCES jogo (idJogo);
 
ALTER TABLE requisitos ADD CONSTRAINT FK_requisitos_2
    FOREIGN KEY (idJogo)
    REFERENCES jogo (idJogo);
 
ALTER TABLE Favoritos ADD CONSTRAINT FK_Favoritos_1
    FOREIGN KEY (idJogo)
    REFERENCES jogo (idJogo);
 
ALTER TABLE Favoritos ADD CONSTRAINT FK_Favoritos_3
    FOREIGN KEY (idUsuario)
    REFERENCES usuario (idUsuario);
