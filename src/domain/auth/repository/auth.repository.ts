/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuario/service/usuario.service';

import { UsuarioModel } from 'src/domain/usuario/entities/usuario.entity';

@Injectable()
export class AuthRepository {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
    ) {}

    async login(email: string): Promise<UsuarioModel> {
        const usuario = await this.usuarioService.findOneByEmail(email);

        if (!usuario) {
            throw new UnauthorizedException('E-mail não existe');
        }

        return usuario;
    }
}