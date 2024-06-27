/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repository/auth.repository'; 
import { AuthService } from './service/auth.service'; 
import { jwtConstants } from './constants/constants';

@Module({
    imports: [
        UsuarioModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '360000000s' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository], 
})
export class AuthModule {}