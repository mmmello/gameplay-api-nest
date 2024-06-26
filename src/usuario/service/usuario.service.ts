/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UsuarioDTO } from '../dto/usuario.dto';
import { UsuarioModel } from '../entities/usuario.entity';
import { UsuarioRepository } from '../repository/usuario.repository';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class UsuarioService {
    constructor(
        private readonly usuarioRepository: UsuarioRepository,
        @Inject(CACHE_MANAGER) private cacheManager: CacheStore
    ) {}

    async findAll(): Promise<UsuarioModel[]> {

        const cacheKey = `usuario_`;
        const cachedValue = await this.cacheManager.get<UsuarioModel[]>(cacheKey);

        if (cachedValue) {
            return cachedValue;
        }

        const usuarios = await this.usuarioRepository.findAll();
        await this.cacheManager.set(cacheKey, usuarios, { ttl: 10 });

        return usuarios;
    }

    async criarUsuario(usuario: UsuarioDTO): Promise<UsuarioModel> {
        const hashedPassword = await bcrypt.hash(usuario.senha, 10);
    
        return this.usuarioRepository.criarUsuario({
            ...usuario,
            senha: hashedPassword
        });
    }

    async remove(idUsuario: number): Promise<void> {
        await this.usuarioRepository.remove(idUsuario);
    }

    async update(idUsuario: number, usuarioDTO: UsuarioDTO): Promise<UsuarioModel> {
        const person = await this.usuarioRepository.update(idUsuario, usuarioDTO);
      
        return person;
    }

    async findOneByEmail(email: string): Promise<UsuarioModel> {
        return this.usuarioRepository.findOneByEmail(email);
    }
}