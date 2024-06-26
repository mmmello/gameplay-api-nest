/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException }    from '@nestjs/common';
import { InjectModel }                      from '@nestjs/sequelize';

import { UsuarioModel }                     from '../entities/usuario.entity';
import { UsuarioDTO }                       from '../dto/usuario.dto';

@Injectable()
export class UsuarioRepository {

  constructor(

    @InjectModel(UsuarioModel) private readonly usuarioModel: typeof UsuarioModel ) {}

    criarUsuario(usuario: UsuarioDTO): Promise<UsuarioModel> {
        return this.usuarioModel.create(usuario);
    }

    findOne(idUsuario: number): Promise<UsuarioModel> {
        return this.usuarioModel.findOne({
            where: {
                idUsuario: idUsuario
            }
        });
    }

    findAll(): Promise<UsuarioModel[]> {
        return this.usuarioModel.findAll();
    }

    async remove(idUsuario: number): Promise<void> {
        const usuario = await this.findOne(idUsuario);
        if (usuario) {
            await usuario.destroy();
        } else {
            throw new NotFoundException(`ID ${idUsuario} não encontrado`);
        }
    }

    async update(idUsuario: number, usuarioDTO: UsuarioDTO): Promise<UsuarioModel> {
        const usuario = await this.findOne(idUsuario);

        if (!usuario) {
            throw new NotFoundException(`ID ${idUsuario} não encontrado`);
        }

        usuario.nome        = usuarioDTO.nome       ?? usuario.nome;
        usuario.email       = usuarioDTO.email      ?? usuario.email;
        usuario.senha       = usuarioDTO.senha      ?? usuario.senha;
        usuario.telefone    = usuarioDTO.telefone   ?? usuario.telefone;
        usuario.cpf         = usuarioDTO.cpf        ?? usuario.cpf;
        usuario.avatar      = usuarioDTO.avatar     ?? usuario.avatar;
    
        await usuario.save();

        return this.findOne(Number(usuario.idUsuario));
    }

    findOneByEmail(email: string): Promise<UsuarioModel> {
        return this.usuarioModel.findOne({
        where: {
                email
            }
        });
    }
}