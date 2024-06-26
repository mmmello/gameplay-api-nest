/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService
    ) { }

    async login(email: string, senha: string): Promise<{ access_token: string }> {
        const usuario = await this.authRepository.login(email);

        const isPasswordValid = await bcrypt.compare(senha, usuario.senha);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Senha incorreta');
        }

        const payload = { 
            usuarioEmail: usuario.email, 
            usuarioNome: usuario.nome 
        };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}