/* eslint-disable prettier/prettier */
//import { Identifier } from 'sequelize';
import { UsuarioModel } from '../entities/usuario.entity';
import { IsNumber, IsString } from "class-validator";

export class UsuarioDTO {

    @IsNumber()
    idUsuario: number;

    @IsString()
    nome: string;

    @IsString()
    email: string;

    @IsString()
    senha: string;

    @IsString()
    telefone: string;

    @IsString()
    cpf: string;

    @IsString()
    avatar: string;

    constructor(usuario: UsuarioModel) {
        this.idUsuario = usuario.idUsuario;
        this.nome = usuario.nome;
        this.email = usuario.email;
        this.senha = usuario.senha;
        this.telefone = usuario.telefone;
        this.cpf = usuario.cpf;
        this.avatar = usuario.avatar;
    }
}
